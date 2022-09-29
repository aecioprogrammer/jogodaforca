//Define variáveis globais
const gameArea = document.querySelector("canvas").getContext("2d");

//Desenha a área do jogo
//Define o padrão das linhas
function showCanvas() {
  gameArea.lineWidth = 6;
  gameArea.lineCap = "round";
  gameArea.lineJoin = "round";
  gameArea.fillStyle = "#E5E5E5";
  gameArea.strokeStyle = "#0A3871";
  gameArea.fillRect(0, 0, 1200, 800);
  drawGallows();
}

function resetCanvas() {
  gameArea.clearRect(0, 0, 1200, 800);
  drawGallows();
}

//Desenha as linhas correspondentes ao tamanho da palavra
function drawLines(lines) {
  //Define o início do desenho das linhas centralizando de acordo com
  //o tamanho definido para a área do jogo
  //80 é a largura da linha e 100 o espaçamento entre início de cada linha

  const initialXCoordinate =
    (1200 - (80 * lines + (100 - 80) * (lines - 1))) / 2;
  for (let i = 0; i < lines; i++) {
    gameArea.beginPath();
    gameArea.moveTo(initialXCoordinate + i * 100, 560);
    gameArea.lineTo(initialXCoordinate + 80 + i * 100, 560);
    gameArea.stroke();
  }
}

//Desenha as letras corretas na área do jogo
function drawRightLetter(lines, letter, arrayLetterPosition) {
  //Define o início do desenho das linhas centralizando de acordo com
  //o tamanho definido para a área do jogo
  //80 é a largura da linha e 100 o espaçamento entre início de cada linha
  const initialXCoordinate =
    (1200 - (80 * lines + (100 - 80) * (lines - 1))) / 2;
  gameArea.fillStyle = "#0A3871";
  gameArea.font = "72px Inter";
  gameArea.fillText(
    letter,
    initialXCoordinate + 20 + arrayLetterPosition * 100,
    520
  );
}

//Desenha as letras erradas na área do jogo
function drawWrongLetter(letters, keys, color = "#0A3871") {
  const initialXCoordinate = (1200 - 20 * letters) / 2;
  gameArea.fillStyle = color;
  gameArea.font = "24px Inter";
  gameArea.fillText(keys, initialXCoordinate, 620);
}

//Limpa a área das letras erradas
function clearWrongLettersArea() {
  gameArea.clearRect(0, 600, 1200, 640);
}

//Desenha a mensagem de fim de jogo
function drawEndGameMessage(text, color) {
  gameArea.fillStyle = color;
  gameArea.font = "32px Inter";
  gameArea.fillText(text, 780, 220);
}

//Desenha a forca
function drawGallows() {
  gameArea.beginPath();
  gameArea.moveTo(450, 380);
  gameArea.lineTo(750, 380);
  gameArea.stroke();
  gameArea.moveTo(520, 380);
  gameArea.lineTo(520, 5);
  gameArea.stroke();
  gameArea.moveTo(520, 5);
  gameArea.lineTo(700, 5);
  gameArea.stroke();
  gameArea.moveTo(700, 5);
  gameArea.lineTo(700, 50);
  gameArea.stroke();
}

//Desenha a cabeça
function drawHead() {
  gameArea.beginPath();
  gameArea.arc(700, 80, 30, 0, 2 * Math.PI);
  gameArea.stroke();
}

//Desenha o braço direito
function drawRightArm() {
  gameArea.beginPath();
  gameArea.moveTo(700, 110);
  gameArea.lineTo(740, 180);
  gameArea.stroke();
}

//Desenha o braço esquerdo
function drawLeftArm() {
  gameArea.beginPath();
  gameArea.moveTo(700, 110);
  gameArea.lineTo(660, 180);
  gameArea.stroke();
}

//Desenha o corpo
function drawBody() {
  gameArea.beginPath();
  gameArea.moveTo(700, 110);
  gameArea.lineTo(700, 260);
  gameArea.stroke();
}

//Desenha a perna direita
function drawRightLeg() {
  gameArea.beginPath();
  gameArea.moveTo(700, 260);
  gameArea.lineTo(740, 330);
  gameArea.stroke();
}

//Desenha a perna esquerda
function drawLeftLeg() {
  gameArea.beginPath();
  gameArea.moveTo(700, 260);
  gameArea.lineTo(660, 330);
  gameArea.stroke();
}

function drawLossHead() {
  gameArea.fillStyle = "#0A3871";
  gameArea.font = "24px Inter";
  gameArea.fillText("+", 680, 80);
  gameArea.fillText("+", 705, 80);
}
