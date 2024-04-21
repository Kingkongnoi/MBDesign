using BusinessLogicMBDesign.Calculate;
using BusinessLogicMBDesign.Spec;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FittingController : Controller
    {
        private readonly FittingService _fittingService;    
        private readonly SpecListDetailService _specListDetailService;
        private readonly IConfiguration _configuration;

        public FittingController(IConfiguration configuration)
        {
            _configuration = configuration;
            _fittingService = new FittingService(_configuration);
            _specListDetailService = new SpecListDetailService(_configuration);
        }

        #region GET
        [HttpGet]
        public JsonResult GetLastestItemId()
        {
            var data = _fittingService.GetFirstLastestItemId();

            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetQuatationListFitting()
        {
            var data = _fittingService.GetListQuotationNumbersFitting();
            return new JsonResult(data);
        }
        #endregion

    }
}
