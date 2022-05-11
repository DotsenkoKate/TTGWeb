using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net;
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

        public IActionResult CheckLogin(string login, string password)
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
                Console.WriteLine(login);
                return RedirectToAction("ShowProfile", "Home", new {login});
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
        public IActionResult ShowProfile(string login)
        {

            ProfileModel model = new ProfileModel();
            /*string result = "";
    
            WebRequest request = WebRequest.Create("https://jsonplaceholder.typicode.com/todos/1");
            WebResponse response = request.GetResponse();
            using (Stream stream = response.GetResponseStream())
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    string line = "";
                    while ((line = reader.ReadLine()) != null)
                    {
                        result += line + "\n";
                    }
                }
            }
            response.Close();

            Test? test = JsonSerializer.Deserialize<Test>(result);
            Console.WriteLine(test.userId.ToString());
            Console.WriteLine(test.id.ToString());
            Console.WriteLine(test.title);
            */

            model.Name = "Петр";
            model.Login = login;
            model.License = "123456789";
            model.Password = "123";

            ViewData["Name"] = model.Name;
            ViewData["License"] = model.License;
            ViewData["Login"] = model.Login;
            ViewData["Password"] = model.Password;

            return View("Profile");
        }
        public IActionResult MyRoutes(string login) {

            ViewData["Login"] = login;
            return View("MyRoutes", login);
        }
        public IActionResult Report(string login)
        {
            ViewData["Login"] = login;
            return View("Report", login);
        }
        public IActionResult ReportResult(string login)
        {
            ViewData["Login"] = login;
            return View("ReportResult", login);
        }
        public IActionResult Editing(string login)
        {

            ViewData["Login"] = login;
            return View("Editing", login);
        }
        public IActionResult EditingDriver(string login)
        {
            ViewData["Login"] = login;
            return View("EditingDriver", login);
        }
        public IActionResult NewDriver(string login)
        {
            ViewData["Login"] = login;
            return View("NewDriver", login);
        }
        public IActionResult EditingRoute(string login)
        {
            ViewData["Login"] = login;
            return View("EditingRoute", login);
        }
        public IActionResult NewRoute(string login)
        {
            ViewData["Login"] = login;
            return View("NewRoute", login);
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}