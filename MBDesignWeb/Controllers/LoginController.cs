using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    public class LoginController : Controller
    {
		private readonly IConfiguration _configuration;

		public LoginController(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public IActionResult Index()
        {
			ViewBag.apiUrl = _configuration.GetSection("apiUrl").Value;
			ViewBag.webUrl = _configuration.GetSection("webUrl").Value;
			return View();
        }

		[HttpPost]
		[AllowAnonymous]
		public IActionResult GoToMaster()
		{
            return RedirectToAction("Index", "Master");
        }
    }
}
