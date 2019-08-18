import {detectCollision} from "./collisionDetection.js";

export default class Ball {
    constructor(game) {
        this.context = game.context;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.radius = 10;

        this.position = {
            x: this.gameWidth / 2 - this.radius / 2,
            y: this.gameHeight / 4
        }

        this.speed = {
            x: 4,
            y: 4
        }

        //Storing paddle info for collision detection
        this.game = game;
    }

    resetPosition() {
        this.position = {
            x: this.gameWidth / 2 - this.radius / 2,
            y: this.gameHeight / 4
        }
    }

    draw() {
        this.context.fillStyle = "#ff0066";
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);

        this.context.fill();
        this.context.fillStyle = "#000000";
    }

    update(dt) {
        /** Collision handling*/
        //TODO: make this more realistic

        //Left and right walls
        if(this.position.x + this.radius >= this.gameWidth || this.position.x - this.radius <= 0) {
            this.speed.x *= - 1;
        }

        //Top and bottom walls
        if(this.position.y - this.radius <= 0) {
            this.speed.y *= -1;
        }
        //Bottom wall: if the ball falls through, its game over!
        if(this.position.y + this.radius >= this.gameHeight) {
            this.game.lives--;
            this.resetPosition();
        }

        if(detectCollision(this, this.game.paddle)) {
            this.speed.y *= -1;
        }

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }
}
