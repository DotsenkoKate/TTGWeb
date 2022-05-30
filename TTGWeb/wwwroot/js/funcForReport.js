
//Функции для Отчет
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
            AddOption(objSel, route.num, route.num, false);
        }
    );
}

//Функции для Результаты отчета
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
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/report.json', false);

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
        res.time1.map(
            (data) => {
                //Надо поменять id на необходимые поля из запроса
                array.push([data.month, data.time]);
            }
        );
    }
    return array;
}
function GetDataForProfit() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/report.json', false);

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
        res.profit1.map(
            (data) => {
                //Надо поменять id на необходимые поля из запроса
                array.push([data.month, data.profit]);
            }
        );
    }
    return array;
}
function GetDataForDriverProf() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/driver_report.json', false);

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
                array.push([data.name, data.income]);
            }
        );
    }
    return array;
}
// Тааблица с водителями
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
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/driver_report.json', false);
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
            CreateRowDriver(index, driver.name, driver.num, driver.count, driver.income, a);
        }
    );
}
//Худшие рейсы
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
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/best%26worst.json', false);
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
    List.worst.map(
        (worsts, index) => {
            //Надо поменять id на необходимые поля из запроса
            CreateRowDriver(index, worsts.name, worsts.num, worsts.date, worsts.income, a);
        }
    );
}
//Лучшие рейсы
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
    xhr.open('GET', 'https://raw.githubusercontent.com/DotsenkoKate/TTGWeb/master/json_test_files/best%26worst.json', false);
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
    driverList.best.map(
        (driver, index) => {
            //Надо поменять id на необходимые поля из запроса
            CreateRowDriver(index, driver.name, driver.num, driver.date, driver.income, a);
        }
    );
}
//Отрисовка таблиц худшие, лучшие рейс, водители
function CreateTablesOnResult() {
    var worst = document.getElementById('worst');
    var best = document.getElementById('best');
    var table = document.getElementById('tabledriver');
    TableDriversOnReport(table);
    Best(best);
    Worst(worst);
}

