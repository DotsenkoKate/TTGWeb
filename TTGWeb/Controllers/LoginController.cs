using Microsoft.AspNetCore.Mvc;

namespace TTGWeb.Controllers
{
    public class LoginController : Controller
    {
        [HttpPost]
        public IActionResult Login(string login, string password)
        {

            if (login == "a" && password == "123")
            {
                return Redirect("~/Home/Profile");
            }
            else
            {
                ViewBag.Message = "Неверный пароль или логин!";

            }
            return View("Login");
        }

    }
}
