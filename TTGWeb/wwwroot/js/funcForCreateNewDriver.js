//Функции для Добавление Водителя
function CreateDriver() {
    var data = {
        driverName: $('#newDriverName').val(),
        passport: $('#passport').val(),
        route: $('#route').val(),
        newAutoMarka: $('#newAutoMarka').val(),
        newAutoNum: $('#newAutoNum').val(),
        login: $('#newDriverLogin').val(),
        password: $('#newDriverPassword').val()
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
                    //Придумать что-то для переадресации на страницу авторизациии!!!
                    window.location.pathname = 'Home/Editing'
                    return;
                }
            });
}
function GetRoutesOnNewDriver() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var res;
    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/wayinfo.json', false);
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
    return res;
}
function SelectOptionOnNewDriver() {
    var objSel = document.getElementById("route");
    var routesList = GetRoutesOnNewDriver();
    AddOption(objSel, " ", "null", true);
    routesList.map(
        (route) => {
            AddOption(objSel, route.num, route.num, false);
        }
    );
}
