var myMap;
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
    stationList.stations.map(
        (station, index) => {
            //Надо поменять id на необходимые поля из запроса
            CreateRowStation(station.name, station.lalitute, station.longitute, station.desciption);
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
    return res;
}
//Отрисовка карты
function init1() {

    // Создание карты.
    myMap = new ymaps.Map("map", {
        center: [48.717987, 44.481111],
        zoom: 5,
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
