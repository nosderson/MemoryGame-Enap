//capturando todos os elementos de html
const startScreen = document.getElementById("startScreen");
const inputName = document.getElementById("inputName");
const gameScreen = document.getElementById("gameScreen");
const gameScore = document.getElementById("gameScore");
const playerName = document.getElementById("name");
const board = document.getElementById("board");

//adicionar o event listener do submit
addEventListener("submit", () => {
  //instanciar a minha classe
  const game = new MemoryGame(inputName.value, 5);
  // startScreen desapareça
  startScreen.classList.add("hide");
  // mostrar o gameScore
  gameScore.className = "show";

  game.renderDeck();

  settingUpGame(game);
});

function settingUpGame(game) {
  // capturar todas as cardsBack
  // adicionar a ela um eventlistener
  const allCardsBack = document.querySelectorAll(".cardBack");

  allCardsBack.forEach((cardBack) => {
    cardBack.addEventListener("click", () => {
      //o que acontece quando a carta é clicada

      const cardFront = cardBack.previousElementSibling;

      //mostra a carta da frente
      cardFront.className = "show cardFront";

      //esconde a carta de trás (carta verde)
      cardBack.className = "hide cardBack";

      game.flipCard(cardFront);

      points.innerText = game.points
    });
  });
}
