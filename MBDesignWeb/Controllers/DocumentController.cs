using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    public class DocumentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
