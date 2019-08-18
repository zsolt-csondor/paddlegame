import Paddle from "./paddle.js";
import Ball from "./ball.js";
import Brick from "./brick.js";
import InputHandler from "./input.js";
import {buildLevel, levels} from "./levels.js";

//TODO: create a config class for the game parameters like width, height, etc.
//TODO: don't pass the whole game to other components if not necessary

export default class Game {
    constructor(context, gameWidth, gameHeight) {
        this.context = context;

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.GAMESTATES = {
            PAUSED: 0,
            RUNNING: 1,
            MENU: 2,
            GAMEOVER: 3,
            NEWLEVEL: 4,
            GAMEWON: 5
        };
        this.gamestate = this.GAMESTATES.MENU;

        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        this.inputHandler = new InputHandler(this.paddle, this);

        this.bricks = buildLevel(this, levels[0]);
        this.gameObjects = [this.ball, this.paddle];

        this.lives = 2;

        this.levels = levels;
        this.currentLevel = 0;
    }

    start() {
        //If the game has ended, reset the level index before rebuilding the level
        if(this.gamestate === this.GAMESTATES.GAMEOVER
            || this.gamestate === this.GAMESTATES.GAMEWON) this.currentLevel = 0;

        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.lives = 2;

        this.gamestate = this.GAMESTATES.RUNNING;
    }

    draw() {
        [...this.gameObjects, ...this.bricks].forEach((gameObj) => gameObj.draw());

        if(this.gamestate === this.GAMESTATES.PAUSED) {
            this.context.rect(0,0, this.gameWidth, this.gameHeight);
            this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
            this.context.fill();

            this.context.font = "30px Arial";
            this.context.fillStyle = "#ffffff";
            this.context.textAlign = "center";
            this.context.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);

        }
        else if(this.gamestate === this.GAMESTATES.MENU) {
            this.context.rect(0, 0, this.gameWidth, this.gameHeight);
            this.context.fillStyle = "#000000";
            this.context.fill();

            this.context.font = "30px Arial";
            this.context.fillStyle = "#ffffff";
            this.context.textAlign = "center";
            this.context.fillText("Press SPACEBAR to Start", this.gameWidth / 2, this.gameHeight / 2);

        }
        else if(this.gamestate === this.GAMESTATES.GAMEOVER) {
            this.context.rect(0, 0, this.gameWidth, this.gameHeight);
            this.context.fillStyle = "#000000";
            this.context.fill();

            this.context.font = "30px Arial";
            this.context.fillStyle = "#ffffff";
            this.context.textAlign = "center";
            this.context.fillText("Game Over :-( Press SPACEBAR to Restart", this.gameWidth / 2, this.gameHeight / 2);
        }
        else if(this.gamestate === this.GAMESTATES.GAMEWON) {
            this.context.rect(0, 0, this.gameWidth, this.gameHeight);
            this.context.fillStyle = "#000000";
            this.context.fill();

            this.context.font = "30px Arial";
            this.context.fillStyle = "#ffffff";
            this.context.textAlign = "center";
            this.context.fillText("You Won! :-) Press SPACEBAR to Play Again", this.gameWidth / 2, this.gameHeight / 2);
        }
    }

    update(dt) {
        if(this.gamestate === this.GAMESTATES.PAUSED || this.gamestate === this.GAMESTATES.MENU
        || this.gamestate === this.GAMESTATES.GAMEOVER || this.gamestate === this.GAMESTATES.GAMEWON) return;

        if(this.lives === 0) {
            this.gamestate = this.GAMESTATES.GAMEOVER;
        }

        [...this.gameObjects, ...this.bricks].forEach((gameObj) => gameObj.update(dt));
        this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);

        //If there are no more bricks left, we either won the game, or load
        //the next level
        if(this.bricks.length === 0) {
            if(this.currentLevel + 1 === this.levels.length) {
                this.gamestate = this.GAMESTATES.GAMEWON;
            }
            else {
                this.currentLevel++;
                this.gamestate = this.GAMESTATES.NEWLEVEL;
                this.start();
            }
        }
    }

    togglePause() {
        if(this.gamestate === this.GAMESTATES.PAUSED) {
            this.gamestate = this.GAMESTATES.RUNNING;
        }
        else if(this.gamestate === this.GAMESTATES.RUNNING) {
            this.gamestate = this.GAMESTATES.PAUSED;
        }
    }
}