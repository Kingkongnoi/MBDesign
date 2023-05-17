using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    public class ForemanController : Controller
    {
        private readonly IConfiguration _configuration;

        public ForemanController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            ViewBag.apiUrl = _configuration.GetSection("apiUrl").Value;
            ViewBag.webUrl = _configuration.GetSection("webUrl").Value;
            return View();
        }
    }
}
