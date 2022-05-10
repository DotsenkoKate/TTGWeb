using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net;
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
        [HttpPost]
        public IActionResult Login(string login, string password)
        {

            WebRequest request = WebRequest.Create("https://jsonplaceholder.typicode.com/todos/1");
            WebResponse response = request.GetResponse();
            using (Stream stream = response.GetResponseStream())
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    string line = "";
                    while ((line = reader.ReadLine()) != null)
                    {
                        Console.WriteLine(line);
                    }
                }
            }
            response.Close();
            Console.WriteLine("Запрос выполнен");

            //ProfileModel model = new ProfileModel();
            //model.FromString(line);

            if (login == "a" && password == "123")
            {
                return RedirectToAction("ShowProfile", "Home", new
                {
                    Name = "Иванов " +
                    "Иван Иванович",
                    License = "123456777",
                    Login = login,
                    Password = password
                });
            }

            else
            {
                ViewBag.Message = "Неверный пароль или логин!";
            }

            return View("Login");
        }

        [HttpPost]
        public IActionResult SaveProfile(string name, string license, string login, string password)
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
        public IActionResult ShowProfile(string name, string license, string login, string password)
        {
            ViewData["Name"] = name;
            ViewData["License"] = license;
            ViewData["Login"] = login;
            ViewData["Password"] = password;

            return View("Profile");
        }
        public IActionResult MyRoutes(string login) {

            ViewData["Name"] = login;
            return View("MyRoutes", login);
        }
        public IActionResult Report()
        {
            return View();
        }
        public IActionResult ReportResult()
        {
            return View();
        }
        public IActionResult Editing()
        {
            return View();
        }
        public IActionResult EditingDriver()
        {
            return View();
        }
        public IActionResult NewDriver()
        {
            return View();
        }
        public IActionResult EditingRoute()
        {
            return View();
        }
        public IActionResult NewRoute()
        {
            return View();
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}