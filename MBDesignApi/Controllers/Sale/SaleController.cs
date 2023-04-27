using BusinessLogicMBDesign.Master;
using BusinessLogicMBDesign.Sale;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignApi.Controllers.Sale
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SaleController : Controller
    {
        private readonly SaleService _saleService;
        private readonly IConfiguration _configuration;
        public SaleController(IConfiguration configuration)
        {
            _configuration = configuration;
            _saleService = new SaleService(_configuration);
        }

        [HttpGet]
        public JsonResult GetSelect2ProductStyle()
        {
            var data = _saleService.GetProductStyleSelect2();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetSelect2ProductType()
        {
            var data = _saleService.GetProductTypeSelect2();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetSelect2ProductItem()
        {
            var data = _saleService.GetProductItemSelect2();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetSelect2ProductItemOptionsByItemId(int itemId)
        {
            var data = _saleService.GetProductItemSelect2(itemId);

            return new JsonResult(data);
        }
    }
}
