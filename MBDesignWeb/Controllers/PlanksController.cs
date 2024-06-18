using BusinessLogicMBDesign.Spec;
using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Reporting.Map.WebForms.BingMaps;
using System.Transactions;

namespace MBDesignWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PlanksController : Controller
    {
        private readonly PlanksService _planksService;
        private readonly PlanksDetailsService _planksDetailsService;
        private readonly SpecListDetailService _specListDetailService;
        private readonly IConfiguration _configuration;

        public PlanksController(IConfiguration configuration)
        {
            _configuration = configuration;
            _planksService = new PlanksService(_configuration);
            _planksDetailsService = new PlanksDetailsService(_configuration);   
            _specListDetailService = new SpecListDetailService(_configuration);
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
            var list = _planksService.GetPlanksDetailItemByID(id);
            return new JsonResult(new { item = item , list = list });
        }

        [HttpGet]
        public JsonResult GetItemByOrderId(int orderid)
        {
            var item = _planksService.GetPlanksItemByOrderId(orderid);
            var list = _planksService.GetPlanksDetailItemByID(item.id);
            return new JsonResult(new { item = item, list = list });
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
        public JsonResult AddItem([FromBody] PlanksAddModel obj)
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
            if (result != false)
            {
                int? chkData = 0;
                foreach (var item in obj.planksDetailsModels)
                {
                    chkData =  _planksDetailsService.AddPlanksDetailsItem(item,data);
                }
                if (chkData == -1)
                {
                    result = false;
                    resultStatus = "duplicate";
                }
                else if (chkData == 0)
                {
                    result = false;
                    resultStatus = "error";
                }
            }


            if (result != false)
            {
                if (obj.orderid > 0)
                {
                   int specid = _planksService.GetSpecIDByOrderID(obj.orderid);
                    if (specid>0)
                    {
                        specListDetailItemModel _dataDetail = new specListDetailItemModel()
                        {
                            specid = specid,
                            empid = obj.loginCode,
                            commitDate = DateTime.Now,
                            checkliststatus = 6,
                            loginCode = obj.loginCode,
                            transactionStatus = "A",
                            transactionActive = "A",
                            isApprove = true


                        };
                        data = _specListDetailService.AddSpecListDetailItem(_dataDetail);
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
        public JsonResult UpdateItem([FromBody] PlanksAddModel obj)
        {
            var result = true;
            var resultStatus = "success";

            string delid = obj.DeleteID;
            if (!string.IsNullOrWhiteSpace(delid))
            {
                string[] lsitdel = delid.Split(new char[','], StringSplitOptions.RemoveEmptyEntries);
                for (int i = 0; i < lsitdel.Length; i++)
                {
                    if (Convert.ToInt32(lsitdel[i].ToString()) !=0)
                    {
                        _planksDetailsService.DelItem(Convert.ToInt32(lsitdel[i].ToString()), obj.id);
                    }
                }
            }
            int? data = _planksService.UpdatePlanksItem(obj);
            if (data !=0)
            {
                foreach (var item in obj.planksDetailsModels)
                {
                    if (item.id == 0)
                    {
                        data = _planksDetailsService.AddPlanksDetailsItem(item, obj.id);
                    }
                }
             
            }
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