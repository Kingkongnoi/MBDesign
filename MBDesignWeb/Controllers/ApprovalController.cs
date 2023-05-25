﻿using Microsoft.AspNetCore.Mvc;

namespace MBDesignWeb.Controllers
{
    public class ApprovalController : Controller
    {
        private readonly IConfiguration _configuration;

        public ApprovalController(IConfiguration configuration)
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
