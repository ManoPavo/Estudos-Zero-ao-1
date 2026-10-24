const areaDasCartas = document.querySelector('.card-container');

const pavoes = [
    { nome: 'Pavudos', descricao: 'O pavão grandão' },
    { nome: 'Pavão Azul', descricao: 'Todo elegante' },
    { nome: 'Pavão Verde', descricao: 'Cheio de estilo' },
    { nome: 'Pavão Vermelho', descricao: 'Raridade total' }
];

areaDasCartas.innerHTML = pavoes.map(({ nome, descricao }) => `
    <div class="card-item">
        <div class="card-content">
            <h2>${nome}</h2>
            <p>${descricao}</p>
            <img src="pavao.png" draggable="false" alt="${nome}">
        </div>
    </div>
`).join('');

const cartas = [...document.querySelectorAll('.card-item')];
const movimentoReduzido = matchMedia('(prefers-reduced-motion: reduce)');
const GRAVIDADE = 2200;
const QUIQUE = 0.75;
const IMPULSO_MINIMO = 900;
const aleatorio = (max) => (Math.random() - 0.5) * max;
let corpos = [];
let tempoAnterior = 0;

document.querySelector('#bungas button').addEventListener('click', () => {
    const jaAnimando = corpos.length > 0;

    corpos = cartas.map((carta, indice) => {
        carta.style.transition = 'none';
        carta.style.transform = '';
        const caixa = carta.getBoundingClientRect();
        return {
            carta,
            x: 0,
            y: -caixa.bottom - indice * 120,
            vx: aleatorio(1600),
            vy: 0,
            minX: -caixa.left,
            maxX: innerWidth - caixa.right,
            maxY: Math.max(0, innerHeight - caixa.bottom)
        };
    });

    if (!jaAnimando) {
        tempoAnterior = performance.now();
        requestAnimationFrame(atualizarFisica);
    }
});

function atualizarFisica(agora) {
    const dt = Math.min((agora - tempoAnterior) / 1000, 0.032);
    tempoAnterior = agora;

    for (const c of corpos) {
        c.vy += GRAVIDADE * dt;
        c.x += c.vx * dt;
        c.y += c.vy * dt;

        if (c.x < c.minX || c.x > c.maxX) {
            c.x = Math.min(Math.max(c.x, c.minX), c.maxX);
            c.vx *= -QUIQUE;
        }

        if (c.y > c.maxY) {
            c.y = c.maxY;
            c.vy *= -QUIQUE;

            // No rodapé o card ganha um novo impulso para nunca parar de pular
            if (Math.abs(c.vy) < IMPULSO_MINIMO) {
                c.vy = -IMPULSO_MINIMO - Math.random() * 600;
                c.vx = aleatorio(1200);
            }
        }

        c.carta.style.transform = `translate(${c.x}px, ${c.y}px) rotate(${c.vx / 40}deg)`;
    }

    requestAnimationFrame(atualizarFisica);
}

setInterval(() => {
    if (document.hidden || movimentoReduzido.matches) {
        return;
    }

    cartas[Math.floor(Math.random() * cartas.length)].animate(
        [
            { translate: '0 0' },
            { translate: '0 -38px', offset: 0.3 },
            { translate: '0 0', offset: 0.7 },
            { translate: '0 -12px', offset: 0.86 },
            { translate: '0 0' }
        ],
        { duration: 700, easing: 'cubic-bezier(0.2, 0.75, 0.3, 1)' }
    );
}, 2000);