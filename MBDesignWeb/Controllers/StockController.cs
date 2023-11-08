using BusinessLogicMBDesign.Master;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StockController : Controller
    {
        private readonly StockService _stockService;
        private readonly IConfiguration _configuration;

        public StockController(IConfiguration configuration)
        {
            _configuration = configuration;
            _stockService = new StockService(_configuration);
        }

        [HttpGet]
        public JsonResult GetStockList(string stockname, int stockid, string status)
        {
            var data = _stockService.GetStockList(stockid, stockname, status);

            return new JsonResult(data);
        }
        #region GET
        [HttpGet]
        public JsonResult GetLastestItemId()
        {
            var data = _stockService.GetFirstLastestItemId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetItemByItemId(int id)
        {
            var item = _stockService.GetStockItemById(id);


            return new JsonResult(new { item = item });
        }
        #endregion

        #region Post
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddItem([FromBody] StockItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _stockService.AddStockItem(obj);

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
        public JsonResult UpdateItem([FromBody] StockItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _stockService.UpdateStockItem(obj);

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
