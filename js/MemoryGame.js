// CLASSE
class MemoryGame {
  constructor(player, points) { 
    this.player = player;
    this.points = points;
    const carta1 = new deck(1, 1, "./assets/harmonia.svg", "harmonia")
    const carta2 = new deck(2, 2, "./assets/poder.svg", "poder")
    const carta3 = new deck(3, 3, "./assets/projetar.svg", "projetar")
    const carta4 = new deck(4, 4, "./assets/refletir.svg", "refletir")
    const carta5 = new deck(5, 1, "./assets/harmonia.svg", "harmonia")
    const carta6 = new deck(6, 2, "./assets/poder.svg", "poder")
    const carta7 = new deck(7, 3, "./assets/projetar.svg", "projetar")
    const carta8 = new deck(8, 4, "./assets/refletir.svg", "refletir")
    this.deck = [carta1, carta2, carta3, carta4, carta5, carta6, carta7, carta8];
    this. verso = "./assets/fe.svg" ;
    const pointsHTML = document.getElementById("points");
    pointsHTML.innerText = this.points; // setando o numero de tentativos no meu html
    playerName.innerText = this.player; // setando o nome do jogador no meu html
    
  }

  renderDeck() {
    console.log("randomizar o deck ->> EMBARALHAR -> shufle")
    this.deck.sort(() => {
      return Math.random() - 0.5;
    });

    //capturar o board
    const board = document.getElementById("board");

    console.log("iterar pela array do deck e criar as minhas cartas viradas para baixo")
    this.deck.forEach((element) => {
      const imgBack = document.createElement("img"); // <img />
      imgBack.id = element.id;
      imgBack.src = this.verso; // <img src="./assets/fe.svg" />
      imgBack.alt = "carta virada"
      imgBack.className = "show cardBack";
      board.appendChild(imgBack);
    });
  }

  flipCard(event) {
    const idCarta = (event.currentTarget)['id'] * 1
    console.log(event)
    if (document.getElementById(idCarta).classList.contains("turn", "selecionado")) {
      console.log("Carta já foi selecionada")
    }
    else {
      document.getElementById(idCarta).src = this.deck.find(element => element.id == idCarta).source;
      document.getElementById(idCarta).alt = this.deck.find(element => element.id == idCarta).alt
      document.getElementById(idCarta).classList.add("selecionado", "cardFront");
      document.getElementById(idCarta).classList.remove("cardBack");
      if (document.querySelectorAll('.selecionado').length === 2) {
        //if (this.deck.filter(element => element.selecionado).length === 2) 
        console.log("Duas cartas foram viradas. Vamos compara-las");
        this.checkPair();
      }
    }
  }

  checkPair() {
    //const carta1 = this.deck.find(element => element.selecionado);
    //const carta2 = this.deck.findLast(element => element.selecionado);
    let cartasId = [...(document.querySelectorAll('.selecionado'))].map(element => element.id)
    const idCarta1 = cartasId[0];
    const idCarta2 = cartasId[1];

    if (this.deck.find(element => element.id == idCarta1).tipo === this.deck.findLast(element => element.id == idCarta2).tipo) {
      console.log("Cartas são iguais!!");
      // criar um indicador de que as cartas já foram viradas
      for (let i of cartasId)
        document.getElementById(i).classList.add("turn");

      // checar o status do jogo
      this.checkStatus();
    }
    else {
      console.log("Cartas são diferentes!");
      // remover ponto do jogador
      this.points--;
      points.innerText = this.points
      // desvirar as duas cartas
      setTimeout(() => {
        console.log("Fechando as cartas selecionadas");

        for (let i of cartasId) {
          document.getElementById(i).classList.remove("selecionado", "cardFront");

          //alterando o fundo para carta de verso
          document.getElementById(i).src = this.verso;
           //alterando o alt para carta de verso
           document.getElementById(i).alt = "carta virada";

          document.getElementById(i).classList.add("cardBack");

        }
        //checar o status do jogo
        this.checkStatus();
      }, 1500);
    }
    // setar todas cartas como não selecionadas
    //this.deck.forEach(element, index => element.selecionado = false)
    setTimeout((event) => {

      for (let i of cartasId)
        document.getElementById(i).classList.remove("selecionado");

    }, 1500);
  }

  checkStatus() {
    // checar o status do jogo
    console.log(
      "Checando se o jogador ainda tem pontos OU se ele venceu o jogo!!"
    );
    console.log(this.points)
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
  constructor(id, tipo, source, alt) {
    this.id = id;
    this.tipo = tipo;
    this.source = source;
    this.alt = alt;
  }

}
