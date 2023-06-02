using BusinessLogicMBDesign.Design3D;
using BusinessLogicMBDesign.Foreman;
using BusinessLogicMBDesign.Sale;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignApi.Controllers.Foreman
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ForemanController
    {
        private readonly IConfiguration _configuration;
        private readonly ForemanService _foremanService;
        private readonly SaleService _saleService;

        public ForemanController(IConfiguration configuration)
        {
            _configuration = configuration;
            _foremanService = new ForemanService(configuration);
            _saleService = new SaleService(configuration);
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

            var imagesForeman = new List<UploadOrderDetailView>();
            if (items.Count > 0)
            {
                imagesForeman = _foremanService.GetForemanUpload(orderId, items.FirstOrDefault().custOrderDetailId, GlobalUploadCategory.foremanUpload);
            }

            var imageSecondDisposite = _foremanService.GetFirstByOrderIdAndCategory(orderId, GlobalUploadCategory.secondDisposite);

            var result = new
            {
                custOrder = custOrder,
                items = items,
                itemsOptions = itemsOptions,
                images3DApproved = images3DApproved,
                imagesForeman = imagesForeman,
                imageSecondDisposite = imageSecondDisposite
            };
            return new JsonResult(result);
        }
        #endregion GET
    }
}
