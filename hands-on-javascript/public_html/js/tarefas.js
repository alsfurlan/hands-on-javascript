/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = function () {

    var ulTarefas = document.getElementById('tarefas');
    var btnAdicionar = document.getElementById('adicionar');
    var inputNovaTarefa = document.getElementById('novaTarefa');
    var tarefas = [];

    btnAdicionar.addEventListener('click', function () {
        var texto = inputNovaTarefa.value;
        
        if ((texto !== '')&&!tarefaExistente(texto)) {
            var tarefa = {
                descricao: texto
            };
            tarefas.push(tarefa);
            inputNovaTarefa.value = '';
            atualizarTarefas();
        }
    });

    function tarefaExistente(tarefa) {
        for(var i=0; i<tarefas.length;i++) {
            if(tarefas[i].descricao === tarefa) {
                alert('Não é possível cadastrar duas tarefas com o mesmo nome');
                return true;
            }
        }
        return false;
    }
    
    function atualizarTarefas() {
        apagarFilhos(ulTarefas);

        for (var i = 0; i < tarefas.length; i++) {
            var li = document.createElement("li");
            var noTexto = document.createTextNode(tarefas[i].descricao);
            li.appendChild(noTexto);
            var classe = tarefas[i].concluida ? 'concluida' : 'nova-tarefa';
            li.setAttribute('class', classe);
            li.addEventListener('click', concluirTarefa);
            ulTarefas.appendChild(li);
        }
    }

    function apagarFilhos(elemento) {
        while (elemento.hasChildNodes()) {
            elemento.removeChild(elemento.firstChild);
        }
    }

    function concluirTarefa(evento) {
        var li = evento.target;
        var noTexto = li.firstChild;
        for(var i=0;i<tarefas.length;i++) {
            if(tarefas[i].descricao===noTexto.nodeValue) {
                tarefas[i].concluida = !tarefas[i].concluida;
            }
        }
        atualizarTarefas();
    }

};


