//Функции для страницы Редактирование
function ChoosenParamertForEditing() {
    document.getElementById('main').innerHTML = document.getElementById(document.getElementById('choose_editing').value).innerHTML;
}
function GetMyRoutesOnEditing() {
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
function SelectOptionOnEditing() {
    var objSel = document.getElementById("chosenRouteOnEditing");
    var routesList = GetMyRoutesOnEditing();
    AddOption(objSel, " ", "null", true);
    routesList.map(
        (route) => {
            AddOption(objSel, route.num, route.num, false);
        }
    );

}
function GetRoutesOnEditing() {
    let a = document.getElementById('chosenRouteOnEditing').value;
    document.getElementById('route_choose').innerHTML = document.getElementById("notnull").innerHTML;
    GetPrices();
    GetStations();
    init(a);
}
function GetPrices() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var res;
    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/price.json', false);
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
    document.getElementById("priceforpassangers").value = res.price;
    document.getElementById("pricefordriver").value = res.rent;
}
function GetStations() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var res;
    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/testmap.json', false);
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

    res.stations.map(
        (station) => {
            var li = document.createElement('li');
            ///Поменять id на нужную переменную
            li.innerHTML = station.name;
            document.getElementById("listOfStations").appendChild(li);

        }
    );


}
function CreateRowDrivers(index, name, autonum, automodel, state, login) {
    //Для начала, вам нужно найти элемент, в который нужно вставить вашу разметку. 
    var table = document.getElementById('tabledriverediting');
    //Теперь создаем строку и присваиваем ее переменной.
    var tr = document.createElement("tr");
    //добавляем разметку в созданную строку
    tr.innerHTML = '<td>' + (index + 1) + '</td> <td>' + name + '</td> <td>' + autonum + '</td> <td>' + automodel + ' </td><td>' + state + '</td><td><a href="/Home/EditingDriver/' + login + '"  id="edit_driver"> Отредактировать водителя</a></td>';
    //вставляем строку в таблицу
    table.appendChild(tr);
}
function TableDriversOnEditing() {
    var driverList = GetInfoAboutDrivers();
    $('#tabledriverediting').find('td').remove();
    driverList.map(
        (driver, index) => {
            //Надо поменять id на необходимые поля из запроса
            CreateRowDrivers(index, driver.name, driver.num, driver.marka, driver.state, driver.login);
        }
    );
}
function DeleteRoute() {
    var route = $('#chosenRouteOnEditing').val();
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
function EditPrice() {
    var data = {
        price: $('#price').val(),
    }
    var route = $('#chosenRouteOnEditing').val();
    const url = 'https://jsonplaceholder.typicode.com/todos';

    var request = new Request(url + '/' + route, {
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
                    alert("Стоимость проезда успешно изменена!");
                    return;
                }
            });
}
function EditRent() {
    var data = {
        price: $('#rent').val(),
    }
    var route = $('#chosenRouteOnEditing').val();
    const url = 'https://jsonplaceholder.typicode.com/todos';

    var request = new Request(url + '/' + route, {
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
                    alert("Аренда успешно измненена!");
                    return;
                }
            });
}