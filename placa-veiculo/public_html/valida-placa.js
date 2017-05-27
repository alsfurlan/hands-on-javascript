// Validador de placas
var validaPlaca = function () {
    var regex = /[a-zA-Z]{3}-[0-9]{4}/g;
    var placa = document.getElementById('placa').value;

    if (placa.match(regex) !== null) {
        alert('Placa válida!');
    } else {
        alert('Placa inválida');
    }
};

var campoPlaca = document.getElementById('placa');

campoPlaca.addEventListener('change', validaPlaca);
campoPlaca.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        validaPlaca();
    }
});