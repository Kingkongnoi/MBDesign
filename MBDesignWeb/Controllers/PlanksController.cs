using BusinessLogicMBDesign.Spec;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PlanksController : Controller
    {
        private readonly PlanksService _planksService;
        private readonly IConfiguration _configuration;

        public PlanksController(IConfiguration configuration)
        {
            _configuration = configuration;
            _planksService = new PlanksService(_configuration);
        }

        #region GET

        [HttpGet]
        public JsonResult GetPlanksList(string quotaioncode, string status)
        {
            var data = _planksService.GetPlanksList(quotaioncode, status);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetItemByItemId(int id)
        {
            var item = _planksService.GetPlanksItemById(id);

            return new JsonResult(new { item = item });
        }

        [HttpGet]
        public JsonResult GetQuatationList()
        {
            var item = _planksService.GetQuatationNoList();

            return new JsonResult(new { item = item });
        }

        //[HttpGet]
        //public JsonResult GetLastestBrandCode()
        //{
        //    var data = _brandService.GetFirstLastestBrandCode();

        //    return new JsonResult(data);
        //}

        //[HttpGet]
        //public JsonResult GetItemByItemId(int id)
        //{
        //    var item = _brandService.GetBrandItemById(id);

        //    return new JsonResult(new { item = item });
        //}

        #endregion GET

        #region Post

        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddItem([FromBody] PlanksItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _planksService.AddPlanksItem(obj);

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
        public JsonResult UpdateItem([FromBody] PlanksItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _planksService.UpdatePlanksItem(obj);

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

        #endregion Post
    }
}