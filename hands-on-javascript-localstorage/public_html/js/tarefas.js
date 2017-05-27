window.onload = function () {

    var ulTarefas = document.getElementById('tarefas');
    var btnAdicionar = document.getElementById('adicionar');
    var btnAdicionar = document.getElementById('limpar');
    var inputNovaTarefa = document.getElementById('novaTarefa');
    var tarefas = [];

    btnAdicionar.addEventListener('click', adicionarTarefa);

    lerLocalStorage();

    function lerLocalStorage() {
        var localStorageTarefas = JSON.parse(localStorage.getItem('tarefas'));
        if (localStorageTarefas) {
            tarefas = localStorageTarefas;
            listarTarefas();
        }
    }

    function salvarLocalStorage() {
        var t = JSON.stringify(tarefas);
        localStorage.setItem('tarefas', t);
    }

    function adicionarTarefa() {
        var texto = inputNovaTarefa.value;

        if ((texto !== '') && !tarefaExistente(texto)) {
            var tarefa = {
                descricao: texto
            };
            tarefas.push(tarefa);
            salvarLocalStorage();
            inputNovaTarefa.value = '';
            listarTarefas();
        }
    }

    function tarefaExistente(tarefa) {
        for (var i = 0; i < tarefas.length; i++) {
            if (tarefas[i].descricao === tarefa) {
                alert('Não é possível cadastrar duas tarefas com o mesmo nome');
                return true;
            }
        }
        return false;
    }

    function listarTarefas() {
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
        for (var i = 0; i < tarefas.length; i++) {
            if (tarefas[i].descricao === noTexto.nodeValue) {
                tarefas[i].concluida = !tarefas[i].concluida;
            }
        }
        salvarLocalStorage();
        listarTarefas();
    }
    
    function limparTarefas () {
        tarefas = [];
        salvarLocalStorage();
    }

};


