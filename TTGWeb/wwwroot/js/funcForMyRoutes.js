var myMap;

//Функции для страницы Мои маршруты
function GetMyRoutes() {
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
            AddOption(objSel, route.num, route.num, false);
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
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/driver.json', false);
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
            CreateRowAboutDriver(index, driver.name, driver.num, driver.marka, driver.state);
        }
    );
}
function GetPricesOfRoute(a) {
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
    document.getElementById("priceforpassangers").innerHTML = res.price;
    document.getElementById("pricefordriver").innerHTML = res.rent;
}
//Отрисовка карты
function init(a) {
    // Создание карты.
    myMap = new ymaps.Map("mapMyRoute", {
        center: [48.717987, 44.481111],
        zoom: 5,
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
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/testmap.json', false);

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
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/testmap.json', false);

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
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/testmap.json', false);

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
