﻿using BusinessLogicMBDesign.Foreman;
using BusinessLogicMBDesign.Sale;
using BusinessLogicMBDesign;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Net.Http.Headers;

namespace MBDesignWeb.Controllers
{
    public class ForemanController : Controller
    {
        private readonly IConfiguration _configuration;

        private readonly ForemanService _foremanService;
        private readonly SaleService _saleService;
        private readonly UploadToAwsService _uploadToAwsService;
        private readonly UploadToDatabaseService _uploadToDatabaseService;
        private readonly ftpProcessService _ftpProcessService;

        public ForemanController(IConfiguration configuration)
        {
            _configuration = configuration;
            _foremanService = new ForemanService(configuration);
            _saleService = new SaleService(configuration);
            _uploadToAwsService = new UploadToAwsService(configuration);
            _uploadToDatabaseService = new UploadToDatabaseService(configuration);
            _ftpProcessService = new ftpProcessService(configuration);
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
        public JsonResult GetForemanQueueList(string quotationNumber, string cusName, string foremanStatus, string installDate)
        {
            var data = _foremanService.GetForemanQueueList(quotationNumber, cusName, foremanStatus, installDate);

            return new JsonResult(data);
        }
        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetForemanStatusSelect2()
        {
            var data = _foremanService.GetForemanStatusSelect2();

            return new JsonResult(data);
        }
        [Route("api/[controller]/[action]")]
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
        [Route("api/[controller]/[action]")]
        [HttpPost]
        [DisableRequestSizeLimit]
        [AllowAnonymous]
        public JsonResult DoUpdateForemanItems([FromQuery] int orderId, [FromQuery] int custOrderDetailId, [FromQuery] decimal length, [FromQuery] decimal depth, [FromQuery] decimal height, [FromQuery] string loginCode, List<IFormFile> files)
        {
            var msg = new ResultMessage();
            var addedUpload = new List<UploadFiles>();

            foreach (IFormFile source in files)
            {
                var obj = _ftpProcessService.DoUploadToFtp(source);
                addedUpload.Add(obj);
            }

            string categoryName = GlobalUploadCategory.foremanUpload;

            ///Update data
            var result = _foremanService.DoUpdateForemanPerItem(addedUpload, categoryName, orderId, custOrderDetailId, length, depth, height, loginCode);
            msg.isResult = result;

            return new JsonResult(msg);
        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        [DisableRequestSizeLimit]
        //[AllowAnonymous]
        public JsonResult DoUpdateForeman([FromQuery] int orderId, [FromQuery] string orderNote, [FromQuery] decimal orderNotePrice, [FromQuery] decimal subTotal
            , [FromQuery] decimal discount, [FromQuery] decimal vat, [FromQuery] decimal grandTotal, [FromQuery] decimal disposite, [FromQuery] string loginCode, List<IFormFile> files)
        {
            var msg = new ResultMessage();
            var addedUpload = new List<UploadFiles>();

            foreach (IFormFile source in files)
            {
                var obj = _ftpProcessService.DoUploadToFtp(source);
                addedUpload.Add(obj);
            }

            string categoryName = GlobalUploadCategory.secondDisposite;

            ///Update data
            msg = _foremanService.DoUpdateForeman(addedUpload, categoryName, orderId, orderNote, orderNotePrice, subTotal, discount, vat, grandTotal, disposite, loginCode);

            return new JsonResult(msg);
        }
        #endregion POST
    }
}
