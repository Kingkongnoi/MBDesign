using BusinessLogicMBDesign;
using BusinessLogicMBDesign.Design3D;
using BusinessLogicMBDesign.Foreman;
using BusinessLogicMBDesign.Sale;
using BusinessLogicMBDesign.Spec;
using EntitiesMBDesign;
using MailKit.Search;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NPOI.HSSF.Record.Chart;
using NPOI.SS.Util;

namespace MBDesignWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SpecListController : Controller
    {
        private readonly SpecService _specService;
        private readonly SpecListDetailService _specListDetailService;
        private readonly Design3DService _design3DService;
        private readonly SaleService _saleService;
        private readonly ForemanService _foremanService;
        private readonly UploadToAwsService _uploadToAwsService;
        private readonly UploadToDatabaseService _uploadToDatabaseService;
        private readonly ftpProcessService _ftpProcessService;
        private readonly IConfiguration _configuration;

        public SpecListController(IConfiguration configuration)
        {
            _configuration = configuration;
            _specService = new SpecService(_configuration);
            _specListDetailService = new SpecListDetailService(_configuration);
            _design3DService = new Design3DService(_configuration);
            _saleService = new SaleService(_configuration);
            _foremanService = new ForemanService(_configuration);
            _uploadToAwsService = new UploadToAwsService(configuration);
            _uploadToDatabaseService = new UploadToDatabaseService(configuration);
            _ftpProcessService = new ftpProcessService(configuration);
        }

        #region GET

        [HttpGet]
        public JsonResult GetSpecList(string quotaioncode, string empName, string checkListStatus, string installDate)
        {

            var data = _specService.GetSpecList(quotaioncode, empName, 0, installDate);

            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetSpecListByID(int id,int orderid)
        {
            List<specListModel> data = _specService.GetListSpecListByID(id);
            var custOrder = _specService.Get3DQueueCustOrderByOrderId(data.Count > 0 ? data[0].orderid : orderid);
            var uploadRef = _specService.GetUploadRefByOrderId(data.Count > 0 ? data[0].orderid : orderid);
            var items = _saleService.GetCustOrderDetailByOrderId(data.Count > 0 ? data[0].orderid : orderid);
            var custOrderDetail = _foremanService.GetForemanCustOrderDetailByKeyId(data.Count > 0 ? data[0].orderid : orderid);
            string productcustomer = string.Empty;
            int count = 0;
            var imagesForeman = new List<UploadOrderDetailView>();
            if (items.Count > 0)
            {
                imagesForeman = _foremanService.GetForemanUpload(data.Count > 0 ? data[0].orderid : orderid, GlobalUploadCategory.foremanUpload);
            }
            foreach (var item in custOrderDetail)
            {
                if (count == 0)
                {
                    productcustomer = item.typeName;
                }
                else
                {
                    productcustomer += "," + item.typeName;
                }
                count++;
            }
  
            var result = new
            {
                dataspec = data,
                custOrder = custOrder,
                uploadRef = uploadRef,
                items = items,
                imagesForeman = imagesForeman,
                custOrderDetail = custOrderDetail,
                listproductname = productcustomer
                //items = items,
                //itemsOptions = itemsOptions,
                //cust = cust,
            };
            return new JsonResult(result);
        }
        [HttpGet]
        public JsonResult GetNewSpecListByID(int id)
        {
            specNewListModel data = _specService.getNewSpecByQuotationID(id);
            var custOrder = _specService.Get3DQueueCustOrderByOrderId(data.orderid);
            var uploadRef = _specService.GetUploadRefByOrderId(data.orderid);
            var items = _saleService.GetCustOrderDetailByOrderId(data.orderid);
            var custOrderDetail = _foremanService.GetForemanCustOrderDetailByKeyId(data.orderid);
            var imagesForeman = new List<UploadOrderDetailView>();
            if (items.Count > 0)
            {
                imagesForeman = _foremanService.GetForemanUpload(data.orderid, GlobalUploadCategory.foremanUpload);
            }
            var result = new
            {
                custOrder = custOrder,
                uploadRef = uploadRef,
                items = items,
                imagesForeman = imagesForeman,
                custOrderDetail = custOrderDetail
                //items = items,
                //itemsOptions = itemsOptions,
                //cust = cust,
            };
            return new JsonResult(result);
        }
        [HttpGet]
        public JsonResult GetQuatationList()
        {
            var data = _specService.GetListQuotationNumbers();
            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetQuatationListPlanks()
        {
            var data = _specService.GetListQuotationNumbersPlanks();
            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetMasterSpecList()
        {
            var data = _specService.getMasterCheckList();
            return new JsonResult(data);
        }

        public JsonResult GetEdiSpecByOrderId(int orderId)
        {
            var custOrder = _design3DService.Get3DQueueCustOrderByOrderId(orderId);
            var uploadRef = _saleService.GetUploadRefByOrderId(orderId);

            var result = new
            {
                custOrder = custOrder,
                uploadRef = uploadRef
                //items = items,
                //itemsOptions = itemsOptions,
                //cust = cust,
            };
            return new JsonResult(result);
        }
        //[HttpGet]
        //public JsonResult GetDesign3DSpecListByOrderId(int orderId)
        //{
        //    var custOrder = _specService.Get3DQueueCustOrderByOrderId(orderId);
        //    var uploadRef = _specService.GetUploadRefByOrderId(orderId);

        //    var result = new
        //    {
        //        custOrder = custOrder,
        //        uploadRef = uploadRef
        //        //items = items,
        //        //itemsOptions = itemsOptions,
        //        //cust = cust,
        //    };
        //    return new JsonResult(result);
        //}
        //[HttpGet]
        //public JsonResult GetItemByItemId(int id)
        //{
        //    var item = _planksService.GetPlanksItemById(id);

        //    return new JsonResult(new { item = item });
        //}

        //[HttpGet]
        //public JsonResult GetQuatationList()
        //{
        //    var item = _planksService.GetQuatationNoList();

        //    return new JsonResult(new { item = item });
        //}

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
        public JsonResult AddItem([FromBody] SaveSpecModel obj)
        {
            var result = true;
            var resultStatus = "success";
            specItemModel _saveSpec = new specItemModel()
            {
                orderid = obj.orderid,
                status = true,
                loginCode = obj.loginCode,
            };
            var data = _specService.AddSpecItem(_saveSpec);

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
                    specListDetailItemModel _dataDetail = new specListDetailItemModel()
                    {
                        specid = dataID,
                        empid = obj.empid,
                        commitDate = obj.commitdate,
                        checkliststatus = Convert.ToInt32(obj.checkliststatus),
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
            var returnData = new
            {
                result,
                resultStatus
            };

            return new JsonResult(returnData);
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult UpdateItem([FromBody] specListDetailUpdateItemModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _specListDetailService.UpdateSpecList(obj);

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
                    specItemModel _saveSpec = new specItemModel();
                    int[] liststatus = Array.ConvertAll(obj.listStatus.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries), s => int.Parse(s));
                    int maxStatus = liststatus.Max();
                    if (maxStatus == 4)
                    {
                        _saveSpec = new specItemModel
                        {
                            id = obj.id,
                            updateDate = DateTime.Now,
                            updateBy = obj.loginCode,
                            approveDate = Convert.ToDateTime(obj.approveDate),
                            approveBy = obj.empid
                        };
                    }
                    else
                    {
                        _saveSpec = new specItemModel
                        {
                            id = obj.id,
                            updateDate = DateTime.Now,
                            updateBy = obj.loginCode,
                        };
                    }


                    data = _specService.UpdateSpecItem(_saveSpec, maxStatus);
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
