using BusinessLogicMBDesign.Design3D;
using BusinessLogicMBDesign;
using BusinessLogicMBDesign.Master;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.Net.Http.Headers;
using BusinessLogicMBDesign.Sale;
using MailKit.Search;
using DataLayerMBDesign;
using System.Data.SqlClient;
using UtilitiesMBDesign;

namespace MBDesignApi.Controllers.Master
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _employeeService;
        private readonly UploadToAwsService _uploadToAwsService;
        private readonly UploadToDatabaseService _uploadToDatabaseService;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public EmployeeController(IConfiguration configuration) {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("defaultConnectionString").ToString();
            _employeeService =  new EmployeeService(_configuration);
            _uploadToAwsService = new UploadToAwsService(_configuration);
            _uploadToDatabaseService = new UploadToDatabaseService(_configuration);
        }

        #region Employee
        #region GET
        [HttpGet]
        public JsonResult GetLastestId()
        {
            var data = _employeeService.GetFirstLastestId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetEmpList(string empId, string empName, string departmentId, string positionId, string status)
        {
            var data = _employeeService.GetEmpList(empId, empName, departmentId, positionId, status);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetEmpByEmpId(int id)
        {
            var data = _employeeService.GetEmpByEmpId(id);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GenerateEmpId()
        {
            var data = _employeeService.GenerateEmpId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetDepartmentSelect2()
        {
            var data = _employeeService.GetAllActiveDepartmentSelect2();
            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetPositionSelect2()
        {
            var data = _employeeService.GetAllActivePositionSelect2();
            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetRoleSelect2()
        {
            var data = _employeeService.GetAllActiveRoleSelect2();
            return new JsonResult(data);
        }
        #endregion GET

        #region POST
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddEmployee([FromBody] EmpDataModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var msg = _employeeService.AddEmployee(obj);

            var returnData = new
            {
                result,
                resultStatus,
                msg
            };
            return new JsonResult(returnData);
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult UpdateEmployee([FromBody] EmpDataModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var msg = _employeeService.UpdateEmployee(obj);

            var returnData = new
            {
                result,
                resultStatus,
                msg
            };
            return new JsonResult(returnData);
        }

        //[HttpPost]
        //[DisableRequestSizeLimit]
        //public ActionResult DoUpdateSignatureFile([FromQuery] int empId, [FromQuery] string loginCode, List<IFormFile> files)
        //{
        //    var msg = new ResultMessage();
        //    var addedUpload = new List<UploadFiles>();

        //    //string uploadPath = _configuration.GetSection("fileUploadsPath").Value;
        //    string path = Directory.GetCurrentDirectory();
        //    foreach (IFormFile source in files)
        //    {
        //        string folderName = string.Format("{0}\\upload\\images\\", path);

        //        if (!Directory.Exists(folderName))
        //        {
        //            Directory.CreateDirectory(folderName);
        //        }

        //        string filename = String.Concat(ContentDispositionHeaderValue.Parse(source.ContentDisposition).FileName.ToString().Where(c => !Char.IsWhiteSpace(c)));

        //        FileInfo file = new FileInfo(filename);
        //        string fileExtension = file.Extension;

        //        string oldFilePath = string.Format("{0}{1}", folderName, filename);
        //        string fileWithoutExtension = Path.GetFileNameWithoutExtension(oldFilePath);

        //        string newFileName = string.Format("{0}_{1}{2}", fileWithoutExtension, DateTime.UtcNow.ToString("yyyyMMddHHmmss"), fileExtension);

        //        string fullFilePath = string.Format("{0}{1}", folderName, newFileName);
        //        FileStream output = System.IO.File.Create(fullFilePath);

        //        source.CopyTo(output);
        //        output.Dispose();

        //        var obj = new UploadFiles
        //        {
        //            fileName = newFileName,
        //            filePath = fullFilePath,
        //            fileSize = source.Length,
        //            originalFileName = filename,
        //        };

        //        var ftpService = new ftpProcessService(_configuration);
        //        var result = ftpService.UploadFile(fullFilePath, "uploads");
        //        if (result.Contains("Transfer complete"))
        //        {
        //            obj.imageUrl = string.Format("{0}{1}", _configuration.GetSection("uploadUrl").Value, newFileName);
        //        }
        //        else
        //        {
        //            obj.imageUrl = "";
        //        }
        //        addedUpload.Add(obj);
        //    }

        //    if(addedUpload.Count > 0)
        //    {
        //        var model = new EmpDataModel
        //        {
        //            signatureFileName = addedUpload.FirstOrDefault().imageUrl,
        //            id = empId,
        //            loginCode = loginCode
        //        };
        //        ///Update data
        //        var result = _employeeService.UpdateSignatureFileName(model);
        //        if (result > 0)
        //        {
        //            msg.isResult = true;
        //            return new JsonResult(msg);
        //        }
        //    }
            
        //    return new JsonResult(msg);

        //}

        [HttpPost]
        [DisableRequestSizeLimit]
        public ActionResult DoUpdateSignatureFile([FromQuery] int empId, [FromQuery] string loginCode, List<IFormFile> files)
        {
            var msg = new ResultMessage();
            var addedUpload = _uploadToDatabaseService.GenerateUploadFilesObject(files);

            if (addedUpload.Count > 0)
            {
                int? fileId = _uploadToDatabaseService.DoAddUploadFile(addedUpload.FirstOrDefault(), "signatureFileName", loginCode);
                var model = new EmpDataModel
                {
                    fileId = fileId.Value,
                    id = empId,
                    loginCode = loginCode
                };
                ///Update data
                var result = _employeeService.UpdateSignatureFileName(model);
                if (result > 0)
                {
                    msg.isResult = true;
                    return new JsonResult(msg);
                }
            }

            return new JsonResult(msg);

        }

        
        #endregion POST

        #endregion Employee

        #region Role
        #region GET
        [HttpGet]
        public JsonResult GetLastestRoleId()
        {
            var data = _employeeService.GetFirstLastestRoleId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetRoleList(string roleName, string status)
        {
            var data = _employeeService.GetRoleList(roleName, status);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetRoleByRoleId(int id)
        {
            var data = _employeeService.GetRoleByRoleId(id);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetMenuList(int id)
        {
            var data = _employeeService.GetMenuList(id);

            return new JsonResult(data);
        }
        #endregion GET

        #region POST
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddRole([FromBody] RoleModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _employeeService.AddRole(obj);

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

            var returnData = new
            {
                result,
                resultStatus
            };
            return new JsonResult(returnData);
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult UpdateRole([FromBody] RoleModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _employeeService.UpdateRole(obj);
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

            var returnData = new
            {
                result,
                resultStatus
            };
            return new JsonResult(returnData);
        }
        #endregion POST

        #endregion Role

        #region holiday

        #region GET
        [HttpGet]
        public JsonResult GetLastestHolidayId()
        {
            var data = _employeeService.GetFirstLastestHolidayId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetHolidayList(string year, string day, string holidayDate, string holiday, string status)
        {
            var data = _employeeService.GetHolidayList(year, day, holidayDate, holiday, status);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetHolidayByHolidayId(int holidayId)
        {
            var data = _employeeService.GetHolidayByHolidayId(holidayId);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetHolidayYear()
        {
            var data = _employeeService.GetHolidayYear();

            return new JsonResult(data);
        }
        #endregion GET

        #region POST
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddHoliday([FromBody] CompanyHolidayModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _employeeService.AddHoliday(obj);

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

            var returnData = new
            {
                result,
                resultStatus
            };
            return new JsonResult(returnData);
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult UpdateHoliday([FromBody] CompanyHolidayModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _employeeService.UpdateHoliday(obj);
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

            var returnData = new
            {
                result,
                resultStatus
            };
            return new JsonResult(returnData);
        }
        #endregion POST

        #endregion holiday

        #region department

        #region GET
        [HttpGet]
        public JsonResult GetLastestDepartmentId()
        {
            var data = _employeeService.GetFirstLastestDepartmentId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetDepartmentList(string departmentname, string status)
        {
            var data = _employeeService.GetDepartmentList(departmentname, status);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetDepartmentByDepartmentId(int departmentId)
        {
            var data = _employeeService.GetDepartmentByDepartmentId(departmentId);

            return new JsonResult(data);
        }
        #endregion GET

        #region POST
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddDepartment([FromBody] DepartmentModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _employeeService.AddDepartment(obj);

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

            var returnData = new
            {
                result,
                resultStatus
            };
            return new JsonResult(returnData);
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult UpdateDepartment([FromBody] DepartmentModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _employeeService.UpdateDepartment(obj);
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

            var returnData = new
            {
                result,
                resultStatus
            };
            return new JsonResult(returnData);
        }
        #endregion POST

        #endregion department

        #region position

        #region GET
        [HttpGet]
        public JsonResult GetLastestPositionId()
        {
            var data = _employeeService.GetFirstLastestPositionId();

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetPositionList(string positionName, string status)
        {
            var data = _employeeService.GetPositionList(positionName, status);

            return new JsonResult(data);
        }

        [HttpGet]
        public JsonResult GetPositionByPositionId(int positionId)
        {
            var data = _employeeService.GetPositionByPositionId(positionId);

            return new JsonResult(data);
        }
        #endregion GET

        #region POST
        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddPosition([FromBody] PositionModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _employeeService.AddPosition(obj);

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

            var returnData = new
            {
                result,
                resultStatus
            };

            return new JsonResult(returnData);
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult UpdatePosition([FromBody] PositionModel obj)
        {
            var result = true;
            var resultStatus = "success";
            var data = _employeeService.UpdatePosition(obj);

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

            var returnData = new
            {
                result,
                resultStatus
            };

            return new JsonResult(returnData);
        }
        #endregion POST

        #endregion position
    }
}
