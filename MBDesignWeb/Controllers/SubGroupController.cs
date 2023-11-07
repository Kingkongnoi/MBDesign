using BusinessLogicMBDesign.Master;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SubGroupController : Controller
    {
        private readonly SubGroupService _subgroupService;
        private readonly IConfiguration _configuration;

        public SubGroupController(IConfiguration configuration)
        {
            _configuration = configuration;
            _subgroupService = new SubGroupService(_configuration);
        }

        [HttpGet]
        public JsonResult GetSubGroupList(string subgroupCode, string subgroupName, string status)
        {
            var data = _subgroupService.GetSubGroupList(subgroupCode, subgroupName, status);

            return new JsonResult(data);
        }
        #region GET
        [HttpGet]
        public JsonResult GetLastestSubGroupCode(int groupid)
        {
            var data = _subgroupService.GetFirstLastestSubGroupCode(groupid);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetItemByItemId(int id)
        {
            var item = _subgroupService.GetSubGroupItemById(id);


            return new JsonResult(new { item = item });
        }

        [HttpGet]
        public JsonResult GetGroupNameSelect()
        {
            var data = _subgroupService.GetGroupNameSelect();

            return new JsonResult(data);
        }
        #endregion

        #region Post
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddItem([FromBody] SubGroupAddItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _subgroupService.AddSubGroupItem(obj);

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
        public JsonResult UpdateItem([FromBody] SubGroupItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _subgroupService.UpdateSubGroupItem(obj);

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
