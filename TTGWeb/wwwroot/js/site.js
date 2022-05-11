// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

const { deserialize } = require("v8");

// Write your JavaScript code.

function show(param_div_id) {
    document.getElementById('main').innerHTML = document.getElementById(param_div_id).innerHTML;
}
function show1(param_div_id) {
    document.getElementById('route_choose').innerHTML = document.getElementById(param_div_id).innerHTML;
    init();
}
function show2(param_div_id) {
    document.getElementById('main').innerHTML = document.getElementById(param_div_id).innerHTML;
    init();
}
function check() {
    let a = document.getElementById('route_choose_edit').value;
    if (a == 'null') {
        show('null')
    }
    else if (a == 'driver') {
        show('driver')
    }
    else if (a == 'route') {
        show('route')
    }
}
function check_route() {
    let a = document.getElementById('choose_route').value;
    if (a == 'null') {
        show1('null')
    }
    else if (a == '98') {
        show1('98')

    }
    else if (a == '10c') {
        show1('10c')
    }
}
function check_my_route() {
    let a = document.getElementById('RouteOnMyRoutes').value;
    if (a == 'null') {
        show2('null')
    }
    else if (a == '98') {
        show2('98')
    }
    else if (a == '10c') {
        show2('10c')
    }
}
function allerting(message) {
    let a = message;
    if (a == '1') {
        alert("Арендная плата была изменена")
    }
    else if (a == '2') {
        alert("Стоимость проезда была изменена")
    }
    else if (a == '3') {
        alert("Маршрут удален")
    }
    else if (a == '5') {
        alert("Добавлен новый маршрут")
        javascript: history.back(); return false;
    }
    else if (a == '6') {
        alert("Водитель удален")
        javascript: history.back(); return false;
    }
    else if (a == '7') {
        alert("Данные сохранены")
        javascript: history.back(); return false;
    }
    else if (a == '8') {
        alert("Водитель добавлен")
        javascript: history.back(); return false;
    }
    else if (a == '9') {
        alert("Автомобиль добавлен")
        javascript: history.back(); return false;
    }
    else if (a == '10') {
        alert("Автомобиль удален")
        javascript: history.back(); return false;
    }
}

$(function () {
    $('#date').daterangepicker({
        locale: {
            format: 'DD.MM.YYYY'
        }
    });
});

function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map98", {
        center: [48.717987, 44.481111],
        zoom: 12
    });
    myMap.geoObjects
        .add(new ymaps.Placemark([48.724803, 44.468239], {
            balloonContent: 'ул. Добрая'
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        }))
        .add(new ymaps.Placemark([48.721234, 44.473542], {
            balloonContent: 'ул. Красивая'
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        }))
        .add(new ymaps.Placemark([48.717174, 44.483618], {
            balloonContent: 'ул. Умная'
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        }))
        .add(new ymaps.Placemark([48.713997, 44.496888], {
            balloonContent: 'ул. Ленина'
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        }))

    var myPolyline = new ymaps.Polyline([
        // Указываем координаты вершин.
        [48.724803, 44.468239],
        [48.721234, 44.473542],
        [48.717174, 44.483618],
        [48.713997, 44.496888]
    ], {}, {
        // Ширину линии.
        strokeWidth: 4,
        // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.

    });

    // Добавляем линию на карту.
    myMap.geoObjects.add(myPolyline);


    var myMap = new ymaps.Map("map10c", {
        center: [48.717987, 44.481111],
        zoom: 12
    });
    myMap.geoObjects
        .add(new ymaps.Placemark([48.714345, 44.498680], {
            balloonContent: 'ул. Злая'
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        }))
        .add(new ymaps.Placemark([48.719656, 44.507404], {
            balloonContent: 'ул. Страшная'
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        }))
        .add(new ymaps.Placemark([48.724273, 44.514624], {
            balloonContent: 'ул. Тупая'
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        }))
        .add(new ymaps.Placemark([48.719940, 44.519983], {
            balloonContent: 'ул. Маркса'
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        }))

    var myPolyline = new ymaps.Polyline([
        // Указываем координаты вершин.
        [48.714345, 44.498680],
        [48.719656, 44.507404],
        [48.724273, 44.514624],
        [48.719940, 44.519983]
    ], {}, {
        // Ширину линии.
        strokeWidth: 4,
        // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.

    });

    // Добавляем линию на карту.
    myMap.geoObjects.add(myPolyline);

    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })
}


function init1() {
    
    
    var myMap = new ymaps.Map("map", {
        center: [48.717987, 44.481111],
        zoom: 11
    }, {
        balloonMaxWidth: 200,
        searchControlProvider: 'yandex#search'
    });
    myMap.geoObjects
        .add(new ymaps.Placemark([48.724803, 44.468239], {
            balloonContentHeader: "ул. Добрая",
            balloonContent: '[48.724803, 44.468239]'
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        }))
        .add(new ymaps.Placemark([48.721234, 44.473542], {
            balloonContentHeader: "ул. Красивая",
            balloonContent: '[48.721234, 44.473542]'
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        }))
        .add(new ymaps.Placemark([48.717174, 44.483618], {
            balloonContentHeader: "ул. Умная",
            balloonContent: '[48.717174, 44.483618]'
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        }))
        .add(new ymaps.Placemark([48.713997, 44.496888], {
            balloonContentHeader: "ул. Ленина",

            balloonContent: '[48.713997, 44.496888]'
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        }))
    var myPolyline = new ymaps.Polyline([
        // Указываем координаты вершин.
        [48.724803, 44.468239],
        [48.721234, 44.473542],
        [48.717174, 44.483618],
        [48.713997, 44.496888]
    ], {}, {
        // Ширину линии.
        strokeWidth: 3,

    });

    // Добавляем линию на карту.
    myMap.geoObjects.add(myPolyline);
    // Обработка события, возникающего при щелчке
    // левой кнопкой мыши в любой точке карты.
    // При возникновении такого события откроем балун.
    /*	myMap.events.add('click', function (e) {
            if (!myMap.balloon.isOpen()) {
                var coords = e.get('coords');
                myMap.balloon.open(coords, {
                    contentHeader: 'Место!',
                    contentBody: '<p>Координаты точки: ' + [
                            coords[0].toPrecision(6),
                            coords[1].toPrecision(6)
                    ].join(', ') + '</p>'
                });
                [coords[0].toPrecision(6),
                    coords[1].toPrecision(6)
                ].join(', ');
            }
            else {
                myMap.balloon.close();
            }
        });
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
            $('#ypoint').val(cord);
            ymaps.geocode(cord).then(function (res) {
                var data = res.geoObjects.get(0).properties.getAll();
                $('#address').val(data.text);

            });
        });

        myMap.geoObjects.add(myPlacemark);
        myMap.setCenter(coord, 12);
    });

}

function test()
{
    ymaps.ready(init1);

}


