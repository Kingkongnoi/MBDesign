using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    public class SaleController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
