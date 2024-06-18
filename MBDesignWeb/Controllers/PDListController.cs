using BusinessLogicMBDesign.Design3D;
using BusinessLogicMBDesign.Foreman;
using BusinessLogicMBDesign.PD;
using BusinessLogicMBDesign.Sale;
using BusinessLogicMBDesign.Spec;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PDListController : Controller
    {
        private readonly PDService _pdService;
        private readonly SpecService _specService;
        private readonly IConfiguration _configuration;

        public PDListController(IConfiguration configuration)
        {
            _configuration = configuration;
            _pdService = new PDService(_configuration);
            _specService = new SpecService(_configuration);
        }

        [HttpGet]
        public JsonResult GetMasterSpecListPD()
        {
            var data = _pdService.getMasterCheckListPD();
            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetPDList(string quotaioncode)
        {
            var data = _pdService.GetPDList(quotaioncode);
            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetPDListByID(int id, int orderid)
        {

            List<PDListModel> data = _pdService.GetListPDListByID(id);
            var custOrder = _specService.Get3DQueueCustOrderByOrderId(data.Count > 0 ? data[0].orderid : orderid);

            var result = new
            {
                datapd = data,
                custOrder = custOrder

            };
            return new JsonResult(result);
        }

        [HttpGet]
        public JsonResult GetNameSelectPDList()
        {
            var data = _pdService.GetNameSelectPD();

            return new JsonResult(data);
        }

        #region Post

        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddItem([FromBody] SavePDModel obj)
        {
            var result = true;
            var resultStatus = "success";
            PDAddItemModel _saveSpec = new PDAddItemModel()
            {
                orderid = obj.orderid,
                specid = obj.specid,
                fittingid = obj.fittingid,
                status = true,
                loginCode = obj.loginCode,
            };
            var data = _pdService.AddPDItem(_saveSpec);

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
                    PDListDetailItemModel _dataDetail = new PDListDetailItemModel()
                    {
                        productchecklistid = dataID,
                        empid = obj.empid,
                        checkliststatus = Convert.ToInt32(obj.checkliststatus),
                        loginCode = obj.loginCode,
                        transactionStatus = "A",
                        transactionActive = "A",
                        isApprove = true
                    };
                    data = _pdService.AddPDDetailItem(_dataDetail);
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
        public JsonResult UpdateItem([FromBody] PDListDetailUpdateItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _pdService.UpdatePDList(obj);

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
                    PDAddItemModel _savePD = new PDAddItemModel();

                    _savePD = new PDAddItemModel
                    {
                        id = obj.id,
                        updateDate = DateTime.Now,
                        updateBy = obj.loginCode,
                    };
                    data = _pdService.UpdatePDItem(_savePD);
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
