using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    public class TransportationController : Controller
    {
        private readonly IConfiguration _configuration;

        public TransportationController(IConfiguration configuration)
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
