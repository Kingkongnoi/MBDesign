using BusinessLogicMBDesign.Master;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StockProductController : Controller
    {
        private readonly StockProductService _stockproductService;
        private readonly IConfiguration _configuration;

        public StockProductController(IConfiguration configuration)
        {
            _configuration = configuration;
            _stockproductService = new StockProductService(_configuration);
        }

        [HttpGet]
        public JsonResult GetStockProductList(int groupid, int subgroupid, int brandid, int stockid, string productcode, string productname, string status)
        {
            var data = _stockproductService.GetStockProductList(groupid,subgroupid,brandid,stockid, productcode,productname, status);

            return new JsonResult(data);
        }
        #region GET
        [HttpGet]
        public JsonResult GetLastestItemId()
        {
            var data = _stockproductService.GetFirstLastestItemId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetItemByItemId(int id)
        {
            var item = _stockproductService.GetStockProductItemById(id);
            return new JsonResult(new { item = item });
        }
        [HttpGet]
        public JsonResult GetGroupSelect()
        {
            var data = _stockproductService.GetGroupDataSelect();

            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetSubGroupSelect()
        {
            var data = _stockproductService.GetSubGroupDataSelect();

            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetBrandSelect()
        {
            var data = _stockproductService.GetBrandDataSelect();

            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetStockSelect()
        {
            var data = _stockproductService.GetStockDataSelect();

            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetUnitSelect()
        {
            var data = _stockproductService.GetUnitDataSelect();

            return new JsonResult(data);
        }
        #endregion

        #region Post
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddItem([FromBody] StockProductAddModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _stockproductService.AddStockProductItem(obj);

            if (data == -1)
            {
                result = false;
                resultStatus = "duplicate";
            }
            else if (data == 0)
            {
                result = false;
                resultStatus = "error";
            }

            var returnData = new
            {
                result,
                resultStatus
            };

            return new JsonResult(returnData);
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult UpdateItem([FromBody] StockProductAddModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _stockproductService.UpdateStockProductItem(obj);

            if (data == -1)
            {
                result = false;
                resultStatus = "duplicate";
            }
            else if (data == 0)
            {
                result = false;
                resultStatus = "error";
            }

            var returnData = new
            {
                result,
                resultStatus
            };

            return new JsonResult(returnData);
        }
        #endregion
    }
}
