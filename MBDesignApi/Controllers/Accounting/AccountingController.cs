using AspNetCore.Reporting;
using BusinessLogicMBDesign;
using BusinessLogicMBDesign.Accounting;
using BusinessLogicMBDesign.Approve;
using BusinessLogicMBDesign.Design3D;
using BusinessLogicMBDesign.Master;
using BusinessLogicMBDesign.Sale;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace MBDesignApi.Controllers.Accounting
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountingController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly AccountingService _accountingService;
        private readonly UploadToAwsService _uploadToAwsService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AccountingController(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            _configuration = configuration;
            _accountingService = new AccountingService(_configuration);
            _uploadToAwsService = new UploadToAwsService(_configuration);
            _webHostEnvironment = webHostEnvironment;
        }

        #region GET
        [HttpGet]
        public JsonResult GetAccountingList(string contractNumber, string quotationNumber, string customerName, string contractStatus, string contractDate)
        {
            var data = _accountingService.GetAccountingList(contractNumber, quotationNumber, customerName, contractStatus, contractDate);

            return new JsonResult(data);
        }
        
        [HttpGet]
        public JsonResult GetContractStatusSelect2()
        {
            var data = _accountingService.GetContractStatusSelect2();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetInvoiceStatusSelect2()
        {
            var data = _accountingService.GetInvoiceStatusSelect2();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetQuotaionStatusSelect2()
        {
            var data = _accountingService.GetQuotaionStatusSelect2();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetAccountingByOrderId(int orderId)
        {
            var custOrder = _accountingService.GetCustOrderByOrderId(orderId);
            var imageUpload = _accountingService.GetAccountImage(orderId);

            var result = new
            {
                custOrder = custOrder,
                imageUpload = imageUpload
            };
            return new JsonResult(result);
        }

        [HttpGet]
        public JsonResult GetInvoiceById(int orderId, int invoiceId)
        {
            var custOrder = _accountingService.GetCustOrderByOrderId(orderId);
            var invoice = _accountingService.GetInvoiceByKeyId(invoiceId);
            var cust = new tbCust();
            if (custOrder != null)
            {
                cust = _accountingService.GetCustByCustId(custOrder.custId);
            }

            var result = new
            {
                custOrder = custOrder,
                invoice = invoice,
                cust = cust
            };
            return new JsonResult(result);
        }

        [HttpGet]
        public JsonResult GetInvoiceList(string quotationNumber, string invoiceNumber, string customerName, string invoiceStatus, string invoiceDate)
        {
            var data = _accountingService.GetInvoiceList(quotationNumber, invoiceNumber, customerName, invoiceStatus, invoiceDate);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GenerateInvoiceNumber()
        {
            var data = _accountingService.GenerateInvoiceNumber();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetBillList(string invoiceNumber, string receiptNumber, string customerName, string receiptDate)
        {
            var data = _accountingService.GetReceiptList(invoiceNumber, receiptNumber, customerName, receiptDate);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetCustomerInformationByOrderId(int orderId, int invoiceId = 0)
        {
            var custOrder = new CustOrderView();
            custOrder = _accountingService.GetCustOrderByOrderId(orderId);
            var invoice = new tbInvoice();
            if (invoiceId != 0)
            {
                invoice = _accountingService.GetInvoiceByKeyId(invoiceId);
            }

            var cust = new tbCust();
            if (custOrder != null)
            {
                cust = _accountingService.GetCustomerInformationByCustId(custOrder.custId);
            }

            var result = new
            {
                cust = cust,
                custOrder = custOrder,
                invoice = invoice
            };
            return new JsonResult(result);
        }
        [HttpGet]
        public IActionResult PrintInvoice()
        {
            //var custOrder = _accountingService.GetCustOrderByOrderId(orderId);
            //var invoice = new tbInvoice();
            //if (invoiceId != 0)
            //{
            //    invoice = _accountingService.GetInvoiceByKeyId(invoiceId);
            //}

            //var cust = new tbCust();
            //if (custOrder != null)
            //{
            //    cust = _accountingService.GetCustomerInformationByCustId(custOrder.custId);
            //}

            
            string mimtype = "";
            int extension = 1;
            var path = $"{Directory.GetCurrentDirectory()}\\reports\\InvoiceReport.rdlc";
            Dictionary<string, string> param = new Dictionary<string, string>();
            //param.Add("", "");

            LocalReport report = new LocalReport(path);
            var result = report.Execute(RenderType.Pdf, extension, param, mimtype);

            return File(result.MainStream, "application/pdf");
        }

        [HttpGet]
        public JsonResult GetPeriodByOrderId(int orderId)
        {
            var data = _accountingService.GetPeriodByOrderId(orderId);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetIdCardComCert()
        {
            var data = _accountingService.GetIdCardComCert();

            return new JsonResult(data);
        }
        #endregion GET

        #region POST
        [HttpPost]
        public JsonResult DoSaveAccounting([FromBody]AccountingModel obj)
        {
            var data = _accountingService.DoUpdateAccountingCustomer(obj);

            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult DoSendToSaleAndForeman(int orderId)
        {
            var data = _accountingService.DoSendToSaleAndForeman(orderId);

            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult DoAddInvoice([FromBody]InvoiceModel obj)
        {
            var data = _accountingService.DoAddInvoice(obj);

            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult DoUpdateInvoice([FromBody]InvoiceModel obj)
        {
            var data = _accountingService.DoUpdateInvoice(obj);

            return new JsonResult(data);
        }
        [HttpPost]
        [DisableRequestSizeLimit]
        public ActionResult DoUpdateIdCard([FromQuery] string loginCode, List<IFormFile> files)
        {
            var msg = new ResultMessage();
            var addedUpload = new UploadFiles();

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

                addedUpload = new UploadFiles
                {
                    fileName = newFileName,
                    filePath = fullFilePath,
                    fileSize = source.Length,
                    originalFileName = filename,
                };

                msg = _uploadToAwsService.DoUploadToAws(addedUpload);
                addedUpload.imageUrl = msg.strResult;
                if (msg.isResult == false)
                {
                    return Json(msg);
                }
            }

            ///Update data
            var result = _accountingService.DoUpdateIdCard(addedUpload, loginCode);
            if (result.isResult == false)
            {
                msg.isResult = result.isResult;
                return Json(msg);
            }
            return Json(msg);

        }

        [HttpPost]
        [DisableRequestSizeLimit]
        public ActionResult DoUpdateComCert([FromQuery] string loginCode, List<IFormFile> files)
        {
            var msg = new ResultMessage();
            var addedUpload = new UploadFiles();

            string path = Directory.GetCurrentDirectory();
            foreach (IFormFile source in files)
            {
                string folderName = string.Format("{0}\\upload\\documents\\", path);

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

                addedUpload = new UploadFiles
                {
                    fileName = newFileName,
                    filePath = fullFilePath,
                    fileSize = source.Length,
                    originalFileName = filename,
                };

                msg = _uploadToAwsService.DoUploadToAws(addedUpload);
                addedUpload.imageUrl = msg.strResult;
                if (msg.isResult == false)
                {
                    return Json(msg);
                }
            }

            ///Update data
            var result = _accountingService.DoUpdateComCert(addedUpload, loginCode);
            if (result.isResult == false)
            {
                msg.isResult = result.isResult;
                return Json(msg);
            }
            return Json(msg);

        }
        #endregion POST
    }
}
