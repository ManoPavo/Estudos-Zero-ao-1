let cards = document.querySelectorAll('.card');
let cardItems = document.querySelectorAll('.card-item');
let cardContainer = document.querySelector('.card-container');

const createCard = {
    
    nome: '',
    descricao: '',
    imagem: '',
    

    funcao: function() {
        cardContainer.innerHTML += `
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

const newCard = Object.create(createCard);
newCard.nome = 'Pavudos';
newCard.descricao = 'The Bigger Pavão';
newCard.imagem = 'pavao.png';
newCard.funcao();

const anotherCard = Object.create(createCard);
anotherCard.nome = 'Pavão Azul';
anotherCard.descricao = 'O Pavão mais elegante';
anotherCard.imagem = 'pavao.png';
anotherCard.funcao();

const thirdCard = Object.create(createCard);
thirdCard.nome = 'Pavão Verde';
thirdCard.descricao = 'O Pavão mais vibrante';
thirdCard.imagem = 'pavao.png';
thirdCard.funcao();

const fourthCard = Object.create(createCard);
fourthCard.nome = 'Pavão Vermelho';
fourthCard.descricao = 'O Pavão mais raro';
fourthCard.imagem = 'pavao.png';
fourthCard.funcao();