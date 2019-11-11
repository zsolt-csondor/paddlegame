import {detectCollision} from "./collisionDetection.js";

export default class Brick {
    constructor(game, position) {
        this.context = game.context;
        this.game = game;

        this.width = game.gameWidth / 10;
        this.height = game.gameHeight / 20;

        this.position = {
            x: position.x,
            y: position.y
        }

        this.markedForDeletion = false;
    }

    draw() {
        this.context.fillStyle = "#000000";
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height);

        this.context.fillStyle = "#ff0000";
        this.context.fillRect(this.position.x, this.position.y, this.width-1, this.height-1);
    }

    update() {
        if(detectCollision(this.game.ball, this)) {
            this.markedForDeletion = true;
            this.game.ball.speed.y *= -1;
        }
    }
}
