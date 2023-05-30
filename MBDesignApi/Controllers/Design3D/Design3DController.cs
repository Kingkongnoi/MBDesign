using BusinessLogicMBDesign;
using BusinessLogicMBDesign.Design3D;
using BusinessLogicMBDesign.Sale;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace MBDesignApi.Controllers.Design3D
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class Design3DController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly Design3DService _design3DService;
        private readonly SaleService _saleService;
        private readonly UploadToAwsService _uploadToAwsService;

        public Design3DController(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            _configuration = configuration;
            _design3DService = new Design3DService(_configuration);
            _saleService = new SaleService(_configuration);
            _uploadToAwsService = new UploadToAwsService(_configuration);
            _webHostEnvironment = webHostEnvironment;
        }

        #region GET
        [HttpGet]
        public JsonResult Get3DQueueList(string quotationNumber, string empName, string checklistStatus, string installDate)
        {
            var data = _design3DService.Get3DQueueList(quotationNumber, empName, checklistStatus, installDate);

            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetChecklistStatusSelect2()
        {
            var data = _design3DService.GetChecklistStatusSelect2();

            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetDesign3DNameSelect2()
        {
            var data = _design3DService.GetDesign3DNameSelect2();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetDesign3DByOrderId(int orderId)
        {
            var custOrder = _design3DService.Get3DQueueCustOrderByOrderId(orderId);
            var uploadRef = _saleService.GetUploadRefByOrderId(orderId);

            var result = new
            {
                custOrder = custOrder,
                uploadRef = uploadRef
                //items = items,
                //itemsOptions = itemsOptions,
                //cust = cust,
            };
            return new JsonResult(result);
        }
        #endregion GET

        #region POST
        [HttpPost]
        [DisableRequestSizeLimit]
        public ActionResult DoUpdateDesign3D([FromQuery] int orderId, [FromQuery] int empId, [FromQuery] string dueDate, [FromQuery] bool final3d, [FromQuery] int design3dId, List<IFormFile> files)
        {
            var msg = new ResultMessage();
            var addedUpload = new List<UploadFiles>();

            string checklistStatus = string.Empty;
            if(empId != 0)
            {
                checklistStatus = Global3DStatus.whileDesign3dDraf1;
            }

            string path = _webHostEnvironment.WebRootPath;//Directory.GetCurrentDirectory();
            foreach (IFormFile source in files)
            {
                checklistStatus = Global3DStatus.design3dApproved;

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

            if (final3d)
            {
                checklistStatus = Global3DStatus.design3dFinal;
            }

            string categoryName = GlobalUploadCategory.approved3d;

            ///Update data
            var result = _design3DService.DoUpdateDesign3D(addedUpload, categoryName, orderId, empId, checklistStatus, dueDate, design3dId);
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
