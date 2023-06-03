using AspNetCore.Reporting;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    public class AccountingController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AccountingController(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            _configuration = configuration;
            _webHostEnvironment = webHostEnvironment;
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
        }

        public IActionResult Index()
        {
            ViewBag.apiUrl = _configuration.GetSection("apiUrl").Value;
            ViewBag.webUrl = _configuration.GetSection("webUrl").Value;
            return View();
        }

        public IActionResult PrintInvoice()
        {
            string mimtype = "";
            int extension = 1;
            var path = $"{this._webHostEnvironment.WebRootPath}\\reports\\InvoiceReport.rdlc";
            Dictionary<string, string> param = new Dictionary<string, string>();
            param.Add("customerName", "test");
            param.Add("invoiceNumber", "test");
            param.Add("invoiceDate", "333");
            param.Add("customerTax", "333");
            param.Add("customerAddress", "222");
            param.Add("customerTel", "11");
            param.Add("customerEmail", "111");

            LocalReport report = new LocalReport(path);
            var result = report.Execute(RenderType.Pdf, extension, param, mimtype);

            return File(result.MainStream, "application/pdf");
        }

    }
}
