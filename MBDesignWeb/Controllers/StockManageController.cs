using BusinessLogicMBDesign.Master;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StockManageController : Controller
    {
       
        private readonly StockManageService _stockmanageService;
        private readonly IConfiguration _configuration;

        public StockManageController(IConfiguration configuration)
        {
            _configuration = configuration;
            _stockmanageService = new StockManageService(_configuration);
        }

        #region Get
        [HttpGet]
        public JsonResult GetStockInList(string docode, string saler, string getin, int stockinby, int stock, string status)
        {
            var data = _stockmanageService.GetStockInList(docode, saler, getin, stockinby, stock, status);
            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetStockOutList(string docode, string saler, string getin, int stockinby, int stock, string status)
        {
            var data = _stockmanageService.GetStockOutList(docode, saler, getin, stockinby, stock, status);
            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetLastestGetinItemId()
        {
            var data = _stockmanageService.GetFirstLastestGetinItemId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetItemByItemId(int id)
        {
            var item = _stockmanageService.GetStockProductManageItemById(id);
            return new JsonResult(new { item = item });
        }
        #endregion

        #region Post
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddItem([FromBody] StockManageAddModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _stockmanageService.AddGetInItem(obj);

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
        public JsonResult UpdateItem([FromBody] StockManageAddModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _stockmanageService.UpdateStockProductItem(obj);

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
