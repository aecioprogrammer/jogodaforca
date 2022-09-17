//Define as variáveis globais
const mainContent = document.querySelector("#main-section");
const gameSection = document.querySelector("#game-section");
const wordSection = document.querySelector("#word-section");

//Array que armazena as palavras secretas digitadas
const secretWord = ["PALAVRA", "PROBLEMA", "MARAVILHA", "MORCEGO", "CARAMUJO"];

// const secretWord = [];

//Variável que armazena a palavra secreta sorteada
let randomSecretWord;

//Variável que armazena as letras corretas digitadas na ordem correta
//em que estão na palavra secreta sorteada
let guessSecretWord = [];

//Array que armazena as letras erradas digitadas
let wrongGuesses = [];

//Função de início do script
function start() {
  console.log("Iniciando o jogo da forca...");
  startGame();
  addWord();
  saveAndBegin();
  cancelGame();
  newGame();
  showCanvas();
  // inputListener();
}

//Inicia o jogo
function startGame() {
  const startGameButton = document.querySelector("#startGameButton");

  startGameButton.addEventListener("click", function () {
    if (secretWord.length > 0) {
      mainContent.classList.add("hide-section");
      gameSection.classList.remove("hide-section");
      resetCanvas();
      randomWord();
    } else {
      handleAddWordButton();
      alert("Não há palavras secretas digitadas ainda! Digite uma....");
    }
  });
}

//Ativa a tela de inclusão de palavras
function addWord() {
  const addWordButton = document.querySelector("#addNewWordButton");
  addWordButton.addEventListener("click", handleAddWordButton);
}

function handleAddWordButton() {
  const word = document.getElementById("secret-word");

  mainContent.classList.add("hide-section");
  wordSection.classList.remove("hide-section");

  word.value = "";
  word.focus();
}

function saveAndBegin() {
  const saveWordButton = document.querySelector("#saveWordButton");
  saveWordButton.addEventListener("click", function () {
    const word = document.querySelector("#secret-word");
    const wordValue = word.value.toUpperCase();

    //Verifica se a palavra digitada está conforme as regras, armazena a palavra no array de
    //palavras secretas, ativa a tela do jogo e inicia o jogo
    if (inputKeyCheck(wordValue)) {
      word.value = wordValue;
      !secretWord.includes(wordValue)
        ? secretWord.push(wordValue)
        : console.log("Palavra já inserida!");
      wordSection.classList.add("hide-section");
      gameSection.classList.remove("hide-section");

      resetCanvas();
      randomWord();
    } else {
      word.value = "";
      alert("Somente letras sem acento são permitidas! Tente novamente...");
    }
  });
}

//Define o listener dos botões de Cancelar nas telas de Adicionar Palavra e do Jogo
function cancelGame() {
  const cancelGameButton = document.querySelector("#cancelGameButton");
  const cancelButton = document.querySelector("#cancelButton");
  cancelGameButton.addEventListener("click", handleCancelButton);
  cancelButton.addEventListener("click", handleCancelButton);
}

//Ativa a exibição da tela principal e desativa das demais
function handleCancelButton() {
  gameSection.classList.add("hide-section");
  wordSection.classList.add("hide-section");
  mainContent.classList.remove("hide-section");
}

//Reinicia o jogo
function newGame() {
  const newGameButton = document.querySelector("#newGameButton");
  newGameButton.addEventListener("click", function () {
    resetCanvas();
    resetGame();
    randomWord();
  });
}

//Sorteia a palavra secreta, chama a função de desenho das linhas
//e ativa o listener do keyboard

function randomWord() {
  let randomNumber = Math.floor(Math.random() * secretWord.length);
  randomSecretWord = secretWord[randomNumber];

  drawLines(randomSecretWord.length);
  keyboardListener();
}

//Define o listener do Keyboard
function keyboardListener() {
  document.addEventListener("keypress", handleKeybordListener);
}

//Função do listener do keyboard
function handleKeybordListener(Event) {
  const keyPressed = Event.key.toUpperCase();

  //Verifica se a letra do palpite está na palavra, armazena no array próprio
  //o palpite errado e chama a função de desenho das letras erradas

  if (inputKeyCheck(keyPressed)) {
    if (guessCheck(keyPressed) && !wrongGuesses.includes(keyPressed)) {
      wrongGuesses.push(keyPressed);
      clearWrongLettersArea();
      drawWrongLetter(wrongGuesses.length, wrongGuesses.join(" "));

      //Verifica se o jogo terminou
      endGame();

      //Chama a função de desenho do boneco da forca de acordo com o número de erros
      //expresso pelo tamanho do array que armazena os palpites errados
      switch (wrongGuesses.length) {
        case 1:
          drawHead();
          break;
        case 2:
          drawBody();
          break;
        case 3:
          drawRightArm();
          break;
        case 4:
          drawLeftArm();
          break;
        case 5:
          drawRightLeg();
          break;
        case 6:
          drawLeftLeg();
          break;
      }
    }
  } else {
    alert("Somente letras sem acento são permitidas! Tente novamente...");
  }
}

// function inputListener() {
//   const wordInput = document.querySelector("#secret-word");
//   wordInput.addEventListener('keypress')
// }

//Reinicializa as variáveis globais e remove o listener para evitar duplicidade
//de letras erradas
function resetGame() {
  wrongGuesses = [];
  randomSecretWord = "";
  guessSecretWord = [];
  document.removeEventListener("keypress", handleKeybordListener);
}

//Verifica se a letra escolhida está dentro da regra das letras permitidas no jogo
function inputKeyCheck(text) {
  const inputRule = /[A-Z]/g;
  return inputRule.test(text);
}

//Verifica se a letra escolhida está correta
function guessCheck(guess) {
  let guessCheckError = true;

  //Itera a palavra secreta e verifica se a letra escolhida pertence
  //à palavra
  for (let i = 0; i < randomSecretWord.length; i++) {
    if (guess === randomSecretWord[i]) {
      guessCheckError = false;

      //Armazena a letra do palpite no array na posição correta
      guessSecretWord[i] = guess;

      //Chama a função para escrever as letras corretas na posição correta
      drawRightLetter(randomSecretWord.length, guess, i);

      //Verifica se o jogador venceu

      endGame();
    }
  }
  return guessCheckError;
}

//Verifica se o jogador venceu ou perdeu o jogo
function endGame() {
  let endGameMessage;
  console.log("Palavra: ", randomSecretWord);

  //Verifica se o tamanho do array que armazena os palpites errados chegou ao limite
  if (wrongGuesses.length === 6) {
    endGameMessage = "Você Perdeu! Fim de Jogo!";
    drawEndGameMessage(endGameMessage, "red");
    drawLossHead();
    document.removeEventListener("keypress", handleKeybordListener);
  }

  //Verifica se o tamanho do array que armazena os palpites corretos
  //é igual ao tamanho da palavra sorteada

  if (guessSecretWord.toString().replaceAll(",", "") === randomSecretWord) {
    endGameMessage = "Você Venceu!";
    drawEndGameMessage(endGameMessage, "green");
  }

  //Chama a função que desenha a mensagem de fim de jogo na tela
}

start();
