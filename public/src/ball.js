import {detectCollision} from "./collisionDetection.js";

export default class Ball {
    constructor(game) {
        this.context = game.context;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.radius = this.gameHeight / 80;

        this.position = {
            x: this.gameWidth / 2 - this.radius / 2,
            y: this.gameHeight / 4
        }

        this.speed = {
            x: this.gameWidth / 160,
            y: this.gameHeight / 160
        }

        //Storing paddle info for collision detection
        this.game = game;

        this.soundPlayer = game.soundPlayer;
        this.soundEvents = {
            paddleCollisionEvt: {
                type: "collision",
                eventObject: "paddle"
            },
            wallCollisionEvt: {
                type: "collision",
                eventObject: "wall"
            }
        }
        this.paddleCollisionEvt = {
            type: "collision",
            eventObject: "paddle"
        }
    }

    resetPosition() {
        this.position = {
            x: this.gameWidth / 2 - this.radius / 2,
            y: this.gameHeight / 4
        }
    }

    draw() {
        this.context.fillStyle = "#555555";
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();

        //resetting colour for the paddle
        this.context.fillStyle = "#000000";
    }

    update(dt) {
        /** Collision handling*/
        //TODO: make this more realistic

        //Left and right walls
        if(this.position.x + this.radius >= this.gameWidth || this.position.x - this.radius <= 0) {
            this.soundPlayer.play(this.soundEvents.wallCollisionEvt);
            this.speed.x *= - 1;
        }

        //Top wall
        if(this.position.y - this.radius <= 0) {
            this.soundPlayer.play(this.soundEvents.wallCollisionEvt);
            this.speed.y *= -1;
        }

        //Bottom wall: if the ball falls through, its game over!
        if(this.position.y + this.radius >= this.gameHeight) {
            this.game.lives--;
            //Otherwise it is game over and the game update function will handle that
            if(this.game.lives > 0) {
                this.game.gamestate = this.game.GAMESTATES.LOSTLIFE;
            }

            this.resetPosition();
        }

        if(detectCollision(this, this.game.paddle)) {
            
            this.soundPlayer.play(this.soundEvents.paddleCollisionEvt);
            this.speed.y *= -1;
        }

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }
}
