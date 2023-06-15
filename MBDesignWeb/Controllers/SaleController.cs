using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    public class SaleController : Controller
    {
        private readonly IConfiguration _configuration;

        public SaleController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            ViewBag.apiUrl = _configuration.GetSection("apiUrl").Value;
            ViewBag.webUrl = _configuration.GetSection("webUrl").Value;
            ViewBag.imageUrl = _configuration.GetSection("imageUrl").Value;
            return View();
        }
    }
}
