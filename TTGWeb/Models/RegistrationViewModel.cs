using System.ComponentModel.DataAnnotations;


namespace TTGWeb.Models
{
    public class NewUser
    {
        
        public int RegId { get; set; }
  
        [Required(ErrorMessage = "Не указано ФИО пользователя")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Не указан номер лицензии")]
        public string License { get; set; }

        [Required(ErrorMessage = "Не указан логин")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Не указан пароль")]
        [DataType(DataType.Password)]
        public string Password { get; set; }


    }
}
