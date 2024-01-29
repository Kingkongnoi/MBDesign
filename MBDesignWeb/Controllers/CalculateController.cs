using AspNetCore.Reporting;
using BusinessLogicMBDesign.Calculate;
using BusinessLogicMBDesign.Master;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.Formula.Functions;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;
using NPOI.XWPF.UserModel;
using SixLabors.ImageSharp.ColorSpaces;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Net;
using System.Net.Http.Headers;

namespace MBDesignWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CalculateController : Controller
    {

        private readonly CalculateMasterService _calculateMasterService;
        private readonly CalculateDetailService _calculateDetailService;
        private readonly IConfiguration _configuration;

        public CalculateController(IConfiguration configuration)
        {
            _configuration = configuration;
            _calculateMasterService = new CalculateMasterService(_configuration);
            _calculateDetailService = new CalculateDetailService(_configuration);
        }

        #region GET
        [HttpGet]
        public JsonResult GetLastestItemId()
        {
            var data = _calculateMasterService.GetFirstLastestItemId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetCalMasterByCode(string calculatecode)
        {
            var data = _calculateMasterService.GetCalculateMasterList(0, calculatecode);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetStockProductSelect()
        {
            var data = _calculateDetailService.getStockProductDataSelect();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetCustListSelect()
        {
            var data = _calculateDetailService.geCustListDataSelect();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetCustDetailList(string id)
        {
            var data = _calculateDetailService.geCustListDataByIDSelect(id);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetCalByCode(string calcode, string caltype)
        {
            var data = _calculateDetailService.GetCalculateList(calcode, caltype);
            data.ForEach(x =>
            {
                x.productname = string.Format("{0}-{1}", x.productcode, x.productname);
                if (x.glassdoortype =="S")
                {
                    x.glassdoortype = "บานเดี่ยว";
                }
                else
                {
                    x.glassdoortype = "บานคู่";
                }
            });
            return new JsonResult(data);
        }
        #endregion

        #region Post
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddGlassFrameItem([FromBody] SaveCalculate obj)
        {
            var result = true;
            var resultStatus = "success";
            CalculateMasterAddModel _master = new CalculateMasterAddModel
            {
                calculatecode = obj.calculatecode,
                calculatetype = "F",
                loginCode = obj.userlogin
            };
            var dataMaster = _calculateMasterService.AddCalculateMasterItem(_master);

            if (dataMaster == -1)
            {
                result = false;
                resultStatus = "duplicate";
            }
            else if (dataMaster == 0)
            {
                result = false;
                resultStatus = "error";
            }
            else
            {
                if (obj.listdetail != null && obj.listdetail.Count > 0)
                {
                    foreach (var item in obj.listdetail)
                    {
                        CalculateDetailAddModel _model = new CalculateDetailAddModel();
                        int masterID = dataMaster.HasValue ? dataMaster.Value : 0;
                        if (masterID != 0)
                        {
                            _model.calculateMasterID = masterID;
                            _model.productcode = item.product;
                            _model.glassdoortype = item.glassdoortype;
                            _model.masterheigh = Convert.ToInt32(item.calhm);
                            _model.masterwidth = Convert.ToInt32(item.calwm);
                            _model.calheigh = float.Parse(item.calh, CultureInfo.InvariantCulture.NumberFormat);
                            _model.calwidth = float.Parse(item.calw, CultureInfo.InvariantCulture.NumberFormat); ;
                            _model.deburringheigh = float.Parse(item.calhdel, CultureInfo.InvariantCulture.NumberFormat); ;
                            _model.deburringwidth = float.Parse(item.calwdel, CultureInfo.InvariantCulture.NumberFormat); ;
                        }
                        var data = _calculateDetailService.AddCalculateDetailItem(_model);
                        if (data == -1)
                        {
                            result = false;
                            resultStatus = "duplicate";
                            break;
                        }
                        else if (data == 0)
                        {
                            result = false;
                            resultStatus = "error";
                            break;
                        }
                        else
                        {
                            result = true;
                            resultStatus = "success";
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
        public JsonResult AddClearGlassItem([FromBody] SaveCalculate obj)
        {
            var result = true;
            var resultStatus = "success";
            CalculateMasterAddModel _master = new CalculateMasterAddModel
            {
                calculatecode = obj.calculatecode,
                calculatetype = "C",
                loginCode = obj.userlogin
            };
            var dataMaster = _calculateMasterService.AddCalculateMasterItem(_master);

            if (dataMaster == -1)
            {
                result = false;
                resultStatus = "duplicate";
            }
            else if (dataMaster == 0)
            {
                result = false;
                resultStatus = "error";
            }
            else
            {
                if (obj.listdetail != null && obj.listdetail.Count > 0)
                {
                    foreach (var item in obj.listdetail)
                    {
                        CalculateDetailAddModel _model = new CalculateDetailAddModel();
                        int masterID = dataMaster.HasValue ? dataMaster.Value : 0;
                        if (masterID != 0)
                        {
                            _model.calculateMasterID = masterID;
                            _model.productcode = item.product;
                            _model.glassdoortype = item.glassdoortype;
                            _model.masterheigh = Convert.ToInt32(item.calhm);
                            _model.masterwidth = Convert.ToInt32(item.calwm);
                            _model.calheigh = float.Parse(item.calh, CultureInfo.InvariantCulture.NumberFormat);
                            _model.calwidth = float.Parse(item.calw, CultureInfo.InvariantCulture.NumberFormat); ;

                        }
                        var data = _calculateDetailService.AddCalculateDetailItem(_model);
                        if (data == -1)
                        {
                            result = false;
                            resultStatus = "duplicate";
                            break;
                        }
                        else if (data == 0)
                        {
                            result = false;
                            resultStatus = "error";
                            break;
                        }
                        else
                        {
                            result = true;
                            resultStatus = "success";
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

        //[HttpPost]
        #region Frame
        public FileResult ExportFrameCal(string calcode, string glassdoorType, string CreateDate, string InstallDate, string CustName, string InstallAddress)
        {
            IWorkbook wb = SetExportFile(calcode, glassdoorType, CreateDate, InstallDate, CustName, InstallAddress);
            using (MemoryStream ms = new MemoryStream())
            {
                wb.Write(ms);
                string saveAsFileName = string.Format("FrameExport{0}-{1}.xlsx", calcode, DateTime.Now.ToString("ddMMyyyyHHmmss"));
                byte[] bytes = ms.ToArray();
                return File(bytes, "application/vnd.ms-excel", saveAsFileName);
            }
        }

        private IWorkbook SetExportFile(string calcode, string glassdoorType, string CreateDate, string InstallDate, string CustName, string InstallAddress)
        {
            IWorkbook wb = new XSSFWorkbook();
            ISheet ws = wb.CreateSheet("MySheet");
            IRow rowHeader = ws.CreateRow(2);

            var font = wb.CreateFont();
            font.FontHeightInPoints = 16;
            font.FontName = "Sarabun";
            font.IsBold = true;

            var fonthead = wb.CreateFont();
            fonthead.FontHeightInPoints = 16;
            fonthead.FontName = "Sarabun";
            fonthead.Underline = FontUnderlineType.Single;

            var fonthead2 = wb.CreateFont();
            fonthead2.FontHeightInPoints = 16;
            fonthead2.FontName = "Sarabun";

            //IRow rowSubHeader = ws.CreateRow(3);
            //ICellStyle styleMiddle = wb.CreateCellStyle();
            var cellStyleBorder = wb.CreateCellStyle();
            cellStyleBorder.BorderBottom = BorderStyle.Thin;
            cellStyleBorder.BorderLeft = BorderStyle.Thin;
            cellStyleBorder.BorderRight = BorderStyle.Thin;
            cellStyleBorder.BorderTop = BorderStyle.Thin;
            cellStyleBorder.Alignment = HorizontalAlignment.Center;
            cellStyleBorder.VerticalAlignment = VerticalAlignment.Center;

            var cellStyleFontHead = wb.CreateCellStyle();
            cellStyleFontHead.Alignment = HorizontalAlignment.Center;
            cellStyleFontHead.VerticalAlignment = VerticalAlignment.Center;

            var setHeaderDeatilStyle = wb.CreateCellStyle();
            setHeaderDeatilStyle.CloneStyleFrom(cellStyleFontHead);
            setHeaderDeatilStyle.FillPattern = FillPattern.SolidForeground;
            setHeaderDeatilStyle.SetFont(fonthead);
            ((XSSFCellStyle)setHeaderDeatilStyle).SetFillForegroundColor(new XSSFColor(new byte[] { 255, 255, 255 }));


            var cellstyleSubhead1 = wb.CreateCellStyle();
            cellstyleSubhead1.CloneStyleFrom(cellStyleBorder);
            cellstyleSubhead1.FillPattern = FillPattern.SolidForeground;
            cellstyleSubhead1.SetFont(font);
            ((XSSFCellStyle)cellstyleSubhead1).SetFillForegroundColor(new XSSFColor(new byte[] { 191, 191, 191 }));

            var cellstyleSubhead2 = wb.CreateCellStyle();
            cellstyleSubhead2.CloneStyleFrom(cellStyleBorder);
            cellstyleSubhead2.FillPattern = FillPattern.SolidForeground;
            cellstyleSubhead2.SetFont(font);
            ((XSSFCellStyle)cellstyleSubhead2).SetFillForegroundColor(new XSSFColor(new byte[] { 251, 212, 180 }));

            var cellstyleSubhead3 = wb.CreateCellStyle();
            cellstyleSubhead3.CloneStyleFrom(cellStyleBorder);
            cellstyleSubhead3.FillPattern = FillPattern.SolidForeground;
            cellstyleSubhead3.SetFont(font);
            ((XSSFCellStyle)cellstyleSubhead3).SetFillForegroundColor(new XSSFColor(new byte[] { 219, 229, 241 }));

            var cellstyleHeader = wb.CreateCellStyle();
            cellstyleHeader.CloneStyleFrom(cellStyleBorder);
            cellstyleHeader.FillPattern = FillPattern.SolidForeground;
            cellstyleHeader.SetFont(font);
            ((XSSFCellStyle)cellstyleHeader).SetFillForegroundColor(new XSSFColor(new byte[] { 229, 223, 236, 255 }));

            var cellstylerow = wb.CreateCellStyle();
            cellstylerow.CloneStyleFrom(cellStyleBorder);
            cellstylerow.FillPattern = FillPattern.SolidForeground;
            cellstylerow.SetFont(font);
            ((XSSFCellStyle)cellstylerow).SetFillForegroundColor(new XSSFColor(new byte[] { 255, 255, 0 }));

            var cellstylerow2 = wb.CreateCellStyle();
            cellstylerow2.CloneStyleFrom(cellStyleBorder);
            cellstylerow2.FillPattern = FillPattern.SolidForeground;
            cellstylerow2.SetFont(font);
            ((XSSFCellStyle)cellstylerow2).SetFillForegroundColor(new XSSFColor(new byte[] { 255, 255, 255 }));

            var cellstylerow3 = wb.CreateCellStyle();
            cellstylerow3.CloneStyleFrom(cellStyleBorder);
            cellstylerow3.FillPattern = FillPattern.SolidForeground;
            cellstylerow3.SetFont(font);
            ((XSSFCellStyle)cellstylerow3).SetFillForegroundColor(new XSSFColor(new byte[] { 204, 255, 204 }));

            var cellstylerow4 = wb.CreateCellStyle();
            cellstylerow4.CloneStyleFrom(cellStyleBorder);
            cellstylerow4.FillPattern = FillPattern.SolidForeground;
            cellstylerow4.SetFont(font);
            ((XSSFCellStyle)cellstylerow4).SetFillForegroundColor(new XSSFColor(new byte[] { 253, 233, 217 }));

            var cellstylerow5 = wb.CreateCellStyle();
            cellstylerow5.CloneStyleFrom(cellStyleBorder);
            cellstylerow5.FillPattern = FillPattern.SolidForeground;
            cellstylerow5.SetFont(font);
            ((XSSFCellStyle)cellstylerow5).SetFillForegroundColor(new XSSFColor(new byte[] { 218, 238, 243 }));

            var r1 = ws.CreateRow(0);
            r1.CreateCell(0, CellType.String).SetCellValue("เลขที่ใบรายการ");
            r1.Cells[0].CellStyle.SetFont(fonthead2);
            ws.SetColumnWidth(0, 82 * 40);

            r1.CreateCell(1, CellType.String).SetCellValue(calcode);
            r1.Cells[1].CellStyle = setHeaderDeatilStyle;
            ws.SetColumnWidth(1, 102 * 40);

            r1.CreateCell(2, CellType.String).SetCellValue("วันที่จัด");
            r1.Cells[2].CellStyle.SetFont(fonthead2);
            ws.SetColumnWidth(2, 82 * 40);

            r1.CreateCell(3, CellType.String).SetCellValue(CreateDate);
            r1.Cells[3].CellStyle = setHeaderDeatilStyle;
            ws.SetColumnWidth(3, 102 * 40);

            r1.CreateCell(4, CellType.String).SetCellValue("วันที่ส่ง");
            r1.Cells[4].CellStyle.SetFont(fonthead2);
            ws.SetColumnWidth(4, 82 * 40);

            r1.CreateCell(5, CellType.String).SetCellValue(InstallDate);
            r1.Cells[5].CellStyle = setHeaderDeatilStyle;
            ws.SetColumnWidth(5, 102 * 40);

            var r1_2 = ws.CreateRow(1);
            r1_2.CreateCell(0, CellType.String).SetCellValue("ชื่อลูกค้า");
            r1_2.Cells[0].CellStyle.SetFont(fonthead2);
            ws.SetColumnWidth(0, 82 * 40);

            r1_2.CreateCell(1, CellType.String).SetCellValue(CustName);
            r1_2.Cells[1].CellStyle = setHeaderDeatilStyle;
            ws.SetColumnWidth(1, 102 * 40);

            r1_2.CreateCell(2, CellType.String).SetCellValue("ที่อยู่");
            r1_2.Cells[2].CellStyle.SetFont(fonthead2);
            ws.SetColumnWidth(2, 82 * 40);

            r1_2.CreateCell(3, CellType.String).SetCellValue(InstallAddress);
            r1_2.Cells[3].CellStyle = setHeaderDeatilStyle;
            ws.SetColumnWidth(3, 102 * 40);

            var r2 = ws.CreateRow(3);
            r2.CreateCell(0, CellType.String).SetCellValue("ลำดับ");
            r2.Cells[0].CellStyle = cellstyleSubhead1;
            ws.SetColumnWidth(0, 62 * 40);

            r2.CreateCell(1, CellType.String).SetCellValue("ชื่อสินค้า");
            r2.Cells[1].CellStyle = cellstyleSubhead1;
            ws.SetColumnWidth(1, 244 * 40);

            r2.CreateCell(2, CellType.String).SetCellValue("ประเภทบาน");
            r2.Cells[2].CellStyle = cellstyleSubhead1;
            ws.SetColumnWidth(2, 244 * 40);

            r2.CreateCell(3, CellType.String).SetCellValue("ความสูงตู้ cm");
            r2.Cells[3].CellStyle = cellstyleSubhead1;
            ws.SetColumnWidth(3, 144 * 40);

            r2.CreateCell(4, CellType.String).SetCellValue("ความกว้างตู้ cm");
            r2.Cells[4].CellStyle = cellstyleSubhead1;
            ws.SetColumnWidth(4, 144 * 40);

            r2.CreateCell(5, CellType.String).SetCellValue("สั่งเฟรมสูง");
            r2.Cells[5].CellStyle = cellstyleSubhead2;
            ws.SetColumnWidth(5, 144 * 40);

            r2.CreateCell(6, CellType.String).SetCellValue("สั่งเฟรมกว้าง");
            r2.Cells[6].CellStyle = cellstyleSubhead2;
            ws.SetColumnWidth(6, 144 * 40);

            r2.CreateCell(7, CellType.String).SetCellValue("สั่งกระจกลบคมสูง");
            r2.Cells[7].CellStyle = cellstyleSubhead3;
            ws.SetColumnWidth(7, 158 * 40);

            r2.CreateCell(8, CellType.String).SetCellValue("สั่งกระจกลบคมกว้าง");
            r2.Cells[8].CellStyle = cellstyleSubhead3;
            ws.SetColumnWidth(8, 158 * 40);

            List<CalculateDetailItemModel> _list = _calculateDetailService.GetCalculateList(calcode, glassdoorType, "F");
            if (_list != null && _list.Count > 0)
            {
                int _rows = 4;
                int _index = 1;
                foreach (var item in _list)
                {
                    var crows = ws.CreateRow(_rows);
                    crows.CreateCell(0, CellType.String).SetCellValue(_index);
                    crows.Cells[0].CellStyle = cellstylerow2;

                    crows.CreateCell(1, CellType.String).SetCellValue(item.productname);
                    crows.Cells[1].CellStyle = cellstylerow;

                    crows.CreateCell(2, CellType.String).SetCellValue(item.glassdoortype == "S" ? "บานเดี่ยว" : "บานคู่");
                    crows.Cells[2].CellStyle = cellstylerow;

                    crows.CreateCell(3, CellType.String).SetCellValue(item.masterheigh);
                    crows.Cells[3].CellStyle = cellstylerow;

                    crows.CreateCell(4, CellType.String).SetCellValue(item.masterwidth);
                    crows.Cells[4].CellStyle = cellstylerow;

                    crows.CreateCell(5, CellType.String).SetCellValue(item.calheigh.HasValue ? item.calheigh.Value.ToString("0.00") : "0");
                    crows.Cells[5].CellStyle = cellstylerow3;

                    crows.CreateCell(6, CellType.String).SetCellValue(item.calwidth.HasValue ? item.calwidth.Value.ToString("0.00") : "0");
                    crows.Cells[6].CellStyle = cellstylerow4;

                    crows.CreateCell(7, CellType.String).SetCellValue(item.deburringheigh.HasValue ? item.deburringheigh.Value.ToString("0.00") : "0");
                    crows.Cells[7].CellStyle = cellstylerow5;

                    crows.CreateCell(8, CellType.String).SetCellValue(item.deburringwidth.HasValue ? item.deburringwidth.Value.ToString("0.00") : "0");
                    crows.Cells[8].CellStyle = cellstylerow5;

                    _index++;
                    _rows++;
                }
            }

            rowHeader.CreateCell(0).SetCellValue("สูตรคำนวณการสั่งเฟรมและกระจก");

            //Merge the cell
            CellRangeAddress region = new CellRangeAddress(2, 2, 0, 8);

            ws.AddMergedRegion(region);
            RegionUtil.SetBorderBottom(1, region, ws);//Bottom border  
            RegionUtil.SetBorderLeft(1, region, ws);//Left border  
            RegionUtil.SetBorderRight(1, region, ws);//Right border  
            RegionUtil.SetBorderTop(1, region, ws);

            rowHeader.GetCell(0).CellStyle = cellstyleHeader;
            return wb;
        }
        #endregion

        #region ClearGlass
        public FileResult ExportClearGlassCal(string calcode, string glassdoorType, string CreateDate, string InstallDate, string CustName, string InstallAddress)
        {
            IWorkbook wb = SetClearGlassExportFile(calcode, glassdoorType, CreateDate, InstallDate, CustName, InstallAddress);
            using (MemoryStream ms = new MemoryStream())
            {
                wb.Write(ms);
                string saveAsFileName = string.Format("ClearGlassaExport{0}-{1}.xlsx", calcode, DateTime.Now.ToString("ddMMyyyyHHmmss"));
                byte[] bytes = ms.ToArray();
                return File(bytes, "application/vnd.ms-excel", saveAsFileName);
            }
        }

        private IWorkbook SetClearGlassExportFile(string calcode, string glassdoorType, string CreateDate, string InstallDate, string CustName, string InstallAddress)
        {
            IWorkbook wb = new XSSFWorkbook();
            ISheet ws = wb.CreateSheet("MySheet");
            IRow rowHeader = ws.CreateRow(2);

            var font = wb.CreateFont();
            font.FontHeightInPoints = 16;
            font.FontName = "Sarabun";
            font.IsBold = true;

            var fonthead = wb.CreateFont();
            fonthead.FontHeightInPoints = 16;
            fonthead.FontName = "Sarabun";
            fonthead.Underline = FontUnderlineType.Single;

            var fonthead2 = wb.CreateFont();
            fonthead2.FontHeightInPoints = 16;
            fonthead2.FontName = "Sarabun";

            //IRow rowSubHeader = ws.CreateRow(3);
            //ICellStyle styleMiddle = wb.CreateCellStyle();
            var cellStyleBorder = wb.CreateCellStyle();
            cellStyleBorder.BorderBottom = BorderStyle.Thin;
            cellStyleBorder.BorderLeft = BorderStyle.Thin;
            cellStyleBorder.BorderRight = BorderStyle.Thin;
            cellStyleBorder.BorderTop = BorderStyle.Thin;
            cellStyleBorder.Alignment = HorizontalAlignment.Center;
            cellStyleBorder.VerticalAlignment = VerticalAlignment.Center;

            var cellStyleFontHead = wb.CreateCellStyle();
            cellStyleFontHead.Alignment = HorizontalAlignment.Center;
            cellStyleFontHead.VerticalAlignment = VerticalAlignment.Center;

            var setHeaderDeatilStyle = wb.CreateCellStyle();
            setHeaderDeatilStyle.CloneStyleFrom(cellStyleFontHead);
            setHeaderDeatilStyle.FillPattern = FillPattern.SolidForeground;
            setHeaderDeatilStyle.SetFont(fonthead);
            ((XSSFCellStyle)setHeaderDeatilStyle).SetFillForegroundColor(new XSSFColor(new byte[] { 255, 255, 255 }));


            var cellstyleSubhead1 = wb.CreateCellStyle();
            cellstyleSubhead1.CloneStyleFrom(cellStyleBorder);
            cellstyleSubhead1.FillPattern = FillPattern.SolidForeground;
            cellstyleSubhead1.SetFont(font);
            ((XSSFCellStyle)cellstyleSubhead1).SetFillForegroundColor(new XSSFColor(new byte[] { 191, 191, 191 }));

            var cellstyleSubhead2 = wb.CreateCellStyle();
            cellstyleSubhead2.CloneStyleFrom(cellStyleBorder);
            cellstyleSubhead2.FillPattern = FillPattern.SolidForeground;
            cellstyleSubhead2.SetFont(font);
            ((XSSFCellStyle)cellstyleSubhead2).SetFillForegroundColor(new XSSFColor(new byte[] { 251, 212, 180 }));

            var cellstyleSubhead3 = wb.CreateCellStyle();
            cellstyleSubhead3.CloneStyleFrom(cellStyleBorder);
            cellstyleSubhead3.FillPattern = FillPattern.SolidForeground;
            cellstyleSubhead3.SetFont(font);
            ((XSSFCellStyle)cellstyleSubhead3).SetFillForegroundColor(new XSSFColor(new byte[] { 219, 229, 241 }));

            var cellstyleHeader = wb.CreateCellStyle();
            cellstyleHeader.CloneStyleFrom(cellStyleBorder);
            cellstyleHeader.FillPattern = FillPattern.SolidForeground;
            cellstyleHeader.SetFont(font);
            ((XSSFCellStyle)cellstyleHeader).SetFillForegroundColor(new XSSFColor(new byte[] { 229, 223, 236, 255 }));

            var cellstylerow = wb.CreateCellStyle();
            cellstylerow.CloneStyleFrom(cellStyleBorder);
            cellstylerow.FillPattern = FillPattern.SolidForeground;
            cellstylerow.SetFont(font);
            ((XSSFCellStyle)cellstylerow).SetFillForegroundColor(new XSSFColor(new byte[] { 255, 255, 0 }));

            var cellstylerow2 = wb.CreateCellStyle();
            cellstylerow2.CloneStyleFrom(cellStyleBorder);
            cellstylerow2.FillPattern = FillPattern.SolidForeground;
            cellstylerow2.SetFont(font);
            ((XSSFCellStyle)cellstylerow2).SetFillForegroundColor(new XSSFColor(new byte[] { 255, 255, 255 }));

            var cellstylerow3 = wb.CreateCellStyle();
            cellstylerow3.CloneStyleFrom(cellStyleBorder);
            cellstylerow3.FillPattern = FillPattern.SolidForeground;
            cellstylerow3.SetFont(font);
            ((XSSFCellStyle)cellstylerow3).SetFillForegroundColor(new XSSFColor(new byte[] { 204, 255, 204 }));

            var cellstylerow4 = wb.CreateCellStyle();
            cellstylerow4.CloneStyleFrom(cellStyleBorder);
            cellstylerow4.FillPattern = FillPattern.SolidForeground;
            cellstylerow4.SetFont(font);
            ((XSSFCellStyle)cellstylerow4).SetFillForegroundColor(new XSSFColor(new byte[] { 253, 233, 217 }));

            var cellstylerow5 = wb.CreateCellStyle();
            cellstylerow5.CloneStyleFrom(cellStyleBorder);
            cellstylerow5.FillPattern = FillPattern.SolidForeground;
            cellstylerow5.SetFont(font);
            ((XSSFCellStyle)cellstylerow5).SetFillForegroundColor(new XSSFColor(new byte[] { 218, 238, 243 }));

            var r1 = ws.CreateRow(0);
            r1.CreateCell(0, CellType.String).SetCellValue("เลขที่ใบรายการ");
            r1.Cells[0].CellStyle.SetFont(fonthead2);
            ws.SetColumnWidth(0, 82 * 40);

            r1.CreateCell(1, CellType.String).SetCellValue(calcode);
            r1.Cells[1].CellStyle = setHeaderDeatilStyle;
            ws.SetColumnWidth(1, 102 * 40);

            r1.CreateCell(2, CellType.String).SetCellValue("วันที่จัด");
            r1.Cells[2].CellStyle.SetFont(fonthead2);
            ws.SetColumnWidth(2, 82 * 40);

            r1.CreateCell(3, CellType.String).SetCellValue(CreateDate);
            r1.Cells[3].CellStyle = setHeaderDeatilStyle;
            ws.SetColumnWidth(3, 102 * 40);

            r1.CreateCell(4, CellType.String).SetCellValue("วันที่ส่ง");
            r1.Cells[4].CellStyle.SetFont(fonthead2);
            ws.SetColumnWidth(4, 82 * 40);

            r1.CreateCell(5, CellType.String).SetCellValue(InstallDate);
            r1.Cells[5].CellStyle = setHeaderDeatilStyle;
            ws.SetColumnWidth(5, 102 * 40);

            var r1_2 = ws.CreateRow(1);
            r1_2.CreateCell(0, CellType.String).SetCellValue("ชื่อลูกค้า");
            r1_2.Cells[0].CellStyle.SetFont(fonthead2);
            ws.SetColumnWidth(0, 82 * 40);

            r1_2.CreateCell(1, CellType.String).SetCellValue(CustName);
            r1_2.Cells[1].CellStyle = setHeaderDeatilStyle;
            ws.SetColumnWidth(1, 102 * 40);

            r1_2.CreateCell(2, CellType.String).SetCellValue("ที่อยู่");
            r1_2.Cells[2].CellStyle.SetFont(fonthead2);
            ws.SetColumnWidth(2, 82 * 40);

            r1_2.CreateCell(3, CellType.String).SetCellValue(InstallAddress);
            r1_2.Cells[3].CellStyle = setHeaderDeatilStyle;
            ws.SetColumnWidth(3, 102 * 40);

            var r2 = ws.CreateRow(3);
            r2.CreateCell(0, CellType.String).SetCellValue("ลำดับ");
            r2.Cells[0].CellStyle = cellstyleSubhead1;
            ws.SetColumnWidth(0, 62 * 40);

            r2.CreateCell(1, CellType.String).SetCellValue("ชื่อสินค้า");
            r2.Cells[1].CellStyle = cellstyleSubhead1;
            ws.SetColumnWidth(1, 244 * 40);

            r2.CreateCell(2, CellType.String).SetCellValue("ประเภทบาน");
            r2.Cells[2].CellStyle = cellstyleSubhead1;
            ws.SetColumnWidth(2, 244 * 40);

            r2.CreateCell(3, CellType.String).SetCellValue("ความสูงตู้ cm");
            r2.Cells[3].CellStyle = cellstyleSubhead1;
            ws.SetColumnWidth(3, 144 * 40);

            r2.CreateCell(4, CellType.String).SetCellValue("ความกว้างตู้ cm");
            r2.Cells[4].CellStyle = cellstyleSubhead1;
            ws.SetColumnWidth(4, 144 * 40);

            r2.CreateCell(5, CellType.String).SetCellValue("สั่งกระจกเจียริมสูง");
            r2.Cells[5].CellStyle = cellstyleSubhead2;
            ws.SetColumnWidth(5, 144 * 40);

            r2.CreateCell(6, CellType.String).SetCellValue("สั่งกระจกเจียริมกว้าง");
            r2.Cells[6].CellStyle = cellstyleSubhead2;
            ws.SetColumnWidth(6, 144 * 40);

            //r2.CreateCell(7, CellType.String).SetCellValue("สั่งกระจกลบคมสูง");
            //r2.Cells[7].CellStyle = cellstyleSubhead3;
            //ws.SetColumnWidth(7, 158 * 40);

            //r2.CreateCell(8, CellType.String).SetCellValue("สั่งกระจกลบคมกว้าง");
            //r2.Cells[8].CellStyle = cellstyleSubhead3;
            //ws.SetColumnWidth(8, 158 * 40);

            List<CalculateDetailItemModel> _list = _calculateDetailService.GetCalculateList(calcode, glassdoorType, "C");
            if (_list != null && _list.Count > 0)
            {
                int _rows = 4;
                int _index = 1;
                foreach (var item in _list)
                {
                    var crows = ws.CreateRow(_rows);
                    crows.CreateCell(0, CellType.String).SetCellValue(_index);
                    crows.Cells[0].CellStyle = cellstylerow2;

                    crows.CreateCell(1, CellType.String).SetCellValue(item.productname);
                    crows.Cells[1].CellStyle = cellstylerow;

                    crows.CreateCell(2, CellType.String).SetCellValue(item.glassdoortype == "S" ? "บานเดี่ยว" : "บานคู่");
                    crows.Cells[2].CellStyle = cellstylerow;

                    crows.CreateCell(3, CellType.String).SetCellValue(item.masterheigh);
                    crows.Cells[3].CellStyle = cellstylerow;

                    crows.CreateCell(4, CellType.String).SetCellValue(item.masterwidth);
                    crows.Cells[4].CellStyle = cellstylerow;

                    crows.CreateCell(5, CellType.String).SetCellValue(item.calheigh.HasValue ? item.calheigh.Value.ToString("0.00") : "0");
                    crows.Cells[5].CellStyle = cellstylerow3;

                    crows.CreateCell(6, CellType.String).SetCellValue(item.calwidth.HasValue ? item.calwidth.Value.ToString("0.00") : "0");
                    crows.Cells[6].CellStyle = cellstylerow4;

                    //crows.CreateCell(7, CellType.String).SetCellValue(item.deburringheigh.HasValue ? item.deburringheigh.Value.ToString("0.00") : "0");
                    //crows.Cells[7].CellStyle = cellstylerow5;

                    //crows.CreateCell(8, CellType.String).SetCellValue(item.deburringwidth.HasValue ? item.deburringwidth.Value.ToString("0.00") : "0");
                    //crows.Cells[8].CellStyle = cellstylerow5;

                    _index++;
                    _rows++;
                }
            }

            rowHeader.CreateCell(0).SetCellValue("สูตรคำนวณการสั่งกระจกใสเปลือย");

            //Merge the cell
            CellRangeAddress region = new CellRangeAddress(2, 2, 0, 6);

            ws.AddMergedRegion(region);
            RegionUtil.SetBorderBottom(1, region, ws);//Bottom border  
            RegionUtil.SetBorderLeft(1, region, ws);//Left border  
            RegionUtil.SetBorderRight(1, region, ws);//Right border  
            RegionUtil.SetBorderTop(1, region, ws);

            rowHeader.GetCell(0).CellStyle = cellstyleHeader;
            return wb;
        }
        #endregion
        #endregion
    }
}
