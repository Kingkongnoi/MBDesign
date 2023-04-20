﻿using BusinessLogicMBDesign.Master;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MBDesignApi.Controllers.Master
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _employeeService;
        private readonly IConfiguration _configuration;
        public EmployeeController(IConfiguration configuration) {
            _configuration = configuration;
            _employeeService =  new EmployeeService(_configuration);
        }

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
