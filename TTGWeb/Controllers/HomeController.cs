using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net;
using System.Text;
using System.Text.Json;
using TTGWeb.Models;


namespace TTGWeb.Controllers
{

    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private static readonly HttpClient client = new HttpClient();

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }


        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Registration()
        {
            return View();
        }
    
        public IActionResult Profile()
        {
            return View();
        }

        public IActionResult MyRoutes() {

            return View("MyRoutes");
        }
        public IActionResult Report()
        {
            return View("Report");
        }
        public IActionResult ReportResult()
        {
            return View("ReportResult");
        }
        public IActionResult Editing()
        {

            return View("Editing");
        }
        public IActionResult EditingDriver()
        {

            return View("EditingDriver");
        }
        public IActionResult NewDriver()
        {

            return View("NewDriver");
        }
        public IActionResult EditingRoute()
        {

            return View("EditingRoute");
        }
        public IActionResult NewRoute()
        {

            return View("NewRoute");
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}