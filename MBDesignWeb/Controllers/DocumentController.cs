using Amazon.Runtime.Internal.Transform;
using AspNetCore.Reporting;
using AspNetCore.ReportingServices.ReportProcessing.ReportObjectModel;
using BusinessLogicMBDesign.Document;
using BusinessLogicMBDesign.Sale;
using EntitiesMBDesign;
using MailKit.Search;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Utilities;
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

            //var result = new
            //{
            //    custOrder = custOrder,
            //    cust = cust,
            //    items = items,
            //    itemsOptions = itemsOptions,
            //};

            string mimetype = "";
            int extension = 1;
            var path = $"{this._webHostEnvironment.WebRootPath}\\reports\\rpQuotation.rdlc";

            System.Globalization.CultureInfo _cultureTHInfo = new System.Globalization.CultureInfo("th-TH");
            DateTime currDateThai = Convert.ToDateTime(DateTime.UtcNow, _cultureTHInfo);

            string cusName = string.Format("{0} {1}", cust.custFirstName, cust.custSurName);

            string account = string.Format("ชื่อบัญชี {0} เลขที่บัญชี {1}\n{2}", custOrder.accountName, custOrder.accountNumber, custOrder.bank);

            Dictionary<string, string> param = new Dictionary<string, string>();
            param.Add("qtNumber", custOrder.quotationNumber);
            param.Add("qtDate", currDateThai.ToString("dd/MM/yyyy"));
            param.Add("qtCusName", cusName);
            param.Add("qtCusIdNumber", "0205556012391");
            param.Add("qtCusAddress", cust.custAddress);
            param.Add("qtCusTel", cust.custTel);
            param.Add("qtAccount", account);

            var reportResult = new List<QuotationItemsList>();
            //var groups = from w in simulateItems
            //             group w by w.typeId;
            var groups = from w in items
                         group w by new { w.typeId };

            foreach (var t in groups)
            {
                var exists = items.Where(w => w.typeId == t.Key.typeId).ToList();
                if (exists.Count() > 0)
                {
                    var getFirst = exists.FirstOrDefault();
                    string typeName = getFirst.typeName;
                    string styleName = string.Format("Style : {0}", getFirst.styleName);
                    string size = string.Format("ยาว {0} x {1} x {2}", getFirst.orderLength, getFirst.orderDepth, getFirst.orderHeight);

                    decimal calSpHeightPercentage = 0;
                    if (getFirst.orderHeight >= Convert.ToDecimal(2.70))
                    {
                        #region Calculate special height
                        calSpHeightPercentage = calSpHeightPercentage = ((100 / Convert.ToDecimal(2.60) * getFirst.orderHeight) - 100) / 100;
                        #endregion Calculate special height
                    }

                    //decimal unitPrice = getFirst.typePrice;

                    if (getFirst.itemId != 0)
                    {
                        int indx = 1;
                        foreach(var item in exists)
                        {
                            var options = itemsOptions.Where(w => w.custOrderDetailId == item.custOrderDetailId).ToList();
                            string itemName = item.itemName;
                            decimal unitPrice = 0;
                            decimal calUnitPrice = getFirst.typePrice + item.itemPrice;
                            if (options.Count() > 0)
                            {
                                foreach(var o in options)
                                {
                                    calUnitPrice = calUnitPrice + o.optionsPrice;
                                    itemName = itemName + " " + o.options;
                                }
                            }

                            int qty = 1;
                            if (calSpHeightPercentage != 0)
                            {
                                unitPrice = decimal.Ceiling((calUnitPrice * calSpHeightPercentage) + calUnitPrice);
                            }
                            else
                            {
                                unitPrice = calUnitPrice;
                            }

                            reportResult.Add(new QuotationItemsList
                            {
                                typeName = typeName,
                                styleName = styleName,
                                itemNo = indx,
                                itemName = itemName,
                                size = size,
                                unitPrice = unitPrice,
                                qty = qty,
                                amount = unitPrice * qty,
                                subTotal = custOrder.subTotal,
                                discount = custOrder.discount,
                                vat = custOrder.vat,
                                grandTotal = custOrder.grandTotal,
                                grandTotalThaiBath = this.ConvertToThaiBaht(custOrder.grandTotal.ToString())
                            });

                            indx++;
                        }
                    }
                    else
                    {
                        decimal unitPrice = 0;
                        int qty = 1;
                        if (calSpHeightPercentage != 0)
                        {
                            unitPrice = decimal.Ceiling((getFirst.typePrice * calSpHeightPercentage) + getFirst.typePrice);
                        }
                        else
                        {
                            unitPrice = getFirst.typePrice;
                        }

                        reportResult.Add(new QuotationItemsList
                        {
                            typeName = typeName,
                            styleName = styleName,
                            itemNo = 1,
                            itemName = typeName,
                            size = size,
                            unitPrice = unitPrice,
                            qty = qty,
                            amount = unitPrice * qty,
                            subTotal = custOrder.subTotal,
                            discount = custOrder.discount,
                            vat = custOrder.vat,
                            grandTotal = custOrder.grandTotal,
                            grandTotalThaiBath = this.ConvertToThaiBaht(custOrder.grandTotal.ToString())
                        });
                    }
                }
                
            }

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
            var items = new List<CustOrderDetailView>();
            var itemsOptions = new List<CustOrderItemOptionsView>();
            if (contract != null)
            {
                cust = _documentService.GetCustomerDataByCustId(contract.custId);
                custOrder = _documentService.GetCustOrderByQuotationNumber(contract.quotationNumber);
                items = _saleService.GetCustOrderDetailByOrderId(custOrder.orderId);
                itemsOptions = _saleService.GetItemOptionsByOrderId(custOrder.orderId);
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

            //*** Thai Format
            System.Globalization.CultureInfo _cultureTHInfo = new System.Globalization.CultureInfo("th-TH");
            DateTime dateThai = Convert.ToDateTime(custOrder.createDate, _cultureTHInfo);

            var groups = from w in items
                         group w by new { w.typeId };

            string itemString = string.Empty;
            int itemQty = 0;
            foreach (var t in groups)
            {
                var exists = items.Where(w => w.typeId == t.Key.typeId).ToList();
                if (exists.Count() > 0)
                {
                    var getFirst = exists.FirstOrDefault();
                    string typeName = getFirst.typeName;
                    string styleName = string.Format("Style : {0}", getFirst.styleName);
                    string size = string.Format("ยาว {0} x {1} x {2} เมตร", getFirst.orderLength, getFirst.orderDepth, getFirst.orderHeight);

                    itemString = itemString + string.Format("{0}\n", typeName);
                    int indx = 0;
                    foreach (var item in exists)
                    {
                        string itemName = item.itemName;

                        var options = itemsOptions.Where(w => w.custOrderDetailId == item.custOrderDetailId).ToList();
                        if (options.Count() > 0)
                        {
                            foreach (var o in options)
                            {
                                itemName = itemName + " " + o.options;
                            }
                        }

                        itemString = itemString + string.Format("{0}. {1} {2}\n", indx+1, itemName, size);

                        indx++;
                    }

                    itemQty = itemQty + indx;
                }
            }

            string account = string.Format("{0} เลขที่บัญชี {1} ชื่อบัญชี {2}", custOrder.bank, custOrder.accountNumber, custOrder.accountName);

            Dictionary<string, string> param = new Dictionary<string, string>();
            param.Add("customer", string.Format("{0} {1} ที่อยู่ {2}", cust.custFirstName, cust.custSurName, cust.custAddress));
            param.Add("qtDate", dateThai.ToString("dd MMMM yyyy", _cultureTHInfo));
            param.Add("itemOptions", itemString);
            param.Add("itemOptionsQty", string.Format("{0} ชิ้น", itemQty));
            param.Add("customerAddress", cust.custInstallAddress);
            param.Add("grandTotal", string.Format("{0:n} บาท ({1})",custOrder.grandTotal, ConvertToThaiBaht(custOrder.grandTotal.ToString())));
            param.Add("firstPeriodTotal", string.Format("{0:n} บาท ({1})", custOrder.disposite, ConvertToThaiBaht(custOrder.disposite.ToString())));
            decimal secondTotal = Convert.ToDecimal(custOrder.grandTotal * Convert.ToDecimal(0.5));
            param.Add("secondPeriodTotal", string.Format("{0:n} บาท ({1})", secondTotal, ConvertToThaiBaht(secondTotal.ToString())));

            decimal thirdTotal = Convert.ToDecimal(custOrder.grandTotal * Convert.ToDecimal(0.4));
            param.Add("thirdPeriodTotal", string.Format("{0:n} บาท ({1})", thirdTotal, ConvertToThaiBaht(thirdTotal.ToString())));
            param.Add("disposite", string.Format("{0:n} บาท ({1})", custOrder.disposite, ConvertToThaiBaht(custOrder.disposite.ToString())));

            decimal fouthTotal = Convert.ToDecimal((custOrder.grandTotal * Convert.ToDecimal(0.1)) - custOrder.disposite);
            param.Add("fouthPeriodTotal", string.Format("{0:n} บาท ({1})", fouthTotal, ConvertToThaiBaht(fouthTotal.ToString())));
            param.Add("bankAccount", account);
            DateTime predictDeliveryDate = Convert.ToDateTime(custOrder.installDate, _cultureTHInfo);
            param.Add("predictDeliveryDate", predictDeliveryDate.ToString("dd MMMM yyyy", _cultureTHInfo));

            DateTime deliveryDate = Convert.ToDateTime(custOrder.installDate, _cultureTHInfo);
            param.Add("deliveryDate", deliveryDate.ToString("dd MMMM yyyy", _cultureTHInfo));

            LocalReport localReport = new LocalReport(path);

            var fileResult = localReport.Execute(RenderType.Pdf, extension, param, mimetype);

            return File(fileResult.MainStream, "application/pdf");
            //return Json(result);
        }

        public string ConvertToThaiBaht(string txt)
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
