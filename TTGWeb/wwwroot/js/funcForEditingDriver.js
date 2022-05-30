//Функции для Редактирования Водителя
function DriverInfoOnEditingDriver(item) {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var res;
    const url = 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/driver1.json';
    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', url, false);
    // 3. Отсылаем запрос
    xhr.send();
    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    } else {
        // вывести результат
        res = JSON.parse(xhr.responseText);
    }

    document.getElementById("driver_name").value = res.name;
    document.getElementById("passport").value = res.passport;
    document.getElementById("route").value = res.route;
    document.getElementById("AutoMarka").value = res.marka;
    document.getElementById("AutoNum").value = res.num;
    document.getElementById("DriverLogin").value = res.login;
    document.getElementById("DriverPassword").value = res.password;
}
function EditDriver() {
    var data = {
        driverName: $('#driver_name').val(),
        passport: $('#passport').val(),
        route: $('#route').val(),
        newAutoMarka: $('#AutoMarka').val(),
        newAutoNum: $('#AutoNum').val(),
        login: $('#DriverLogin').val(),
        password: $('#driverPassword').val()
    }
    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
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
                    alert("Успешно!");
                    window.location.pathname = 'Home/Editing'
                    return;
                }
            });
}
function DeleteDriver() {
    var route = $('#DriverLogin').val();
    const url = "https://jsonplaceholder.typicode.com/todos";
    return fetch(url + '/' + route, {
        method: 'DELETE'
    })
        .then(

            function (response) {
                if (response.status !== 200) {
                    console.log(response);
                    alert('Что-то пошло не так. Код ошибки: ' + response.status);
                    return;
                }
                else {
                    alert("Успешно!");
                    window.location.pathname = 'Home/Editing'
                    return;
                }
            });
}
