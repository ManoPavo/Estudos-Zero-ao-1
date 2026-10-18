let cards = document.querySelectorAll('.card');
let cardItems = document.querySelectorAll('.card-item');
let cardContainer = document.querySelector('.card-container');

const createCard = {
    
    nome: '',
    descricao: '',
    imagem: '',

    funcao: function() {
        cardContainer.innerHTML += `
            <div class="card">
                <h2>${this.nome}</h2>
                <p>${this.descricao}</p>
                <img src="${this.imagem}" alt="${this.nome}">
            </div>
        `;
    }
};

const newCard = Object.create(createCard);
newCard.nome = 'Pavudos';
newCard.descricao = 'The Bigger Pavão';
newCard.imagem = 'pavao.png';
newCard.funcao();