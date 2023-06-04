using BusinessLogicMBDesign.Login;
using EntitiesMBDesign;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignApi.Controllers.Login
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly LoginService _loginService;

        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
            _loginService = new LoginService(configuration);
        }

        [HttpGet]
        public IActionResult GetMenuPermissionPerEmpData(int id)
        {
            var result = _loginService.GetMenuPermissionPerEmpData(id);
            return Json(result);
        }

        [HttpPost]
        public IActionResult DoLogin([FromBody] LoginModel model)
        {
            var msg = new ResultMessage();

            var result = _loginService.GetEmpByUserAndPass(model.user, model.password);
            if(result != null) { 
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
