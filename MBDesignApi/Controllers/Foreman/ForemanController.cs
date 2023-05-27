using BusinessLogicMBDesign.Design3D;
using BusinessLogicMBDesign.Foreman;
using BusinessLogicMBDesign.Sale;
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
            var uploadRef = _saleService.GetUploadRefByOrderId(orderId);

            var result = new
            {
                custOrder = custOrder,
                items = items,
                itemsOptions = itemsOptions,
                uploadRef = uploadRef
            };
            return new JsonResult(result);
        }
        #endregion GET
    }
}
