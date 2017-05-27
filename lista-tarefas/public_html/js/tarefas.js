window.onload = function () {

    var tarefas = [];
    var ulTarefas = document.getElementById('tarefas');
    var inputNovaTarefa = document.getElementById('novaTarefa');
    var btnAdicionarTarefa = document.getElementById('adicionarTarefa');
    var btnLimparTarefa = document.getElementById('limparTarefa');

    lerLocalStorage();
    
    btnLimparTarefa.addEventListener('click', limparTarefa);
    btnAdicionarTarefa.addEventListener('click', adicionarTarefa);
    inputNovaTarefa.addEventListener('keypress', function(evento) {
        if(evento.keyCode == 13) {
            adicionarTarefa();
        }
    });
    
    function lerLocalStorage() {
        var localStorageTarefas = JSON.parse(localStorage.getItem('tarefas'));
        if (localStorageTarefas) {
            tarefas = localStorageTarefas;
            atualizarTarefas();
        }
    }

    function salvarLocalStorage() {
        var t = JSON.stringify(tarefas);
        localStorage.setItem('tarefas', t);
    }

    
    
//  var tarefas = new Array();
    function adicionarTarefa() {
//      var novaTarefa = {};
        if (inputNovaTarefa.value == '') {
            alert('Descrição da tarefa em branco.');
        } else if (tarefaExistente() == true) {
            alert('Tarefa já cadastrada!');
        } else {
            var novaTarefa = new Object();
            novaTarefa.descricao = inputNovaTarefa.value;
            novaTarefa.concluida = false;
            tarefas.push(novaTarefa);
            atualizarTarefas();
            salvarLocalStorage();
        }
        inputNovaTarefa.value = '';
    }

    function tarefaExistente() {
        for (var i = 0; i < tarefas.length; i++) {
            if (tarefas[i].descricao == inputNovaTarefa.value) {
                return true;
            }
        }
        return false;
    }

    function atualizarTarefas() {
        while (ulTarefas.hasChildNodes()) {
            ulTarefas.removeChild(ulTarefas.firstChild);
        }
        for (var i = 0; i < tarefas.length; i++) {
            var li = document.createElement("li");
            var txt = document.createTextNode(tarefas[i].descricao);
            if (tarefas[i].concluida == true) {
                li.className = 'tarefa-concluida';
            } else {
                li.className = 'nova-tarefa';
            }
            li.appendChild(txt);
            li.addEventListener('click', concluirTarefa);
            ulTarefas.appendChild(li);
        }
    }
    function concluirTarefa(event) {
        var descricaoTarefa = event.srcElement.innerText;
        for (var i = 0; i < tarefas.length; i++) {
            if (tarefas[i].descricao == descricaoTarefa) {
                tarefas[i].concluida = !tarefas[i].concluida;
            }
        }
        atualizarTarefas();
        salvarLocalStorage();
    }
    
    function limparTarefa() {
        tarefas = [];
        salvarLocalStorage();
        atualizarTarefas();
        
    }

};