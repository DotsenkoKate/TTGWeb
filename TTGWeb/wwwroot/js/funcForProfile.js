
//Функция для страницы Мой профиль
function SaveNewProfileInfo() {
    var info = {
        owner_name: $('#name').val(),
        license: $('#license').val(),
        login: $('#login').val(),
        password: $('#password').val(),
    }
    //Поменять адрес
    const url = 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/profile.json';

    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(info),
        headers: { 'content-type': 'application/json' }
    });

    fetch(request)
        .then(
            function (response) {
                if (response.status !== 200) {
                    alert('Что-то пошло не так. Код ошибки: ' + response.status);
                    return;
                }
                else {
                    alert("Данные успешно изменены!Авторизуйтесь, чтобы продолжить работу");
                    location.href = '/';
                    window.localStorage.clear();

                }
            });

}
function GetUserInfo() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/profile.json', false);

    // 3. Отсылаем запрос
    xhr.send();

    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    }
    else {
        // вывести результат
        var res = JSON.parse(xhr.responseText);
        document.getElementById("name").value = res.name;
        document.getElementById("license").value = res.license;
        document.getElementById("login").value = res.login;
        document.getElementById("password").value = res.password;

    }
}
