using BusinessLogicMBDesign.Master;
using BusinessLogicMBDesign.Spec;
using BusinessLogicMBDesign.Transportation;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TransportationListController : Controller
    {
        private readonly TransportationService _transportationService;
        private readonly SpecService _specService;
        private readonly IConfiguration _configuration;

        public TransportationListController(IConfiguration configuration)
        {
            _configuration = configuration;
            _transportationService = new TransportationService(_configuration);
            _specService = new SpecService(_configuration);
        }

        [HttpGet]
        public JsonResult GetMasterSpecListTP()
        {
            var data = _transportationService.getMasterCheckListTP();
            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetTPList(string quotaioncode)
        {
            var data = _transportationService.GetTPList(quotaioncode);
            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetTPListByID(int id, int orderid)
        {

            List<TPListModel> data = _transportationService.GetListTPListByID(id);
            var custOrder = _specService.Get3DQueueCustOrderByOrderId(data.Count > 0 ? data[0].orderid : orderid);

            var result = new
            {
                datatp = data,
                custOrder = custOrder

            };
            return new JsonResult(result);
        }

        [HttpGet]
        public JsonResult GetNameSelectTPList()
        {
            var data = _transportationService.GetNameSelectTP();

            return new JsonResult(data);
        }

        #region Post

        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddItem([FromBody] SaveTPModel obj)
        {
            var result = true;
            var resultStatus = "success";
            TPAddItemModel _saveSpec = new TPAddItemModel()
            {
                orderid = obj.orderid,
                specid = obj.specid,
                fittingid = obj.fittingid,
                status = true,
                loginCode = obj.loginCode,
            };
            var data = _transportationService.AddTPItem(_saveSpec);

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
            if (result != false)
            {
                int dataID = data.HasValue ? data.Value : 0;
                if (dataID > 0)
                {
                    TPListDetailItemModel _dataDetail = new TPListDetailItemModel()
                    {
                        transportationchecklistid = dataID,
                        empid = obj.empid,
                        checkliststatus = Convert.ToInt32(obj.checkliststatus),
                        loginCode = obj.loginCode,
                        transactionStatus = "A",
                        transactionActive = "A",
                        isApprove = true
                    };
                    data = _transportationService.AddTPDetailItem(_dataDetail);
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
                }

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
        public JsonResult UpdateItem([FromBody] TPListDetailUpdateItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _transportationService.UpdateTPList(obj);

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
            if (result != false)
            {
                int dataID = data.HasValue ? data.Value : 0;
                if (dataID > 0)
                {
                    TPAddItemModel _savePD = new TPAddItemModel();

                    _savePD = new TPAddItemModel
                    {
                        id = obj.id,
                        updateDate = DateTime.Now,
                        updateBy = obj.loginCode,
                    };
                    data = _transportationService.UpdateTPItem(_savePD);
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
                }

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
