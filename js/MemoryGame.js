// CLASSE

class MemoryGame {
  constructor(player, points) {
    this.player = player;
    this.points = points;
    const carta1 = new deck(1, "./assets/harmonia.svg", "./assets/fe.svg")
    const carta2 = new deck(2, "./assets/poder.svg", "./assets/fe.svg")
    const carta3 = new deck(3, "./assets/projetar.svg", "./assets/fe.svg")
    const carta4 = new deck(4, "./assets/refletir.svg", "./assets/fe.svg")
    const carta5 = new deck(1, "./assets/harmonia.svg", "./assets/fe.svg")
    const carta6 = new deck(2, "./assets/poder.svg", "./assets/fe.svg")
    const carta7 = new deck(3, "./assets/projetar.svg", "./assets/fe.svg")
    const carta8 = new deck(4, "./assets/refletir.svg", "./assets/fe.svg")
    this.deck = [carta1, carta2, carta3, carta4, carta5, carta6, carta7, carta8];
    console.log (deck)
    this.selectedCards = [];
    const pointsHTML = document.getElementById("points");
    pointsHTML.innerText = this.points; // setando o numero de tentativos no meu html
    playerName.innerText = this.player; // setando o nome do jogador no meu html
  }

  renderDeck() {
    //randomizar o deck ->> EMBARALHAR -> shufle
    this.deck.sort(() => {
      return Math.random() - 0.5;
    });

    console.log(this.deck);

    //capturar o board
    const board = document.getElementById("board");

    //iterar pela array do deck e criar as minhas cartas
    this.deck.forEach((element) => {
      const imgFront = document.createElement("img"); // <img />
      imgFront.src = element.source; // <img src="./assets/refletir.svg" />
      imgFront.className = "hide cardFront";

      const imgBack = document.createElement("img"); // <img />
      imgBack.src = element.verso; //<img src="./assets/fe.svg" />
      imgBack.className = "show cardBack";

      board.appendChild(imgFront);
      board.appendChild(imgBack);
    });
  }

  flipCard(card) {
    this.selectedCards.push(card);

    if (this.selectedCards.length === 2) {
      console.log("Duas cartas foram viradas. Vamos compara-las");
      this.checkPair();
    }
  }

  checkPair() {
    console.log(this.selectedCards);
    if (this.selectedCards[0].src === this.selectedCards[1].src) {
      console.log("Cartas são iguais!!");
      // criar um indicador de que as cartas já foram viradas
      this.selectedCards[0].classList.add("turn");
      this.selectedCards[1].classList.add("turn");

      // limpar a minha array de cartas selecionadas
      this.selectedCards = [];

      // checar o status do jogo
      this.checkStatus();
    } else {
      console.log("Cartas são diferentes!");
      // remover ponto do jogador
      this.points--;

      // desvirar as duas cartas
      setTimeout(() => {
        console.log("Fechando as cartas selecionadas");

        //esconder as cartas que estão abertas!!
        this.selectedCards[0].className = "hide cardFront";
        this.selectedCards[1].className = "hide cardFront";

        //mostrando os cards-back
        this.selectedCards[0].nextElementSibling.className = "show cardBack";
        this.selectedCards[1].nextElementSibling.className = "show cardBack";

        //limpando a minha array de cartas selecionadas
        this.selectedCards = [];

        //checar o status do jogo
        this.checkStatus();
      }, 1500);
    }
  }

  checkStatus() {
    // checar o status do jogo
    console.log(
      "Checando se o jogador ainda tem pontos OU se ele venceu o jogo!!"
    );
    // se o jogador ainda tem pontos -> perdeu
    if (this.points === 0) {
      console.log("Você perdeu por pontos");
      alert(`${this.player}, você não tem mais pontos! Tente novamente`);

      const board = document.querySelector("#board");
      board.classList.add("hide");
    }

    // ainda existem cartas para serem viradas -> ganhou
    const cardsTurn = document.querySelectorAll(".turn");
    if (cardsTurn.length === this.deck.length) {
      console.log("Venceu!!");
      alert(`${this.player} você venceu!!`);
    }
  }
}

// CLASSE
class deck {
  constructor(tipo, source, verso) {
    this.tpo = tipo;
    this.source = source;
    this.verso = verso;
    this.selecionada = false;
      
  }
}
