using BusinessLogicMBDesign.Calculate;
using BusinessLogicMBDesign.Master;
using BusinessLogicMBDesign.Spec;
using EntitiesMBDesign;
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
        public JsonResult GetFittingList(string fittingcode, string quotationNumber)
        {
            var data = _fittingService.GetFittingList(fittingcode, quotationNumber);

            return new JsonResult(data);
        }
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

        [HttpGet]
        public JsonResult GetItemByItemId(int id)
        {
            var data = _fittingService.getFittingByID(id);
            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetNameByOrderID(int id)
        {
            var data = _fittingService.getNameByOrderID(id);

            return new JsonResult(data);
        }
        #endregion

        #region POST
        public JsonResult AddItem([FromBody] AddFittingItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _fittingService.AddFittingItem(obj);

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

        [HttpPost]
        public JsonResult UpdateItem([FromBody] AddFittingItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _fittingService.UpdateFittingItem(obj);

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
