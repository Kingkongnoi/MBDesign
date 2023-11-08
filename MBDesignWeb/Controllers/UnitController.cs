using BusinessLogicMBDesign.Master;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace MBDesignWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UnitController : Controller
    {
        private readonly UnitMasterService _unitmasterService;
        private readonly IConfiguration _configuration;

        public UnitController(IConfiguration configuration)
        {
            _configuration = configuration;
            _unitmasterService = new UnitMasterService(_configuration);
        }

        #region GET
        [HttpGet]
        public JsonResult GetUnitList(int id, string unitname, string status)
        {
            var data = _unitmasterService.GetUitMasterList(id, unitname, status);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetLastestItemId()
        {
            var data = _unitmasterService.GetFirstLastestItemId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetItemByItemId(int id)
        {
            var item = _unitmasterService.GetUnitItemById(id);


            return new JsonResult(new { item = item });
        }
        #endregion

        #region Post
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddItem([FromBody] UnitMasterItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _unitmasterService.AddUnitMasrerItem(obj);

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
        public JsonResult UpdateItem([FromBody] UnitMasterItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _unitmasterService.UpdateUnitMasterItem(obj);

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
