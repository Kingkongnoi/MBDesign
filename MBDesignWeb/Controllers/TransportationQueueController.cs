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
    public class TransportationQueueController : Controller
    {
        private readonly TransportationQueueService _transportationqueueService;
        private readonly TransportationService _transportationService;
        private readonly IConfiguration _configuration;

        public TransportationQueueController(IConfiguration configuration)
        {
            _configuration = configuration;
            _transportationService = new TransportationService(configuration);
            _transportationqueueService = new TransportationQueueService(_configuration);
        }

        [HttpGet]
        public JsonResult GetTPQList(string drivername, int id)
        {
            var data = _transportationqueueService.GetTPQList(drivername, id);
            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetPrintTPQList(string drivername, int id)
        {
            var data = _transportationqueueService.GetTPQList(drivername, id).FirstOrDefault();
            var list = _transportationqueueService.GetTPQDetailList(id);

            return new JsonResult(new { item = data, list = list });
        }


        [HttpGet]
        public JsonResult GetBindingTPQList(string drivername, int id)
        {
            var data = _transportationqueueService.GetTPQList(drivername, id).FirstOrDefault();
            var list = _transportationqueueService.GetTPQDetailList(id);
            var empdata = _transportationqueueService.getEmpIDData(list[0].orderid);
            //var empdata = _transportationqueueService.getNameSelect(list[0].orderid);

            return new JsonResult(new { item = data, list = list, emp = empdata });
        }


        [HttpGet]
        public JsonResult GetCustNameSelect(string orderid)
        {
            if (orderid == "0")
            {
                orderid = string.Empty;
            }
            var data = _transportationqueueService.getNameSelect(orderid);
            return new JsonResult(data);
        }


        [HttpGet]
        public JsonResult GetQuotationSelect(string orderid)
        {
            if (orderid == "0")
            {
                orderid = string.Empty;
            }
            var data = _transportationqueueService.getQuotationNumberSelect(orderid);
            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetListData(int orderid)
        {
            var data = _transportationqueueService.GetListOrderDetailByOrderID(orderid);
            string itemnmaelist = string.Empty;
            GetListOrderDetail datalist = new GetListOrderDetail();
            if (data != null && data.Count > 0)
            {
                int count = 0;
                foreach (var item in data)
                {
                    if (count == 0)
                    {
                        itemnmaelist = item.itemName;
                    }
                    else
                    {
                        itemnmaelist += "," + item.itemName;
                    }
                    count++;
                }
                datalist.orderId = data[0].orderId;
                datalist.Fullname = data[0].Fullname;
                datalist.custAddress = data[0].custAddress;
                datalist.itemName = itemnmaelist;
            }
            return new JsonResult(datalist);
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddItem([FromBody] SaveTransportationModel obj)
        {
            var result = true;
            var resultStatus = "success";
            SaveQItemModel _saveq = new SaveQItemModel()
            {
                transportationdate = obj.transportationdate,
                drivername = obj.drivername,
                subdrivername1 = obj.subdrivername1,
                subdrivername2 = obj.subdrivername2,
                outboundmileage = obj.outboundmileage,
                inboundmileage = obj.inboundmileage,
                outboundtime = TimeSpan.ParseExact(obj.outboundtime, @"hh\:mm", System.Globalization.CultureInfo.InvariantCulture),
                inboundtime = TimeSpan.ParseExact(obj.inboundtime, @"hh\:mm", System.Globalization.CultureInfo.InvariantCulture),
                remark = obj.remark,
                loginCode = obj.loginCode
            };
            var data = _transportationqueueService.AddTPQItem(_saveq);

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
                    foreach (var item in obj.saveDetail)
                    {
                        tbTransportationQueueDetail _dataDetail = new tbTransportationQueueDetail()
                        {
                            transportationqueueid = dataID,
                            seqno = item.seqno,
                            orderid = item.orderid,
                            timeout = TimeSpan.ParseExact(item.timeout, @"hh\:mm", System.Globalization.CultureInfo.InvariantCulture),
                            timeto = TimeSpan.ParseExact(item.timeto, @"hh\:mm", System.Globalization.CultureInfo.InvariantCulture),
                        };
                        data = _transportationqueueService.AddTPDetailItem(_dataDetail);

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

                    if (data != -1 && data != 0)
                    {
                        int transcheckid = _transportationService.getTPIDByOrderID(obj.saveDetail[0].orderid);
                        TPListDetailItemModel _dataDetail = new TPListDetailItemModel()
                        {
                            transportationchecklistid = transcheckid,
                            empid = obj.empid,
                            checkliststatus = 3,
                            loginCode = obj.loginCode,
                            transactionStatus = "A",
                            transactionActive = "A",
                            isApprove = true
                        };
                        data = _transportationService.AddTPDetailItem(_dataDetail);

                        TPAddItemModel _savePD = new TPAddItemModel();

                        _savePD = new TPAddItemModel
                        {
                            id = transcheckid,
                            updateDate = DateTime.Now,
                            updateBy = obj.loginCode,
                        };
                        _transportationService.UpdateTPItem(_savePD);
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
        public JsonResult UpdateItem([FromBody] SaveTransportationModel obj)
        {
            var result = true;
            var resultStatus = "success";
            SaveQItemModel _saveq = new SaveQItemModel()
            {
                id = obj.id,
                transportationdate = obj.transportationdate,
                drivername = obj.drivername,
                subdrivername1 = obj.subdrivername1,
                subdrivername2 = obj.subdrivername2,
                outboundmileage = obj.outboundmileage,
                inboundmileage = obj.inboundmileage,
                outboundtime = TimeSpan.ParseExact(obj.outboundtime, @"hh\:mm", System.Globalization.CultureInfo.InvariantCulture),
                inboundtime = TimeSpan.ParseExact(obj.inboundtime, @"hh\:mm", System.Globalization.CultureInfo.InvariantCulture),
                remark = obj.remark,
                loginCode = obj.loginCode
            };
            var data = _transportationqueueService.UpdateTransItem(_saveq);

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

                if (obj.id > 0)
                {
                    foreach (var item in obj.saveDetail)
                    {
                        bool chkHaveDetail = _transportationqueueService.haveDetail(item.id) == 0 ? false : true;
                        if (!chkHaveDetail)
                        {
                            tbTransportationQueueDetail _dataDetail = new tbTransportationQueueDetail()
                            {
                                transportationqueueid = obj.id,
                                seqno = item.seqno,
                                orderid = item.orderid,
                                timeout = TimeSpan.ParseExact(item.timeout, @"hh\:mm", System.Globalization.CultureInfo.InvariantCulture),
                                timeto = TimeSpan.ParseExact(item.timeto, @"hh\:mm", System.Globalization.CultureInfo.InvariantCulture),
                            };
                            int? rtndata = _transportationqueueService.AddTPDetailItem(_dataDetail);
                            data = rtndata.HasValue ? rtndata.Value : 0;    
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
    }
}
