import 'bootstrap/dist/css/bootstrap.min.css';
import Game from "./src/game.js";

let canvas = document.getElementById("gameScreen");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.width = canvas.width;
context.height = canvas.height;

let lastTime = 0;

const game = new Game(context);

function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  context.clearRect(0, 0, context.width, context.height);

  game.update(dt);
  game.draw();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
