using AspNetCore.Reporting;
using BusinessLogicMBDesign.Accounting;
using BusinessLogicMBDesign;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace MBDesignWeb.Controllers
{
    public class AccountingController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;

        private readonly AccountingService _accountingService;
        private readonly UploadToAwsService _uploadToAwsService;
        private readonly UploadToDatabaseService _uploadToDatabaseService;

        public AccountingController(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            _configuration = configuration;
            _webHostEnvironment = webHostEnvironment;
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            _accountingService = new AccountingService(_configuration);
            _uploadToAwsService = new UploadToAwsService(_configuration);
            _uploadToDatabaseService = new UploadToDatabaseService(_configuration);
        }

        public IActionResult Index()
        {
            ViewBag.apiUrl = _configuration.GetSection("apiUrl").Value;
            ViewBag.webUrl = _configuration.GetSection("webUrl").Value;
            ViewBag.imageUrl = _configuration.GetSection("imageUrl").Value;
            return View();
        }

        #region GET
        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetAccountingList(string contractNumber, string quotationNumber, string customerName, string contractStatus, string contractDate)
        {
            var data = _accountingService.GetAccountingList(contractNumber, quotationNumber, customerName, contractStatus, contractDate);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetContractStatusSelect2()
        {
            var data = _accountingService.GetContractStatusSelect2();

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetInvoiceStatusSelect2()
        {
            var data = _accountingService.GetInvoiceStatusSelect2();

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetQuotaionStatusSelect2()
        {
            var data = _accountingService.GetQuotaionStatusSelect2();

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
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

        [Route("api/[controller]/[action]")]
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

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetInvoiceList(string quotationNumber, string invoiceNumber, string customerName, string invoiceStatus, string invoiceDate)
        {
            var data = _accountingService.GetInvoiceList(quotationNumber, invoiceNumber, customerName, invoiceStatus, invoiceDate);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GenerateInvoiceNumber()
        {
            var data = _accountingService.GenerateInvoiceNumber();

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetBillList(string invoiceNumber, string receiptNumber, string customerName, string receiptDate)
        {
            var data = _accountingService.GetReceiptList(invoiceNumber, receiptNumber, customerName, receiptDate);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetCustomerInformationByOrderId(int orderId, int invoiceId = 0)
        {
            var custOrder = new CustOrderView();
            custOrder = _accountingService.GetCustOrderByOrderId(orderId);
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
        
        [Route("api/[controller]/[action]")]
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

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetPeriodByOrderId(int orderId)
        {
            var data = _accountingService.GetPeriodByOrderId(orderId);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetIdCardComCert()
        {
            var data = _accountingService.GetIdCardComCert();

            return new JsonResult(data);
        }
        #endregion GET

        #region POST
        [Route("api/[controller]/[action]")]
        [HttpPost]
        public JsonResult DoSaveAccounting([FromBody] AccountingModel obj)
        {
            var data = _accountingService.DoUpdateAccountingCustomer(obj);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        public JsonResult DoSendToSaleAndForeman(int orderId)
        {
            var data = _accountingService.DoSendToSaleAndForeman(orderId);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        public JsonResult DoAddInvoice([FromBody] InvoiceModel obj)
        {
            var data = _accountingService.DoAddInvoice(obj);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        public JsonResult DoUpdateInvoice([FromBody] InvoiceModel obj)
        {
            var data = _accountingService.DoUpdateInvoice(obj);

            return new JsonResult(data);
        }
        [Route("api/[controller]/[action]")]
        [HttpPost]
        [DisableRequestSizeLimit]
        public ActionResult DoUpdateIdCard([FromQuery] string loginCode, List<IFormFile> files)
        {
            var msg = new ResultMessage();
            var addedUpload = _uploadToDatabaseService.GenerateUploadFilesObject(files).FirstOrDefault();

            ///Update data
            var result = _accountingService.DoUpdateIdCard(addedUpload, loginCode);
            if (result.isResult == false)
            {
                msg.isResult = result.isResult;
                return Json(msg);
            }
            return Json(msg);

        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        [DisableRequestSizeLimit]
        public ActionResult DoUpdateComCert([FromQuery] string loginCode, List<IFormFile> files)
        {
            var msg = new ResultMessage();
            var addedUpload = _uploadToDatabaseService.GenerateUploadFilesObject(files).FirstOrDefault();

            ///Update data
            var result = _accountingService.DoUpdateComCert(addedUpload, loginCode);
            if (result.isResult == false)
            {
                msg.isResult = result.isResult;
                return Json(msg);
            }
            return Json(msg);

        }
        #endregion POST
    }
}
