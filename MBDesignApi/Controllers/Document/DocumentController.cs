using BusinessLogicMBDesign.Document;
using BusinessLogicMBDesign.Sale;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Mvc;
using PdfSharpCore;
using PdfSharpCore.Pdf;
using TheArtOfDev.HtmlRenderer.PdfSharp;

namespace MBDesignApi.Controllers.Document
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DocumentController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly DocumentService _documentService;
        private readonly SaleService _saleService;
        public DocumentController(IConfiguration configuration)
        {
            _configuration = configuration;
            _documentService  = new DocumentService(configuration);
            _saleService = new SaleService(configuration);
        }

        [HttpGet]
        public IActionResult GenerateInvoice(int invoiceId)
        {
            var document = new PdfDocument();
            string htmlContent = "<div>test</div>";
            PdfGenerator.AddPdfPages(document, htmlContent, PageSize.A4);
            byte[]? response = null;

            using (MemoryStream ms = new MemoryStream())
            {
                document.Save(ms);
                response = ms.ToArray();
            }

            string fileName = string.Format("Invoice_{0}.pdf",invoiceId);
            return File(response, "application/pdf", fileName);
        }

        [HttpGet]
        public JsonResult GetInvoiceByInvoiceId(int invoiceId)
        {
            var invoice = _documentService.GetInvoiceByInvoiceId(invoiceId);
            var cust = new tbCust();
            var custOrder = new CustOrderView();
            if(invoice != null)
            {
                cust = _documentService.GetCustomerDataByCustId(invoice.custId);
                custOrder = _documentService.GetCustOrderByOrderId(invoice.orderId);
            }

            var result = new
            {
                invoice = invoice,
                cust = cust,
                custOrder = custOrder,
            };

            return Json(result);
        }

        [HttpGet]
        public JsonResult GetQuotaionByOrderId(int orderId)
        {
            var custOrder = _saleService.GetCustOrderByOrderId(orderId);
            var items = _saleService.GetCustOrderDetailByOrderId(orderId);
            var itemsOptions = _saleService.GetItemOptionsByOrderId(orderId);
            var cust = _documentService.GetCustomerDataByCustId(custOrder.custId);

            var result = new
            {
                custOrder = custOrder,
                cust = cust,
                items = items,
                itemsOptions = itemsOptions,
            };

            return Json(result);
        }

        [HttpGet]
        public JsonResult GetReceiptByReceiptId(int receiptId)
        {
            var receipt = _documentService.GetReceiptByReceiptId(receiptId);
            var invoice = _documentService.GetInvoiceByInvoiceId(receipt.invoiceId.Value);
            var cust = new tbCust();
            var custOrder = new CustOrderView();
            if (receipt != null)
            {
                cust = _documentService.GetCustomerDataByCustId(receipt.custId.Value);
                custOrder = _documentService.GetCustOrderByOrderId(receipt.orderId.Value);
            }

            var result = new
            {
                receipt = receipt,
                invoice = invoice,
                cust = cust,
                custOrder = custOrder,
            };

            return Json(result);
        }

        [HttpGet]
        public JsonResult GetContractByContractId(int contractId)
        {
            var contract = _documentService.GetContractByContractId(contractId);
            var cust = new tbCust();
            var custOrder = new CustOrderView();
            if (contract != null)
            {
                cust = _documentService.GetCustomerDataByCustId(contract.custId);
                custOrder = _documentService.GetCustOrderByQuotationNumber(contract.quotationNumber);
            }

            var result = new
            {
                contract = contract,
                cust = cust,
                custOrder = custOrder,
            };

            return Json(result);
        }
    }
}
