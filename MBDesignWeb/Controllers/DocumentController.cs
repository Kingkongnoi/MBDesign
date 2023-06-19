using AspNetCore.Reporting;
using AspNetCore.ReportingServices.ReportProcessing.ReportObjectModel;
using BusinessLogicMBDesign.Document;
using BusinessLogicMBDesign.Sale;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Mvc;
using PdfSharpCore;
using PdfSharpCore.Pdf;
using System;
using System.Drawing.Printing;
using System.Globalization;
using TheArtOfDev.HtmlRenderer.PdfSharp;

namespace MBDesignWeb.Controllers
{
    public class DocumentController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;

        private readonly DocumentService _documentService;
        private readonly SaleService _saleService;
        public DocumentController(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            _configuration = configuration;
            _documentService = new DocumentService(configuration);
            _saleService = new SaleService(configuration);
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index()
        {
            return View();
        }

        //[Route("api/[controller]/[action]")]
        //[HttpGet]
        //public IActionResult GenerateInvoice(int invoiceId)
        //{
        //    var document = new PdfDocument();
        //    string htmlContent = "<div>test</div>";
        //    PdfGenerator.AddPdfPages(document, htmlContent, PageSize.A4);
        //    byte[]? response = null;

        //    using (MemoryStream ms = new MemoryStream())
        //    {
        //        document.Save(ms);
        //        response = ms.ToArray();
        //    }

        //    string fileName = string.Format("Invoice_{0}.pdf", invoiceId);
        //    return File(response, "application/pdf", fileName);
        //}
        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetInvoiceByInvoiceId(int invoiceId)
        {
            var invoice = _documentService.GetInvoiceByInvoiceId(invoiceId);
            var cust = new tbCust();
            var custOrder = new CustOrderView();
            if (invoice != null)
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
        
        //[Route("api/[controller]/[action]")]
        [HttpGet]
        public IActionResult GetQuotaionByOrderId(int orderId)
        {
            var custOrder = _saleService.GetCustOrderByOrderId(orderId);
            var items = _saleService.GetCustOrderDetailByOrderId(orderId);
            var itemsOptions = _saleService.GetItemOptionsByOrderId(orderId);
            var cust = new tbCust();
            if (custOrder != null)
            {
                cust = _documentService.GetCustomerDataByCustId(custOrder.custId);
            }

            var result = new
            {
                custOrder = custOrder,
                cust = cust,
                items = items,
                itemsOptions = itemsOptions,
            };

            var simulateCustOrder = new CustOrderView
            {
                quotationNumber = "2066060017",
                cusName = "บริษัท สุขุมพร็อพเพอร์ตี้ จำกัด"
            };

            var simulateCust = new tbCust
            {
                custFirstName = "บริษัท สุขุมพร็อพเพอร์ตี้",
                custSurName = "จำกัด",
                custAddress = "102/5 ซอยหลังวัดต้นสน ตำบลบางปลาสร้อย อำเภอเมืองชลบุรี จังหวัดชลบุรี",
                custTel = "0909843524"
            };

            string mimetype = "";
            int extension = 1;
            var path = $"{this._webHostEnvironment.WebRootPath}\\reports\\rpInvoice.rdlc";

            System.Globalization.CultureInfo _cultureTHInfo = new System.Globalization.CultureInfo("th-TH");
            DateTime currDateThai = Convert.ToDateTime(DateTime.UtcNow, _cultureTHInfo);

            string cusName = string.Format("{0} {1}", simulateCust.custFirstName, simulateCust.custSurName);

            Dictionary<string, string> param = new Dictionary<string, string>();
            param.Add("qtNumber", simulateCustOrder.quotationNumber);
            param.Add("qtDate", currDateThai.ToString("dd/MM/yyyy"));
            param.Add("qtCusName", cusName);
            param.Add("qtCusIdNumber", "0205556012391");
            param.Add("qtCusAddress", simulateCust.custAddress);
            param.Add("qtCusTel", simulateCust.custTel);

            var simulateItems = new List<CustOrderDetailView>();
            simulateItems.Add(new CustOrderDetailView() {
                custOrderDetailId = 1,
                typeId = 1,
                typeName = "เฟอร์นิเจอร์ไม้บิ้วอิน  ไม้ HMR ทนชื้น เคลือบผิวเมลามีน",
                typePrice = 24000,
                itemId = 1,
                itemName = "ตู้สูงหน้าบานทึบ", 
                styleName = string.Format("Style : {0}", "Minimal"),
                itemPrice = 5000,
                orderLength = Convert.ToDecimal(1.60),
                orderDepth = Convert.ToDecimal(0.50),
                orderHeight = Convert.ToDecimal(2.43),
            });
            simulateItems.Add(new CustOrderDetailView()
            {
                custOrderDetailId = 2,
                typeId = 2,
                typeName = "เฟอร์นิเจอร์ไม้บิ้วอิน",
                typePrice = 35000,
                itemId = 1,
                itemName = "เก้าอี้ Top เบาะ",
                styleName = string.Format("Style : {0}", "Maximal"),
                itemPrice = 35000,
                orderLength = Convert.ToDecimal(1.60),
                orderDepth = Convert.ToDecimal(0.50),
                orderHeight = Convert.ToDecimal(2.70),
            });
            simulateItems.Add(new CustOrderDetailView()
            {
                custOrderDetailId = 3,
                typeId = 2,
                typeName = "เฟอร์นิเจอร์ไม้บิ้วอิน",
                typePrice = 35000,
                itemId = 1,
                itemName = "เก้าอี้ Top เบาะ 1",
                styleName = string.Format("Style : {0}", "Maximal"),
                itemPrice = 2000,
                orderLength = Convert.ToDecimal(1.60),
                orderDepth = Convert.ToDecimal(0.50),
                orderHeight = Convert.ToDecimal(2.70),
            });

            var simulateItemsOptions = new List<CustOrderItemOptionsView>();
            simulateItemsOptions.Add(new CustOrderItemOptionsView()
            {
                custOrderDetailId = 1,
                optionsId = 1,
                options = "มีช่องงวางของซ่อนไฟ 2 ฝั่ง (0.80)",
                optionsPrice = 5000
            });
            simulateItemsOptions.Add(new CustOrderItemOptionsView()
            {
                custOrderDetailId = 2,
                optionsId = 2,
                options = "ด้านล่างลิ้นชักบานทึบ",
                optionsPrice = 4000
            });
            simulateItemsOptions.Add(new CustOrderItemOptionsView()
            {
                custOrderDetailId = 1,
                optionsId = 3,
                options = "ด้านล่างลิ้นชักบานทึบ 1",
                optionsPrice = 500
            });

            var reportResult = new List<QuotationItemsList>();
            //var groups = from w in simulateItems
            //             group w by w.typeId;
            var groups = from w in simulateItems
                         group w by new { w.typeId };

            foreach (var item in groups)
            {
                var exists = simulateItems.Where(w => w.typeId == item.Key.typeId);
            }
            string value = "1605000";
            string output = ThaiBaht(value);

            LocalReport localReport = new LocalReport(path);
            localReport.AddDataSource("dsGetQuotationItems", reportResult);

            var fileResult = localReport.Execute(RenderType.Pdf, extension, param, mimetype);

            return File(fileResult.MainStream, "application/pdf");

            //return Json(result);
        }
        
        [Route("api/[controller]/[action]")]
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
        
        //[Route("api/[controller]/[action]")]
        [HttpGet]
        public IActionResult GetContractByContractId(int contractId)
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

            string mimetype = "";
            int extension = 1;
            var path = $"{this._webHostEnvironment.WebRootPath}\\reports\\rpCustomerContract.rdlc";

            Dictionary<string, string> param = new Dictionary<string, string>();
            param.Add("customer", "test");
            param.Add("qtDate", "test");
            param.Add("itemOptions", "test");
            param.Add("itemOptionsQty", "test");
            param.Add("customerAddress", "test");

            LocalReport localReport = new LocalReport(path);

            var fileResult = localReport.Execute(RenderType.Pdf, extension, param, mimetype);

            return File(fileResult.MainStream, "application/pdf");
            //return Json(result);
        }

        public string ThaiBaht(string txt)
        {
            string bahtTxt, n, bahtTH = "";
            double amount;
            try { 
                amount = Convert.ToDouble(txt); 
            }
            catch { 
                amount = 0; 
            }
            
            bahtTxt = amount.ToString("####.00");
            
            string[] num = { "ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า", "สิบ" };
            string[] rank = { "", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน" };
            
            string[] temp = bahtTxt.Split('.');
            string intVal = temp[0];
            string decVal = temp[1];
            
            if (Convert.ToDouble(bahtTxt) == 0)
                bahtTH = "ศูนย์บาทถ้วน";
            else
            {
                for (int i = 0; i < intVal.Length; i++)
                {
                    n = intVal.Substring(i, 1);
                    
                    if (n != "0")
                    {
                        if ((i == (intVal.Length - 1)) && (n == "1")) bahtTH += "เอ็ด";
                        else if ((i == (intVal.Length - 2)) && (n == "2")) bahtTH += "ยี่";
                        else if ((i == (intVal.Length - 2)) && (n == "1")) bahtTH += "";
                        else bahtTH += num[Convert.ToInt32(n)];
                        
                        bahtTH += rank[(intVal.Length - i) - 1];
                    }
                }
                
                bahtTH += "บาท";
                
                if (decVal == "00") bahtTH += "ถ้วน";
                else
                {
                    for (int i = 0; i < decVal.Length; i++)
                    {
                        n = decVal.Substring(i, 1);
                        
                        if (n != "0")
                        {
                            if ((i == decVal.Length - 1) && (n == "1"))
                                bahtTH += "เอ็ด";
                            else if ((i == (decVal.Length - 2)) && (n == "2"))
                                bahtTH += "ยี่";
                            else if ((i == (decVal.Length - 2)) && (n == "1"))
                                bahtTH += "";
                            else
                                bahtTH += num[Convert.ToInt32(n)];
                            bahtTH += rank[(decVal.Length - i) - 1];
                        }
                    }
                    bahtTH += "สตางค์";
                }
            }
            
            return bahtTH;
        }
    }
}
