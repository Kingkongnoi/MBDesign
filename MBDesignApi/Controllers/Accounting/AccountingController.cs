using AspNetCore.Reporting;
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
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AccountingController(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            _configuration = configuration;
            _accountingService = new AccountingService(_configuration);
            _webHostEnvironment = webHostEnvironment;
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
            var custOrder = _accountingService.GetCustOrderByOrderId(orderId);
            var imageUpload = _accountingService.GetAccountImage(orderId);

            var result = new
            {
                custOrder = custOrder,
                imageUpload = imageUpload
            };
            return new JsonResult(result);
        }

        [HttpGet]
        public JsonResult GetInvoiceById(int orderId, int invoiceId)
        {
            var custOrder = _accountingService.GetCustOrderByOrderId(orderId);
            var invoice = _accountingService.GetInvoiceByKeyId(invoiceId);
            var cust = new tbCust();
            if (custOrder != null)
            {
                cust = _accountingService.GetCustByCustId(custOrder.custId);
            }

            var result = new
            {
                custOrder = custOrder,
                invoice = invoice,
                cust = cust
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
        public JsonResult GetBillList(string invoiceNumber, string receiptNumber, string customerName, string receiptDate)
        {
            var data = _accountingService.GetReceiptList(invoiceNumber, receiptNumber, customerName, receiptDate);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetCustomerInformationByOrderId(int orderId, int invoiceId = 0)
        {
            var custOrder = _accountingService.GetCustOrderByOrderId(orderId);
            var invoice = new tbInvoice();
            if (invoiceId != 0)
            {
                invoice = _accountingService.GetInvoiceByKeyId(invoiceId);
            }

            var cust = new tbCust();
            if (custOrder != null)
            {
                cust = _accountingService.GetCustomerInformationByCustId(custOrder.custId);
            }

            var result = new
            {
                cust = cust,
                custOrder = custOrder,
                invoice = invoice
            };
            return new JsonResult(result);
        }
        [HttpGet]
        public IActionResult PrintInvoice()
        {
            //var custOrder = _accountingService.GetCustOrderByOrderId(orderId);
            //var invoice = new tbInvoice();
            //if (invoiceId != 0)
            //{
            //    invoice = _accountingService.GetInvoiceByKeyId(invoiceId);
            //}

            //var cust = new tbCust();
            //if (custOrder != null)
            //{
            //    cust = _accountingService.GetCustomerInformationByCustId(custOrder.custId);
            //}

            
            string mimtype = "";
            int extension = 1;
            var path = $"{Directory.GetCurrentDirectory()}\\reports\\InvoiceReport.rdlc";
            Dictionary<string, string> param = new Dictionary<string, string>();
            //param.Add("", "");

            LocalReport report = new LocalReport(path);
            var result = report.Execute(RenderType.Pdf, extension, param, mimtype);

            return File(result.MainStream, "application/pdf");
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

        [HttpPost]
        public JsonResult DoAddInvoice([FromBody]InvoiceModel obj)
        {
            var data = _accountingService.DoAddInvoice(obj);

            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult DoUpdateInvoice([FromBody]InvoiceModel obj)
        {
            var data = _accountingService.DoUpdateInvoice(obj);

            return new JsonResult(data);
        }
        #endregion POST
    }
}
