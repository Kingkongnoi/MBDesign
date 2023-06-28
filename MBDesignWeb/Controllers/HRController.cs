using BusinessLogicMBDesign.HR;
using BusinessLogicMBDesign.Master;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    public class HRController : Controller
    {
        private readonly IConfiguration _configuration;

        private readonly HRService _hrService;
        public HRController(IConfiguration configuration)
        {
            _configuration = configuration;

            _hrService = new HRService(_configuration);
        }

        public IActionResult Index()
        {
            ViewBag.apiUrl = _configuration.GetSection("apiUrl").Value;
            ViewBag.webUrl = _configuration.GetSection("webUrl").Value;
            ViewBag.imageUrl = _configuration.GetSection("imageUrl").Value;
            return View();
        }

        #region API
        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetLeaveTypeList(string leaveType, string status)
        {
            var data = _hrService.GetLeaveTypeList(leaveType, status);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetSelect2LeaveTypeName()
        {
            var data = _hrService.GetSelect2LeaveTypeName();

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetLeaveTypeById(int leaveTypeId)
        {
            var data = _hrService.GetLeaveTypeById(leaveTypeId);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        public JsonResult UpdateLeaveType([FromBody] LeaveTypeModel obj)
        {
            var msg = _hrService.UpdateLeaveType(obj);

            return new JsonResult(msg);
        }
        #endregion API
    }
}
