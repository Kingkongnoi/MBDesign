using BusinessLogicMBDesign.Accounting;
using BusinessLogicMBDesign.Approve;
using BusinessLogicMBDesign.Design3D;
using BusinessLogicMBDesign.Master;
using BusinessLogicMBDesign.Sale;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignApi.Controllers.Accounting
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountingController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly AccountingService _accountingService;

        public AccountingController(IConfiguration configuration)
        {
            _configuration = configuration;
            _accountingService = new AccountingService(_configuration);
        }

        #region GET
        [HttpGet]
        public JsonResult GetAccountingList(string contractNumber, string quotationNumber, string customerName, string contractStatus, string contractDate)
        {
            var data = _accountingService.GetAccountingList(contractNumber, quotationNumber, customerName, contractStatus, contractDate);

            return new JsonResult(data);
        }
        
        [HttpGet]
        public JsonResult GetContractStatusSelect2()
        {
            var data = _accountingService.GetContractStatusSelect2();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetInvoiceStatusSelect2()
        {
            var data = _accountingService.GetInvoiceStatusSelect2();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetQuotaionStatusSelect2()
        {
            var data = _accountingService.GetQuotaionStatusSelect2();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetAccountingByOrderId(int orderId)
        {
            var custOrder = _accountingService.GetAccountingCustOrderByOrderId(orderId);
            var imageUpload = _accountingService.GetAccountImage(orderId);

            var result = new
            {
                custOrder = custOrder,
                imageUpload = imageUpload
            };
            return new JsonResult(result);
        }
        
        [HttpGet]
        public JsonResult GetInvoiceList(string quotationNumber, string invoiceNumber, string customerName, string invoiceStatus, string invoiceDate)
        {
            var data = _accountingService.GetInvoiceList(quotationNumber, invoiceNumber, customerName, invoiceStatus, invoiceDate);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GenerateInvoiceNumber()
        {
            var data = _accountingService.GenerateInvoiceNumber();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetBillList(string contractNumber, string quotationNumber, string customerName, string contractStatus, string contractDate)
        {
            var data = _accountingService.GetAccountingList(contractNumber, quotationNumber, customerName, contractStatus, contractDate);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetCustomerInformationByOrderId(int orderId)
        {
            var custOrder = _accountingService.GetAccountingCustOrderByOrderId(orderId);
            var cust = new tbCust();
            if (custOrder != null)
            {
                cust = _accountingService.GetCustomerInformationByCustId(custOrder.custId);
            }

            var result = new
            {
                cust = cust,
                custOrder = custOrder
            };
            return new JsonResult(result);
        }
        #endregion GET

        #region POST
        [HttpPost]
        public JsonResult DoSaveAccounting([FromBody]AccountingModel obj)
        {
            var data = _accountingService.DoUpdateAccountingCustomer(obj);

            return new JsonResult(data);
        }
        [HttpPost]
        public JsonResult DoSendToSaleAndForeman(int orderId)
        {
            var data = _accountingService.DoSendToSaleAndForeman(orderId);

            return new JsonResult(data);
        }
        #endregion POST
    }
}
