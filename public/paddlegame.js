import 'bootstrap/dist/css/bootstrap.min.css';
import Game from "./src/game.js";

let canvas = document.getElementById("gameScreen");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

let lastTime = 0;

let game = new Game(context, GAME_WIDTH, GAME_HEIGHT);

function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(dt);
  game.draw();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
