﻿using BusinessLogicMBDesign.Login;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    public class LoginController : Controller
    {
		private readonly IConfiguration _configuration;
        private readonly LoginService _loginService;

        public LoginController(IConfiguration configuration)
		{
			_configuration = configuration;
            _loginService = new LoginService(configuration);
		}

		public IActionResult Index()
        {
			ViewBag.apiUrl = _configuration.GetSection("apiUrl").Value;
			ViewBag.webUrl = _configuration.GetSection("webUrl").Value;
            ViewBag.imageUrl = _configuration.GetSection("imageUrl").Value;
            return View();
        }

		[HttpPost]
		[AllowAnonymous]
		public IActionResult GoToMaster()
		{
            return RedirectToAction("Index", "Master");
        }

        [Route("api/[controller]/[action]")]
        [HttpGet]
        public IActionResult GetMenuPermissionPerEmpData(int id)
        {
            var result = _loginService.GetMenuPermissionPerEmpData(id);
            return Json(result);
        }

        [Route("api/[controller]/[action]")]
        [HttpPost]
        public IActionResult DoLogin([FromBody] LoginModel model)
        {
            var msg = new ResultMessage();

            var result = _loginService.GetEmpByUserAndPass(model.user, model.password);
            if (result != null)
            {
                msg.isResult = true;
                msg.strResult = "เข้าสู่ระบบสำเร็จ";
            }
            else
            {
                msg.isResult = false;
                msg.strResult = "ไม่พบช้อมูลพนักงานในระบบ";
            }

            var val = new
            {
                msg = msg,
                result = result
            };

            return Json(val);
        }
    }
}
