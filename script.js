var tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

var lista = document.getElementById("lista");
var campo = document.getElementById("tarefa");
var adicionar = document.getElementById("adicionar");

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function mostrarTarefas() {
    lista.innerHTML = "";

    tarefas.forEach(function(tarefa, indice) {
        var li = document.createElement("li");

        var texto = document.createElement("span");
        texto.textContent = tarefa.nome;

        if (tarefa.concluida) {
            li.classList.add("concluida");
        }

        texto.addEventListener("click", function() {
            tarefa.concluida = !tarefa.concluida;
            li.classList.toggle("concluida");
            salvar();
        });

        var excluir = document.createElement("button");
        excluir.textContent = "X";

        excluir.addEventListener("click", function() {
            tarefas.splice(indice, 1);
            salvar();
            mostrarTarefas();
        });

        li.appendChild(texto);
        li.appendChild(excluir);

        lista.appendChild(li);
    });
}

adicionar.addEventListener("click", function() {
    if (campo.value.trim() == "") {
        return;
    }

    tarefas.push({
        nome: campo.value,
        concluida: false
    });

    campo.value = "";

    salvar();
    mostrarTarefas();
});

mostrarTarefas();