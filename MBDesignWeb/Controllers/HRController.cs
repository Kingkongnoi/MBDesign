using AspNetCore.Reporting;
using BusinessLogicMBDesign.Document;
using BusinessLogicMBDesign;
using BusinessLogicMBDesign.HR;
using BusinessLogicMBDesign.Master;
using DataLayerMBDesign;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using UtilitiesMBDesign;
using NPOI.SS.UserModel;
using System;

namespace MBDesignWeb.Controllers
{
    public class HRController : Controller
    {
        private readonly IConfiguration _configuration;

        private readonly HRService _hrService;
        private readonly EmployeeService _employeeService;
        public HRController(IConfiguration configuration)
        {
            _configuration = configuration;

            _hrService = new HRService(_configuration);
            _employeeService = new EmployeeService(_configuration);
        }

        public IActionResult Index()
        {
            ViewBag.apiUrl = _configuration.GetSection("apiUrl").Value;
            ViewBag.webUrl = _configuration.GetSection("webUrl").Value;
            ViewBag.imageUrl = _configuration.GetSection("imageUrl").Value;
            return View();
        }

        #region API
        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetLeaveTypeList(string leaveType, string status)
        {
            var data = _hrService.GetLeaveTypeList(leaveType, status);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetSelect2LeaveTypeName()
        {
            var data = _hrService.GetSelect2LeaveTypeName();

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetLeaveTypeById(int leaveTypeId)
        {
            var data = _hrService.GetLeaveTypeById(leaveTypeId);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        public JsonResult UpdateLeaveType([FromBody] LeaveTypeModel obj)
        {
            var msg = _hrService.UpdateLeaveType(obj);

            return new JsonResult(msg);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetLeaveList(string empCode, string empName, string leaveType, string leaveStartDate, string leaveEndDate)
        {
            var data = _hrService.GetLeaveList(empCode, empName, leaveType, leaveStartDate, leaveEndDate);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetLeaveById(int leaveId)
        {
            var data = _hrService.GetLeaveById(leaveId);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetSelect2EmpCode(int empId = 0)
        {
            var data = _hrService.GetSelect2EmpCode(empId);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetSelect2EmpFullName(int empId = 0)
        {
            var data = _hrService.GetSelect2EmpFullName(empId);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        public JsonResult AddLeave([FromBody] LeaveModel obj)
        {
            var msg = _hrService.AddLeave(obj);

            return new JsonResult(msg);
        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        public JsonResult UpdateLeave([FromBody] LeaveModel obj)
        {
            var msg = _hrService.UpdateLeave(obj);

            return new JsonResult(msg);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetLeaveSummaryByEmpData(string empCode, string empName)
        {
            var data = _hrService.GetLeaveSummaryByEmpData(empCode, empName);

            return new JsonResult(data);
        }


        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetOtherPaymentList(string empCode, string empName, string type, string installmentStartDate)
        {
            var data = _hrService.GetOtherPaymentList(empCode, empName, type, installmentStartDate);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetOtherPaymentById(int otherPaymentId)
        {
            var data = _hrService.GetOtherPaymentById(otherPaymentId);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        public JsonResult AddOtherPaymentModel([FromBody]OtherPaymentModel obj)
        {
            var msg = _hrService.AddOtherPaymentModel(obj);

            return new JsonResult(msg);
        }


        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetAttendanceSettingList(string departmentId)
        {
            var msg = _hrService.GetAttendanceSettingList(departmentId);

            return new JsonResult(msg);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetAttendanceSettingById(int id)
        {
            var msg = _hrService.GetAttendanceSettingById(id);

            return new JsonResult(msg);
        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        public JsonResult AddAttendanceSetting([FromBody] AttendanceDepartmentSettingModel obj)
        {
            var msg = _hrService.AddAttendanceSetting(obj);

            return new JsonResult(msg);
        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        public JsonResult UpdateAttendanceSetting([FromBody] AttendanceDepartmentSettingModel obj)
        {
            var msg = _hrService.UpdateAttendanceSetting(obj);

            return new JsonResult(msg);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetAttendanceList(string empCode, string empName, string startDate, string endDate)
        {
            var msg = _hrService.GetAttendanceList(empCode, empName, startDate, endDate);

            return new JsonResult(msg);
        }


        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetSalaryList(string empCode, string empName, string startDate, string endDate)
        {
            var msg = _hrService.GetSalaryList(empCode, empName, startDate, endDate);

            return new JsonResult(msg);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetAttendanceSalaryList(string empCode, string empName, string leaveType, string startDate, string endDate)
        {
            var data = _hrService.GetAttendanceSalaryList(empCode, empName, leaveType, startDate, endDate);

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetAttendanceSalaryType()
        {
            var data = _hrService.GetAttendanceSalaryType();

            return new JsonResult(data);
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public JsonResult GetAttendanceOTList(string empCode, string empName, string startDate, string endDate)
        {
            var data = _hrService.GetAttendanceOTList(empCode, empName, startDate, endDate);

            return new JsonResult(data);
        }
        #endregion API

        [Route("api/[controller]/[action]")]
        [HttpPost]
        [DisableRequestSizeLimit]
        public ActionResult DoImportAttendance(string createBy, IFormFile formFile)
        {
            var msg = new ResultMessage();
            var addedUpload = new List<UploadFiles>();

            var ctxFile = HttpContext.Request.Form.Files;
            var retObject = new List<IDictionary<string, object>>();

            var added = new List<AttendanceView>();
            var newResult = new List<AttendanceView>();

            try
            {
                IWorkbook workbook = WorkbookFactory.Create(ctxFile[0].OpenReadStream());
                for (int i = 0; i < workbook.NumberOfSheets; i++)
                {
                    var worksheet = workbook.GetSheetAt(i);
                    var keys = new List<string>();
                    IRow keyRow = worksheet.GetRow(0);
                    if (keyRow != null)
                    {
                        for (int k = 0; k <= keyRow.LastCellNum; k++)
                        {
                            var cellData = keyRow.GetCell(k, MissingCellPolicy.RETURN_NULL_AND_BLANK);
                            var key = cellData != null ? cellData.StringCellValue : string.Empty;
                            //if (!string.IsNullOrEmpty(key))
                            keys.Add(key);
                        }
                    }

                    for (int j = 1; j <= worksheet.LastRowNum; j++)
                    {
                        var nullCount = 0;
                        IRow row = worksheet.GetRow(j);
                        if (row != null)
                        {
                            var dataRow = new Dictionary<string, object>();
                            for (int k = 0; k <= row.LastCellNum; k++)
                            {
                                var cellData = row.GetCell(k, MissingCellPolicy.RETURN_NULL_AND_BLANK);
                                var data = cellData != null ? cellData.ToString().Trim() : string.Empty;
                                dataRow.Add(keys.ElementAt(k), data);
                                if (string.IsNullOrEmpty(data))
                                    nullCount++;
                            }

                            if (nullCount < row.LastCellNum)
                                retObject.Add(dataRow);
                        }
                    }

                   
                    foreach (var dataRow in retObject.Where(x => x.Any()))
                    {
                        var no = dataRow["No"].ToString();
                        var enNo = dataRow["EnNo"].ToString();
                        var datetime = dataRow["DateTime"].ToString();
                        var inOut = dataRow["In/Out"].ToString();

                        var fourDigitEn = enNo?.Substring(enNo.Length - 4);
                        var splitDateTime = datetime.Split(' ');
                        var getDate = Convert.ToDateTime(datetime).Date;
                        var getTime = Convert.ToDateTime(datetime).ToString("HH:mm");

                        added.Add(new AttendanceView 
                        { 
                            no = no,
                            empCode = fourDigitEn,
                            attendanceDate = getDate,
                            attendanceTime = getTime,
                            inOut = inOut
                        });
                    }

                    var uniq = added.GroupBy(x => new { x.empCode, x.attendanceDate }).Select(y => y.First()).Distinct();
                    foreach (var key in uniq)
                    {
                        var getAttendanceTimeIn = "";
                        var getTimeIn = added.Where(w => w.empCode == key.empCode && w.attendanceDate == key.attendanceDate && w.inOut == "in").OrderBy(x => x.no).FirstOrDefault();
                        if (getTimeIn != null)
                        {
                            getAttendanceTimeIn = getTimeIn.attendanceTime;
                        }

                        var getAttendanceTimeOut = "";
                        var getTimeOut = added.Where(w => w.empCode == key.empCode && w.attendanceDate == key.attendanceDate && w.inOut == "out").OrderBy(x => x.no).FirstOrDefault();
                        if (getTimeOut != null)
                        {
                            getAttendanceTimeOut = getTimeOut.attendanceTime;
                        }

                        decimal attendanceHours = 0;
                        if (!string.IsNullOrEmpty(getAttendanceTimeIn) && !string.IsNullOrEmpty(getAttendanceTimeOut))
                        {
                            TimeSpan duration = DateTime.Parse(getAttendanceTimeOut).Subtract(DateTime.Parse(getAttendanceTimeIn));
                            var durationStr = string.Format("{0:D2}.{1:D2}", duration.Hours, duration.Minutes);
                            attendanceHours = Convert.ToDecimal(durationStr)- 1;
                        }

                        newResult.Add(new AttendanceView
                        {
                            empCode = key.empCode,
                            attendanceDate = key.attendanceDate,
                            attendanceTimeIn = getAttendanceTimeIn,
                            attendanceTimeOut = getAttendanceTimeOut,
                            attendanceHour = attendanceHours,
                            createBy = createBy
                        });
                    }
                }
            }
            catch (Exception ex)
            {

            }
            
            return new JsonResult(newResult);

        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        public JsonResult AddOrUpdateAttendance([FromBody]List<AttendanceModel> obj)
        {
            var msg = _hrService.AddOrUpdateAttendance(obj);

            return new JsonResult(msg);
        }
    }
}
