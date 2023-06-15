using BusinessLogicMBDesign.Approve;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    public class ApproveController : Controller
    {
        private readonly IConfiguration _configuration;

        private readonly ApproveService _approveService;

        public ApproveController(IConfiguration configuration)
        {
            _configuration = configuration;

            _approveService = new ApproveService(_configuration);
        }

        public IActionResult Index()
        {
            ViewBag.apiUrl = _configuration.GetSection("apiUrl").Value;
            ViewBag.webUrl = _configuration.GetSection("webUrl").Value;
            return View();
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetCountCustOrderWaitForApprove()
        {
            var data = _approveService.GetCountCustOrderWaitForApprove();

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetWaitApproveList()
        {
            var data = _approveService.GetWaitApproveList();

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetApproveHistoryList()
        {
            var data = _approveService.GetApproveHistoryList();

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        public JsonResult DoApproveProcess([FromBody] ApproveModel obj)
        {
            var data = _approveService.DoApproveProcess(obj);

            return new JsonResult(data);
        }
    }
}
