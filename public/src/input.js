export default class InputHandler {
  constructor(paddle, game) {

    document.addEventListener("keydown", event => {

      if (event.keyCode === 37) {
        paddle.moveLeft();
      }
      else if (event.keyCode === 39) {
        paddle.moveRight();
      }
      else if(event.keyCode === 27) {
          game.togglePause();
      }
      else if(event.keyCode === 32) {
          if(game.gamestate === game.GAMESTATES.RUNNING) return;
          
          game.start();
      }
    });

    document.addEventListener("keyup", event => {
        
      if (event.keyCode === 37) {
        if (paddle.speed < 0) paddle.stop();
      }
      else if (event.keyCode === 39) {
        if (paddle.speed > 0) paddle.stop();
      }
    });
  }
}
