const perguntas = [
    {
        pergunta: "Qual parte do pavão macho costuma chamar mais atenção durante a exibição?",
        opcoes: ["A cauda colorida", "As patas", "O bico"],
        resposta: 0
    },
    {
        pergunta: "Como se chama o pavão fêmea?",
        opcoes: ["Pavoa", "Pavina", "Pavão-mirim"],
        resposta: 0
    },
    {
        pergunta: "O que o pavão geralmente come?",
        opcoes: ["Apenas folhas", "Sementes, plantas e pequenos animais", "Somente peixes"],
        resposta: 1
    },
    {
        pergunta: "Em qual continente vive naturalmente o pavão-azul?",
        opcoes: ["América do Sul", "Europa", "Ásia"],
        resposta: 2
    },
    {
        pergunta: "Para que o pavão abre a cauda em forma de leque?",
        opcoes: ["Para se exibir e cortejar", "Para cavar o solo", "Para nadar mais rápido"],
        resposta: 0
    }
];

const areaDoQuiz = document.querySelector("#quiz");
let perguntaAtual = 0;
let pontuacao = 0;

function mostrarPergunta() {
    const pergunta = perguntas[perguntaAtual];
    const progresso = (perguntaAtual / perguntas.length) * 100;

    areaDoQuiz.innerHTML = `
        <p class="quiz-progress">Pergunta ${perguntaAtual + 1} de ${perguntas.length}</p>
        <div class="quiz-progress-track">
            <div class="quiz-progress-bar" style="width: ${progresso}%"></div>
        </div>
        <form id="quiz-form">
            <fieldset class="quiz-options">
                <legend class="quiz-question">${pergunta.pergunta}</legend>
                ${pergunta.opcoes.map((opcao, indice) => `
                    <label class="quiz-option">
                        <input type="radio" name="resposta" value="${indice}">
                        <span>${opcao}</span>
                    </label>
                `).join("")}
            </fieldset>
            <button class="quiz-button" type="submit">
                ${perguntaAtual === perguntas.length - 1 ? "Ver resultado" : "Próxima pergunta"}
            </button>
            <p class="quiz-message" id="quiz-message" role="status"></p>
        </form>
    `;

    areaDoQuiz.querySelector("#quiz-form").addEventListener("submit", responderPergunta);
}

function responderPergunta(evento) {
    evento.preventDefault();

    const escolhida = areaDoQuiz.querySelector("input:checked");
    const botao = areaDoQuiz.querySelector(".quiz-button");
    const mensagem = areaDoQuiz.querySelector("#quiz-message");

    if (!escolhida) {
        mensagem.textContent = "Escolha uma resposta para continuar.";
        return;
    }

    botao.disabled = true;

    if (Number(escolhida.value) === perguntas[perguntaAtual].resposta) {
        pontuacao++;
        escolhida.closest(".quiz-option").classList.add("resposta-certa");
        mensagem.textContent = "Acertou!";
        setTimeout(avancarPergunta, 800);
        return;
    }

    escolhida.closest(".quiz-option").classList.add("resposta-errada");
    botao.textContent = "ERROU!";
    botao.classList.add("quiz-button-erro");
    mensagem.textContent = "Resposta errada! Se prepara...";
    botao.addEventListener("animationend", avancarPergunta);
}

function avancarPergunta() {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    areaDoQuiz.innerHTML = `
        <div class="quiz-result">
            <h3>Quiz concluído!</h3>
            <p class="quiz-result-score">Você acertou ${pontuacao} de ${perguntas.length} perguntas.</p>
            <button class="quiz-button" type="button">Jogar novamente</button>
        </div>
    `;

    areaDoQuiz.querySelector(".quiz-button").addEventListener("click", () => {
        perguntaAtual = 0;
        pontuacao = 0;
        mostrarPergunta();
    });
}

mostrarPergunta();
