// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

//const { deserialize } = require("v8");

// Write your JavaScript code.

//Функция для datapicker
$(function () {
    $('#date').daterangepicker({
        locale: {
            format: 'MM.YYYY'
        }
    });
});



