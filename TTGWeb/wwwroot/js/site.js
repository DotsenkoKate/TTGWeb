// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

//const { deserialize } = require("v8");

// Write your JavaScript code.

var myMap;

//Функция для Регистрации
function CreateNewUser() {
    var data = {
        owner_name: $('#ownerName').val(),
        license: $('#license').val(),
        login: $('#login').val(),
        password: $('#password').val(),
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
                    window.location.pathname = 'Home/Login'
                    return;
                }
            });
}

//Функции для страницы Редактирование
function ChoosenParamertForEditing() {
    document.getElementById('main').innerHTML = document.getElementById(document.getElementById('choose_editing').value).innerHTML;
}
function GetMyRoutesOnEditing() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var res;
    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', false);
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
            AddOption(objSel, route.id, route.id, false);
        }
    );

}
function GetRoutesOnEditing() {
    let a = document.getElementById('chosenRouteOnEditing').value;
    document.getElementById('route_choose').innerHTML = document.getElementById("notnull").innerHTML;
    GetPrices();
    GetStations();
    // TableDriversOnMyRoutes();
    init(a);
}
function GetPrices() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var res;
    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1', false);
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
    document.getElementById("priceforpassangers").value = res.id;
    document.getElementById("pricefordriver").value = res.id;
}
function GetStations() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var res;
    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', false);
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

    res.map(
        (station) => {
            var li = document.createElement('li');
            ///Поменять id на нужную переменную
            li.innerHTML = station.id;
            document.getElementById("listOfStations").appendChild(li);

        }
    );


}
function CreateRowDrivers(index, name, autonum, automodel, state, a) {
    //Для начала, вам нужно найти элемент, в который нужно вставить вашу разметку. 
    var table = document.getElementById('tabledriverediting');
    //Теперь создаем строку и присваиваем ее переменной.
    var tr = document.createElement("tr");
    //добавляем разметку в созданную строку
    tr.innerHTML = '<td>' + (index + 1) + '</td> <td>' + name + '</td> <td>' + autonum + '</td> <td>' + automodel + ' </td><td>' + state + '</td><td><a href="/Home/EditingDriver' + a + '"  id="edit_driver"> Отредактировать водителя</a></td>';
    //вставляем строку в таблицу
    table.appendChild(tr);
}
function TableDriversOnEditing(a) {
    var driverList = GetInfoAboutDrivers();
    $('#tabledriverediting').find('td').remove();
    driverList.map(
        (driver, index) => {
            //Надо поменять id на необходимые поля из запроса
            CreateRowDrivers(index, driver.id, driver.id, driver.id, driver.id, a);
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


//Функции для Редактирования Водителя
function DriverInfoOnEditingDriver(item) {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var res;
    const url = 'https://jsonplaceholder.typicode.com/todos';
    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', url + '/' + item, false);
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
    document.getElementById("driver_name").value = res.id;
    document.getElementById("passport").value = res.id;
    document.getElementById("route").value = res.id;
    document.getElementById("AutoMarka").value = res.id;
    document.getElementById("AutoNum").value = res.id;
    document.getElementById("DriverLogin").value = res.id;
    document.getElementById("DriverPassword").value = res.id;

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
//Удалить водителя
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
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', false);
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
            AddOption(objSel, route.id, route.id, false);
        }
    );
}


//Функции для страницы Мои маршруты
function GetMyRoutes() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var res;
    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', false);
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
function AddOption(oListbox, text, value, isDefaultSelected, isSelected) {
    var oOption = document.createElement("option");
    oOption.appendChild(document.createTextNode(text));
    oOption.setAttribute("value", value);
    if (isDefaultSelected) oOption.defaultSelected = true;
    else if (isSelected) oOption.selected = true;
    oListbox.appendChild(oOption);
}
function SelectOptionOnMyRoutes() {
    var objSel = document.getElementById("routeOnMyRoutes");
    var routesList = GetMyRoutes();
    AddOption(objSel, " ", "null", true);
    routesList.map(
        (route) => {
            AddOption(objSel, route.id, route.id, false);
        }
    );
}
function GetRoutesOnMyRoutes() {
    let a = document.getElementById('routeOnMyRoutes').value;
    document.getElementById('main').innerHTML = document.getElementById("notnull").innerHTML;
    document.getElementById("routename").innerHTML = '<b>' + a + '</b>';
    GetPricesOfRoute();
    TableDriversOnMyRoutes();
    init(a);
}
function CreateRowAboutDriver(index, name, autonum, automodel, state) {
    //Для начала, вам нужно найти элемент, в который нужно вставить вашу разметку. 
    var table = document.getElementById('tabledriver');
    //Теперь создаем строку и присваиваем ее переменной.
    var tr = document.createElement("tr");
    //добавляем разметку в созданную строку
    tr.innerHTML = '<td>' + (index + 1) + '</td> <td>' + name + '</td> <td>' + autonum + '</td> <td>' + automodel + ' </td><td>' + state + '</td>';
    //вставляем строку в таблицу
    table.appendChild(tr);
}
function GetInfoAboutDrivers() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var res;
    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', false);
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
function TableDriversOnMyRoutes() {
    var driverList = GetInfoAboutDrivers();
    driverList.map(
        (driver, index) => {
            //Надо поменять id на необходимые поля из запроса
            CreateRowAboutDriver(index, driver.id, driver.id, driver.id, driver.id);
        }
    );
}
function GetPricesOfRoute(a) {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var res;
    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1', false);
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
    document.getElementById("priceforpassangers").innerHTML = res.id;
    document.getElementById("pricefordriver").innerHTML = res.id;
}
function init(a) {
    // Создание карты.
    myMap = new ymaps.Map("mapMyRoute", {
        center: [48.717987, 44.481111],
        zoom: 12,
        controls: ['fullscreenControl', 'zoomControl']
    });
    addItems(myMap);
    setInterval(autoupdate, 15000);
    function autoupdate() {
        myMap.geoObjects.removeAll();
        addItems(myMap);
    }

}
function addItems(myMap) {


    GetMarkForMap(myMap);
    GetDriverMarkForMap(myMap);
    var a = GetRouteForMap();

    var multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: a
    }, {

        wayPointVisible: false,
        routeStrokeWidth: 5,
        boundsAutoApply: true,
        zoomMargin: 30
    });
    myMap.geoObjects.add(multiRoute);
}

function GetRouteForMap() {
    var array = [];
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/test.json?token=GHSAT0AAAAAABUWIHI5MBTTEJ2ABE44QPIYYUGKFRA', false);

    // 3. Отсылаем запрос
    xhr.send();

    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    } else {
        // вывести результат

        var res = JSON.parse(xhr.responseText);
        res.stations.map(
            (data) => {
                //Надо поменять id на необходимые поля из запроса
                array.push([data.longitute, data.lalitute]);
            }
        );
    }
    return array;

}

function GetDriverMarkForMap(myMap) {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/test.json?token=GHSAT0AAAAAABUWIHI5MBTTEJ2ABE44QPIYYUGKFRA', false);

    // 3. Отсылаем запрос
    xhr.send();

    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    } else {
        // вывести результат

        var res = JSON.parse(xhr.responseText);

        res.cars.map(
            (data) => {
                //Надо поменять id на необходимые поля из запроса
                myMap.geoObjects
                    .add(new ymaps.Placemark([data.longitute, data.lalitute], {
                        balloonContent: data.num
                    }, {
                        iconLayout: 'default#imageWithContent',
                        // Своё изображение иконки метки.
                        iconImageHref: '/images/busPoint.png',
                        // Размеры метки.
                        iconImageSize: [32, 32],
                        iconImageOffset: [-24, -24],
                        // Смещение слоя с содержимым относительно слоя с картинкой.
                        iconContentOffset: [15, 15]
                    }))
            }
        );
    }

}

function GetMarkForMap(myMap) {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/test.json?token=GHSAT0AAAAAABUWIHI5MBTTEJ2ABE44QPIYYUGKFRA', false);

    // 3. Отсылаем запрос
    xhr.send();

    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    } else {
        // вывести результат
        var res = JSON.parse(xhr.responseText);
        res.stations.map(
            (data) => {
                //Надо поменять id на необходимые поля из запроса
                myMap.geoObjects
                    .add(new ymaps.Placemark([data.longitute, data.lalitute], {
                        balloonContentHeader: data.name,
                        balloonContentBody: data.desciption
                    }, {
                        preset: 'islands#icon',
                        iconColor: '#0095b6'
                    }))
            }
        );
    }

}
//Функция для страницы Мой профиль
function SaveNewProfileInfo() {
    var info = {
        owner_name: $('#name').val(),
        license: $('#license').val(),
        login: $('#login').val(),
        password: $('#password').val(),
    }
    //Поменять адрес
    const url = 'https://randomuser.me/api';

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
                    //Придумать что-то для переадресации на страницу авторизациии!!!
                    location.href = '/';
                    window.localStorage.clear();

                }
            });

}
function GetUserInfo() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1', false);

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
        document.getElementById("name").value = res.id;
        document.getElementById("license").value = res.id;
        document.getElementById("login").value = res.id;
        document.getElementById("password").value = res.id;

    }
}


//Функции для Редактирование маршрута
function CreateRowStation(nameStation, lalitude, longitude, description) {
    //Для начала, вам нужно найти элемент, в который нужно вставить вашу разметку. 
    var table = document.getElementById('dynamic');
    //Теперь создаем строку и присваиваем ее переменной.
    var tr = document.createElement("tr");
    //добавляем разметку в созданную строку
    tr.innerHTML = '<td><input type="text" size="16" id="nameStation" value=' + nameStation + '></td> <td> <input type="text" size="10" id="lalitude" value=' + lalitude + '></td><td> <input type="text" size="10" id="longitude" value=' + longitude + '></td><td><textarea rows="3" cols="10" id="description">' + description + '</textarea></td><td><button class="add btnLogin btn btn-light" type="button" onclick="addXY(this)">Добавить</button><button class="del btnLogin btn btn-light" type = "button" onclick="delXY(this)">Удалить</button></td>';
    //вставляем строку в таблицу
    table.appendChild(tr);
}
function TableStationOnEditingRoute() {
    var stationList = GetInfoAboutStations();
    $('#dynamic').find('td').remove();
    stationList.map(
        (station, index) => {
            //Надо поменять id на необходимые поля из запроса
            CreateRowStation(station.id, station.id, station.id, station.id);
        }
    );
}

function GetInfoAboutStations() {

    //Добавить к адресу
    var dat = window.location.pathname.split("/").pop();
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var res;
    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/', false);
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
function init1() {

    // Создание карты.
    myMap = new ymaps.Map("map", {
        center: [48.717987, 44.481111],
        zoom: 12,
        controls: ['fullscreenControl', 'zoomControl']
    }, {
        balloonMaxWidth: 200,
        searchControlProvider: 'yandex#search'
    });
    GetMarkForMap(myMap);
    var a = GetRouteForMap();

    var multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: a
    }, {

        wayPointVisible: false,
        routeStrokeWidth: 5,
        boundsAutoApply: true,
        zoomMargin: 30
    });
    myMap.geoObjects.add(multiRoute);

    /* Начальный адрес метки */

    var address = 'Россия, Волгоград, Ленина, д. 28';

    ymaps.geocode(address).then(function (res) {

        var coord = res.geoObjects.get(0).geometry.getCoordinates();
        var myPlacemark = new ymaps.Placemark(coord, null, {

            preset: 'islands#blueDotIcon',
            draggable: true

        });

        /* Событие dragend - получение нового адреса */

        myPlacemark.events.add('dragend', function (e) {
            var cord = e.get('target').geometry.getCoordinates();
            $('#ypoint').val(cord[0]);
            $('#xpoint').val(cord[1]);
            ymaps.geocode(cord).then(function (res) {
                var data = res.geoObjects.get(0).properties.getAll();


            });
        });

        myMap.geoObjects.add(myPlacemark);
        myMap.geoObjects.add(multiRoute);
        myMap.setCenter(coord, 12);
    });
    document.getElementById('redrawMap').onclick = function () {
        // Для уничтожения используется метод destroy.
        myMap.destroy();// Деструктор карты
        myMap = null;
        ShowMapEditigRoute();
    }
}
function ShowMapEditigRoute() {

    ymaps.ready(map);

    function map() {

        init1();
    }

}

function EditTable() {

    let database = [];
    document.getElementById("way").addEventListener("click", () => {

        const table = document.getElementById("dynamic_table");
        for (let i = 1; (row = table.rows[i]); i++) {
            database.push({
                station_name: row.cells[0].querySelector('input').value, // Значение input в ячейке
                longitude: row.cells[1].querySelector('input').value, // Значение input в ячейке
                lalitude: row.cells[2].querySelector('input').value, // Значение input в ячейке
                description: row.cells[3].querySelector('textarea').value // Значение input в ячейке
            });
        }
        console.log(database);
        //calck(database);
    });

    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(database),
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

//Функции для отчета
function Report() {
    localStorage.setItem('route', $('#routeOnReport').val());
    localStorage.setItem('date', $('#date').val());
    window.location = "/Home/ReportResult/" + a;
}

function SelectOptionOnReport() {
    var objSel = document.getElementById("routeOnReport");
    var routesList = GetMyRoutes();
    AddOption(objSel, " ", "null", true);
    routesList.map(
        (route) => {
            AddOption(objSel, route.id, route.id, false);
        }
    );
}
//Функция для datapicker
$(function () {
    $('#date').daterangepicker({
        locale: {
            format: 'MM.YYYY'
        }
    });
});
function ReportResult() {
    let a = localStorage.getItem('route');
    let b = localStorage.getItem('date');
    GetPricesOfRoute(a);
    document.getElementById("route_name").innerHTML = "<b>" + a + "</b>";
    document.getElementById("date").innerHTML = "<b>" + b + "</b>";

}

function GetDataForTime() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', false);

    // 3. Отсылаем запрос
    xhr.send();

    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    } else {
        // вывести результат

        var res = JSON.parse(xhr.responseText);
        var array = [['Месяц', 'Время']];
        res.map(
            (data) => {
                //Надо поменять id на необходимые поля из запроса
                array.push([data.id, data.id]);
            }
        );
    }
    return array;
}
function GetDataForProfit() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', false);

    // 3. Отсылаем запрос
    xhr.send();

    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    } else {
        // вывести результат

        var res = JSON.parse(xhr.responseText);
        var array = [['Месяц', 'Сумма']];
        res.map(
            (data) => {
                //Надо поменять id на необходимые поля из запроса
                array.push([data.id, data.id]);
            }
        );
    }
    return array;
}
function GetDataForDriverProf() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', false);

    // 3. Отсылаем запрос
    xhr.send();

    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    } else {
        // вывести результат

        var res = JSON.parse(xhr.responseText);
        var array = [['Водитель', 'Прибыль']];
        res.map(
            (data) => {
                //Надо поменять id на необходимые поля из запроса
                array.push([data.title, data.id]);
            }
        );
    }
    return array;
}
//Водители
function CreateRowDriver(index, name, autonum, times, income, a) {
    //Теперь создаем строку и присваиваем ее переменной.
    var tr = document.createElement("tr");
    //добавляем разметку в созданную строку
    tr.innerHTML = '<td>' + (index + 1) + '</td> <td>' + name + '</td> <td>' + autonum + '</td> <td>' + times + ' </td><td>' + income + '</td>';
    //вставляем строку в таблицу
    a.appendChild(tr);
}
function GetInfoDrivers() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var res;
    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', false);
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
function TableDriversOnReport(a) {
    var driverList = GetInfoDrivers();
    driverList.map(
        (driver, index) => {
            //Надо поменять id на необходимые поля из запроса
            CreateRowDriver(index, driver.id, driver.id, driver.id, driver.id, a);
        }
    );
}
//Худшие
function CreateRowDriverWorst(index, name, autonum, date, income, a) {
    //Теперь создаем строку и присваиваем ее переменной.
    var tr1 = document.createElement("tr");
    //добавляем разметку в созданную строку
    tr1.innerHTML = '<td>' + (index + 1) + '</td> <td>' + name + '</td> <td>' + autonum + '</td> <td>' + date + ' </td><td>' + income + '</td>';
    //вставляем строку в таблицу
    a.appendChild(tr1);
}
function GetInfoDriversWorst() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var res;
    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', false);
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
function Worst(a) {
    var List = GetInfoDriversWorst();
    List.map(
        (worst, index) => {
            //Надо поменять id на необходимые поля из запроса
            CreateRowDriver(index, worst.id, worst.id, worst.id, worst.id, a);
        }
    );
}
//Лучшие
function CreateRowDriverBest(index, name, autonum, date, income, a) {
    //Теперь создаем строку и присваиваем ее переменной.
    var tr = document.createElement("tr");
    //добавляем разметку в созданную строку
    tr.innerHTML = '<td>' + (index + 1) + '</td> <td>' + name + '</td> <td>' + autonum + '</td> <td>' + date + ' </td><td>' + income + '</td>';
    //вставляем строку в таблицу
    a.appendChild(tr);
}
function GetInfoDriversBest() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var res;
    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', false);
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
function Best(a) {
    var driverList = GetInfoDriversBest();
    driverList.map(
        (driver, index) => {
            //Надо поменять id на необходимые поля из запроса
            CreateRowDriver(index, driver.id, driver.id, driver.id, driver.id, a);
        }
    );
}
//Отрисовка таблиц
function CreateTablesOnResult() {
    var worst = document.getElementById('worst');
    var best = document.getElementById('best');
    var table = document.getElementById('tabledriver');
    TableDriversOnReport(table);
    Best(best);
    Worst(worst);
}


//TEST
function GetRequest() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1', false);

    // 3. Отсылаем запрос
    xhr.send();

    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    } else {
        // вывести результат

        var tomUser = JSON.parse(xhr.responseText);
        //document.write(tomUser.title); // Tom
        alert(tomUser.title);
        //alert(xhr.responseText); // responseText -- текст ответа.

    }

}
function PostRequest() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/todos/1', true);

    // 3. Отсылаем запрос
    xhr.send();

    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    } else {
        // вывести результат

        var tomUser = JSON.parse(xhr.responseText);
        //document.write(tomUser.title); // Tom
        alert(tomUser.title);
        //alert(xhr.responseText); // responseText -- текст ответа.

    }


}