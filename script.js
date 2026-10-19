const areaDasCartas = document.querySelector('.card-container');

const moldeDaCarta = {
    nome: '',
    descricao: '',
    imagem: '',

    criar: function() {
        areaDasCartas.innerHTML += `
            <div class="card-item">
                <div class="card-content">
                    <h2>${this.nome}</h2>
                    <p>${this.descricao}</p>
                    <img src="${this.imagem}" draggable="false" alt="${this.nome}">
                </div>
            </div>
        `;
    }
};

const pavudoGrandao = Object.create(moldeDaCarta);
pavudoGrandao.nome = 'Pavudos';
pavudoGrandao.descricao = 'O pavão grandão';
pavudoGrandao.imagem = 'pavao.png';
pavudoGrandao.criar();

const pavudoAzul = Object.create(moldeDaCarta);
pavudoAzul.nome = 'Pavão Azul';
pavudoAzul.descricao = 'Todo elegante';
pavudoAzul.imagem = 'pavao.png';
pavudoAzul.criar();

const pavudoVerde = Object.create(moldeDaCarta);
pavudoVerde.nome = 'Pavão Verde';
pavudoVerde.descricao = 'Cheio de estilo';
pavudoVerde.imagem = 'pavao.png';
pavudoVerde.criar();

const pavudoVermelho = Object.create(moldeDaCarta);
pavudoVermelho.nome = 'Pavão Vermelho';
pavudoVermelho.descricao = 'Raridade total';
pavudoVermelho.imagem = 'pavao.png';
pavudoVermelho.criar();

const botaoBungas = document.querySelector('#bungas button');
const animacoesDasCartas = new WeakMap();

function derrubarEQuicar(carta, atraso) {
    const animacaoAnterior = animacoesDasCartas.get(carta);

    if (animacaoAnterior) {
        cancelAnimationFrame(animacaoAnterior.quadro);
        clearTimeout(animacaoAnterior.temporizador);
    }

    const animacao = { quadro: null, temporizador: null };
    animacoesDasCartas.set(carta, animacao);

    animacao.temporizador = setTimeout(() => {
        carta.style.transition = 'none';
        carta.style.transform = '';

        let posicao = -window.innerHeight - carta.getBoundingClientRect().bottom;
        let velocidade = 0;
        let tempoAnterior = null;
        const gravidade = 2200;
        const forcaDoQuique = 0.45;

        function atualizar(tempoAtual) {
            if (tempoAnterior === null) {
                tempoAnterior = tempoAtual;
            }

            const tempoPassado = Math.min((tempoAtual - tempoAnterior) / 1000, 0.032);
            tempoAnterior = tempoAtual;

            velocidade += gravidade * tempoPassado;
            posicao += velocidade * tempoPassado;

            if (posicao >= 0) {
                posicao = 0;
                velocidade *= -forcaDoQuique;

                if (Math.abs(velocidade) < 70) {
                    carta.style.transform = '';
                    carta.style.transition = '';
                    animacoesDasCartas.delete(carta);
                    return;
                }
            }

            carta.style.transform = `translateY(${posicao}px)`;
            animacao.quadro = requestAnimationFrame(atualizar);
        }

        animacao.quadro = requestAnimationFrame(atualizar);
    }, atraso);
}

botaoBungas.addEventListener('click', () => {
    document.querySelectorAll('.card-item').forEach((carta, indice) => {
        derrubarEQuicar(carta, indice * 120);
    });
});