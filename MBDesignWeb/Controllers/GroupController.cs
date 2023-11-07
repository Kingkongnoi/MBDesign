using BusinessLogicMBDesign.Master;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GroupController : Controller
    {
        private readonly GroupService _groupService;
        private readonly IConfiguration _configuration;

        public GroupController(IConfiguration configuration)
        {
            _configuration = configuration;
            _groupService = new GroupService(_configuration);
        }

        [HttpGet]
        public JsonResult GetGroupList(string groupName, int groupId, string status)
        {
            var data = _groupService.GetGroupList(groupId, groupName, status);

            return new JsonResult(data);
        }
        #region GET
        [HttpGet]
        public JsonResult GetLastestItemId()
        {
            var data = _groupService.GetFirstLastestItemId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetItemByItemId(int id)
        {
            var item = _groupService.GetGroupItemById(id);


            return new JsonResult(new { item = item});
        }
        #endregion

        #region Post
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddItem([FromBody] GroupItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _groupService.AddGroupItem(obj);

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
        public JsonResult UpdateItem([FromBody] GroupItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _groupService.UpdateGroupItem(obj);

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
