using BusinessLogicMBDesign.Approve;
using BusinessLogicMBDesign.Design3D;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignApi.Controllers.Approve
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ApproveController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly ApproveService _approveService;
        public ApproveController(IConfiguration configuration)
        {
            _configuration = configuration;
            _approveService = new ApproveService(_configuration);
        }

        [HttpGet]
        public JsonResult GetCountCustOrderWaitForApprove()
        {
            var data = _approveService.GetCountCustOrderWaitForApprove();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetWaitApproveList()
        {
            var data = _approveService.GetWaitApproveList();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetApproveHistoryList()
        {
            var data = _approveService.GetApproveHistoryList();

            return new JsonResult(data);
        }
    }
}
