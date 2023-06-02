using BusinessLogicMBDesign;
using BusinessLogicMBDesign.Foreman;
using BusinessLogicMBDesign.Sale;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace MBDesignApi.Controllers.Foreman
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ForemanController
    {
        private readonly IConfiguration _configuration;
        private readonly ForemanService _foremanService;
        private readonly SaleService _saleService;
        private readonly UploadToAwsService _uploadToAwsService;

        public ForemanController(IConfiguration configuration)
        {
            _configuration = configuration;
            _foremanService = new ForemanService(configuration);
            _saleService = new SaleService(configuration);
            _uploadToAwsService = new UploadToAwsService(configuration);
        }

        #region GET
        [HttpGet]
        public JsonResult GetForemanQueueList(string quotationNumber, string cusName, string foremanStatus, string installDate)
        {
            var data = _foremanService.GetForemanQueueList(quotationNumber, cusName, foremanStatus, installDate);

            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetForemanStatusSelect2()
        {
            var data = _foremanService.GetForemanStatusSelect2();

            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetForemanByOrderId(int orderId, int foremanId)
        {
            var custOrder = _foremanService.GetForemanCustOrderByKeyId(foremanId);
            var items = _saleService.GetCustOrderDetailByOrderId(orderId);
            var itemsOptions = _saleService.GetItemOptionsByOrderId(orderId);
            var images3DApproved = _foremanService.GetByOrderIdAndCategory(orderId, GlobalUploadCategory.approved3d);
            var custOrderDetail = _foremanService.GetForemanCustOrderDetailByKeyId(orderId);

            var imagesForeman = new List<UploadOrderDetailView>();
            if (items.Count > 0)
            {
                imagesForeman = _foremanService.GetForemanUpload(orderId, GlobalUploadCategory.foremanUpload);
            }

            var imageSecondDisposite = _foremanService.GetFirstByOrderIdAndCategory(orderId, GlobalUploadCategory.secondDisposite);

            var result = new
            {
                custOrder = custOrder,
                items = items,
                itemsOptions = itemsOptions,
                images3DApproved = images3DApproved,
                imagesForeman = imagesForeman,
                imageSecondDisposite = imageSecondDisposite,
                custOrderDetail = custOrderDetail
            };
            return new JsonResult(result);
        }
        #endregion GET

        #region POST
        [HttpPost]
        [DisableRequestSizeLimit]
        public JsonResult DoUpdateForemanItems([FromQuery] int orderId, [FromQuery] int custOrderDetailId, [FromQuery] decimal length, [FromQuery] decimal depth, [FromQuery] decimal height, List<IFormFile> files)
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
                    return new JsonResult(msg);
                }

                addedUpload.Add(obj);
            }

            string categoryName = GlobalUploadCategory.foremanUpload;

            ///Update data
            var result = _foremanService.DoUpdateForemanPerItem(addedUpload, categoryName, orderId, custOrderDetailId, length, depth, height);
            msg.isResult = result;

            return new JsonResult(msg);
        }
        [HttpPost]
        [DisableRequestSizeLimit]
        public JsonResult DoUpdateForeman([FromQuery] int orderId, [FromQuery] string orderNote, [FromQuery] decimal orderNotePrice, [FromQuery] decimal subTotal
            , [FromQuery] decimal discount, [FromQuery] decimal vat, [FromQuery] decimal grandTotal, [FromQuery] decimal disposite, List<IFormFile> files)
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
                    return new JsonResult(msg);
                }

                addedUpload.Add(obj);
            }

            string categoryName = GlobalUploadCategory.secondDisposite;

            ///Update data
            msg = _foremanService.DoUpdateForeman(addedUpload, categoryName, orderId, orderNote, orderNotePrice, subTotal, discount, vat, grandTotal, disposite);

            return new JsonResult(msg);
        }
        #endregion POST
    }
}
