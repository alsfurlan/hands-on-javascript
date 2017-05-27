
var input1 = document.getElementById('numero1');
var input2 = document.getElementById('numero2');
var selectoperacao = document.getElementById('operacao');
var resultado = document.getElementById("resultado");

function calcular() {

//                var numero1 = input1.value - 0;
    var numero1 = parseFloat(input1.value);
    var operacao = selectoperacao.value;
    var numero2 = parseFloat(input2.value);
//                var numero2 = input2.value - 0;
    var r;

    switch (operacao) {
        case '+':
            r = numero1 + numero2;
            break;
        case '-':
            r = numero1 - numero2;
            break;
        case '*':
            r = numero1 * numero2;
            break;
        case '/':
            r = numero1 / numero2;
            break;
    }
    resultado.innerHTML = r;
}

function limpar() {
    input1.value = '';
    input2.value = '';
    resultado.innerHTML = '';
}

