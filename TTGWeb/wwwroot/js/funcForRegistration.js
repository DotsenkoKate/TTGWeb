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
                    window.location.pathname = 'Home/Login'
                    return;
                }
            });
}