using BusinessLogicMBDesign.Sale;
using BusinessLogicMBDesign;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Net.Http.Headers;
using NPOI.HPSF;

namespace MBDesignWeb.Controllers
{
    public class SaleController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly SaleService _saleService;
        private readonly UploadToAwsService _uploadToAwsService;
        private readonly UploadToDatabaseService _uploadToDatabaseService;
        public SaleController(IConfiguration configuration)
        {
            _configuration = configuration;
            _saleService = new SaleService(_configuration);
            _uploadToAwsService = new UploadToAwsService(_configuration);
            _uploadToDatabaseService = new UploadToDatabaseService(_configuration);
        }

        public IActionResult Index()
        {
            ViewBag.apiUrl = _configuration.GetSection("apiUrl").Value;
            ViewBag.webUrl = _configuration.GetSection("webUrl").Value;
            ViewBag.imageUrl = _configuration.GetSection("imageUrl").Value;
            return View();
        }

        #region GET
        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetSelect2ProductStyle()
        {
            var data = _saleService.GetProductStyleSelect2();

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetSelect2ProductType()
        {
            var data = _saleService.GetProductTypeSelect2();

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetSelect2ProductItem()
        {
            var data = _saleService.GetProductItemSelect2();

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetSelect2ProductItemByTypeId(int typeId)
        {
            var data = _saleService.GetProductItemSelect2ByTypeId(typeId);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetSelect2ProductItemOptionsByItemId(int itemId)
        {
            var data = _saleService.GetProductItemSelect2(itemId);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetAllActiveBankAccount()
        {
            var data = _saleService.GetAllActiveBankAccount();

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetQuotationList(string quotationNumber, string quotationCusName, string status)
        {
            var data = _saleService.GetQuotationList(quotationNumber, quotationCusName, status);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetQuotationDetailByOrderId(int orderId)
        {
            var custOrder = _saleService.GetCustOrderByOrderId(orderId);
            var items = _saleService.GetCustOrderDetailByOrderId(orderId);
            var itemsOptions = _saleService.GetItemOptionsByOrderId(orderId);
            var uploadRef = _saleService.GetUploadRefByOrderId(orderId);

            foreach (var u in uploadRef)
            {
                if(u.dataFile != null)
                {
                    u.dataFile = Convert.FromBase64String(Convert.ToBase64String(u.dataFile));
                }

            }

            var custId = (custOrder != null) ? custOrder.custId : 0;
            var cust = _saleService.GetFirstByCustId(custId);

            var result = new
            {
                custOrder = custOrder,
                items = items,
                itemsOptions = itemsOptions,
                cust = cust,
                uploadRef = uploadRef
            };
            return new JsonResult(result);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetContractList(string contractNumber, string quotationNumber, string cusName, string contractStatus, string contractDate)
        {
            var data = _saleService.GetContractList(contractNumber, quotationNumber, cusName, contractStatus, contractDate);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetContractStatusSelect2()
        {
            var data = _saleService.GetContractStatusSelect2();

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetCommissionList(string commissionDate, string commissionStatus, string loginCode)
        {
            var data = _saleService.GetCommissionList(commissionDate, commissionStatus, loginCode);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetCommissionDetail(int commissionId)
        {
            var data = _saleService.GetCommissionDetail(commissionId);

            return new JsonResult(data);
        }
        #endregion GET

        #region POST

        [Route("api/[controller]/[action]")]
        [AllowAnonymous]
        [HttpPost]
        public JsonResult SaveAndCreateQuotation([FromBody] object obj)
        {
            dynamic cvtJson = JsonConvert.DeserializeObject(obj.ToString());
            var lstItems = new List<SaleItem>();
            foreach (var item in cvtJson["items"])
            {
                var lstOptions = new List<SaleOptions>();
                foreach (var option in item["options"])
                {
                    if (option["optionsId"] != null || option["optionsId"] != "")
                    {
                        lstOptions.Add(new SaleOptions { optionsId = Convert.ToInt32(option["optionsId"]) });
                    }
                }

                lstItems.Add(new SaleItem
                {
                    styleId = Convert.ToInt32(item["styleId"]),
                    floor = item["floor"],
                    zone = item["zone"],
                    typeId = Convert.ToInt32(item["typeId"]),
                    itemId = item["itemId"] == "" || item["itemId"] == null ? 0 : Convert.ToInt32(item["itemId"]),
                    orderLength = item["orderLength"] == "" ? 0 : Convert.ToDecimal(item["orderLength"]),
                    orderDepth = item["orderDepth"] == "" ? 0 : Convert.ToDecimal(item["orderDepth"]),
                    orderHeight = item["orderHeight"] == "" ? 0 : Convert.ToDecimal(item["orderHeight"]),
                    options = lstOptions
                });
            }

            var dataObj = new SaleModel
            {
                custFirstName = cvtJson["custFirstName"],
                custSurName = cvtJson["custSurName"],
                custNickName = cvtJson["custNickName"],
                custTel = cvtJson["custTel"],
                custLineId = cvtJson["custLineId"],
                custAddress = cvtJson["custAddress"],
                custLocation = cvtJson["custLocation"],
                custInstallAddress = cvtJson["custInstallAddress"],
                quotationType = cvtJson["quotationType"],
                installDate = cvtJson["installDate"] == "" ? "" : Convert.ToDateTime(cvtJson["installDate"]),
                items = lstItems,
                orderNote = cvtJson["orderNote"],
                orderNotePrice = cvtJson["orderNotePrice"] == "" ? 0 : Convert.ToDecimal(cvtJson["orderNotePrice"]),
                discount = cvtJson["discount"] == "" ? 0 : Convert.ToDecimal(cvtJson["discount"]),
                vat = cvtJson["vat"] == "" ? 0 : Convert.ToDecimal(cvtJson["vat"]),
                subTotal = cvtJson["subTotal"] == "" ? 0 : Convert.ToDecimal(cvtJson["subTotal"]),
                grandTotal = cvtJson["grandTotal"] == "" ? 0 : Convert.ToDecimal(cvtJson["grandTotal"]),
                disposite = cvtJson["disposite"] == "" ? 0 : Convert.ToDecimal(cvtJson["disposite"]),
                accountType = cvtJson["accountType"],
                vatPercentage = Convert.ToDecimal(cvtJson["vatPercentage"]),
                action = cvtJson["action"],
                orderId = Convert.ToInt32(cvtJson["orderId"]),
                custId = Convert.ToInt32(cvtJson["custId"]),
                quotationComment = cvtJson["quotationComment"],
                loginCode = cvtJson["loginCode"],
            };

            var data = _saleService.SaveAndCreateQuotation(dataObj);

            return new JsonResult(data);
        }

        /*
        //[AllowAnonymous]
        [Route("api/[controller]/[action]")]
        [HttpPost]
        [DisableRequestSizeLimit]
        public ActionResult AddUpload([FromQuery] int orderId, [FromQuery] string categoryName, [FromQuery] string loginCode, List<IFormFile> files)
        {
            var msg = new ResultMessage();
            var addedUpload = new List<UploadFiles>();

            string path = Directory.GetCurrentDirectory();
            foreach (IFormFile source in files)
            {
                string folderName = string.Format("{0}\\upload\\images\\", path);

                if (!Directory.Exists(folderName))
                {
                    Directory.CreateDirectory(folderName);
                }

                string filename = ContentDispositionHeaderValue.Parse(source.ContentDisposition).FileName.ToString();

                FileInfo file = new FileInfo(filename);
                string fileExtension = file.Extension;

                string oldFilePath = string.Format("{0}{1}", folderName, filename);
                string fileWithoutExtension = Path.GetFileNameWithoutExtension(oldFilePath);

                string newFileName = string.Format("{0}_{1}{2}", fileWithoutExtension, DateTime.UtcNow.ToString("yyyyMMddHHmmss"), fileExtension);

                string fullFilePath = string.Format("{0}{1}", folderName, newFileName);
                FileStream output = System.IO.File.Create(fullFilePath);

                source.CopyTo(output);
                output.Dispose();

                var obj = new UploadFiles
                {
                    fileName = newFileName,
                    filePath = fullFilePath,
                    fileSize = source.Length,
                    originalFileName = filename,
                };

                msg = _uploadToAwsService.DoUploadToAws(obj);
                obj.imageUrl = msg.strResult;
                if (msg.isResult == false)
                {
                    return Json(msg);
                }

                addedUpload.Add(obj);
            }

            ///Update data
            var result = _saleService.DoAddUploadData(addedUpload, categoryName, orderId, loginCode);
            if (result == false)
            {
                msg.isResult = false;
                return Json(msg);
            }
            return Json(msg);

        }
        */

        [Route("api/[controller]/[action]")]
        [HttpPost]
        [DisableRequestSizeLimit]
        public ActionResult AddUpload([FromQuery] int orderId, [FromQuery] string categoryName, [FromQuery] string loginCode, List<IFormFile> files)
        {
            var msg = new ResultMessage();
            var addedUpload = _uploadToDatabaseService.GenerateUploadFilesObject(files);

            ///Update data
            var result = _saleService.DoAddUploadData(addedUpload, categoryName, orderId, loginCode);
            if (result == false)
            {
                msg.isResult = false;
                return Json(msg);
            }
            return Json(msg);

        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        public ActionResult DeleteUpload([FromQuery] int uploadId)
        {
            var msg = new ResultMessage();
            var result = _saleService.DeleteUpload(uploadId);
            if (result > 0)
            {
                msg.isResult = true;
            }
            return Json(msg);

        }
        #endregion POST
    }
}
