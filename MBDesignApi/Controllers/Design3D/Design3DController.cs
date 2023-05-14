﻿using BusinessLogicMBDesign.Design3D;
using BusinessLogicMBDesign.Sale;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignApi.Controllers.Design3D
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class Design3DController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly Design3DService _design3DService;
        public Design3DController(IConfiguration configuration)
        {
            _configuration = configuration;
            _design3DService = new Design3DService(_configuration);
        }

        #region GET
        [HttpGet]
        public JsonResult Get3DQueueList(string quotationNumber, string empName, string checklistStatus, string installDate)
        {
            var data = _design3DService.Get3DQueueList(quotationNumber, empName, checklistStatus, installDate);

            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetChecklistStatusSelect2()
        {
            var data = _design3DService.GetChecklistStatusSelect2();

            return new JsonResult(data);
        }
        [HttpGet]
        public JsonResult GetDesign3DNameSelect2()
        {
            var data = _design3DService.GetChecklistStatusSelect2();

            return new JsonResult(data);
        }
        #endregion GET

        #region POST

        #endregion POST
    }
}