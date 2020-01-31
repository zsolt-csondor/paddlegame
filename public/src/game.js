import Paddle from "./paddle.js";
import Ball from "./ball.js";
import InputHandler from "./input.js";
import {buildLevel, levels} from "./levels.js";
import displayMessageScreen from "./displayMessageScreen.js";
import SoundPlayer from "./soundPlayer.js";

//TODO: create a config class for the game parameters like width, height, etc.
//TODO: don't pass the whole game to other components if not necessary
//IDEA: reset ball to a random position and direction after lost life (somewhere under the bricks)

export default class Game {
    constructor(context) {
        this.context = context;

        this.gameWidth = context.width;
        this.gameHeight = context.height;

        this.GAMESTATES = {
            PAUSED: 0,
            RUNNING: 1,
            MENU: 2,
            GAMEOVER: 3,
            NEWLEVEL: 4,
            LOSTLIFE: 5,
            GAMEWON: 6
        };
        this.gamestate = this.GAMESTATES.MENU;

        this.soundPlayer = new SoundPlayer();
        this.soundEvents = {
            lifeLostEvt: {
                type: "lifeLost"
            },
            gameOverEvt: {
                type: "gameOver"
            },
            newLevelEvt: {
                type: "newLevel"
            },
            gameWonEvt: {
                type: "gameWon"
            }
        }
        this.soundPlayed = false;

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
            || this.gamestate === this.GAMESTATES.GAMEWON) { 
            
                this.currentLevel = 0;
                this.lives = 2;
                this.ball.resetPosition();
        }
        
        //If we lost a life just stay on the current level
        if(this.gamestate !== this.GAMESTATES.LOSTLIFE) {
            this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        }

        this.gamestate = this.GAMESTATES.RUNNING;
        this.soundPlayed = false;

        this.soundPlayer.playGameLoop();
    }

    draw() {
        [...this.gameObjects, ...this.bricks].forEach((gameObj) => gameObj.draw());

        if(this.gamestate === this.GAMESTATES.PAUSED) {
            displayMessageScreen("Paused", this.context);
        }
        else if(this.gamestate === this.GAMESTATES.NEWLEVEL) {
            this.soundPlayer.stopGameLoop();
            this.playGameSound(this.soundEvents.newLevelEvt);
            displayMessageScreen("Level cleared! Press Space to load the next level", this.context);
            this.ball.resetPosition();
        }
        else if(this.gamestate === this.GAMESTATES.LOSTLIFE) {
            this.soundPlayer.stopGameLoop();
            //Aaaaawwwww..!
            this.playGameSound(this.soundEvents.lifeLostEvt);

            let life = (this.lives === 1) ? "life" : "lives";
            let msg = "You have " + this.lives + " " + life + " left. Press Space to continue";
            displayMessageScreen(msg, this.context);
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
            this.soundPlayer.stopGameLoop();
            this.playGameSound(this.soundEvents.gameOverEvt);

            this.context.rect(0, 0, this.gameWidth, this.gameHeight);
            this.context.fillStyle = "#000000";
            this.context.fill();

            this.context.font = "30px Arial";
            this.context.fillStyle = "#ffffff";
            this.context.textAlign = "center";
            this.context.fillText("Game Over :-( Press SPACEBAR to Restart", this.gameWidth / 2, this.gameHeight / 2);
        }
        else if(this.gamestate === this.GAMESTATES.GAMEWON) {
            this.playGameSound(this.soundEvents.gameWonEvt);

            this.context.rect(0, 0, this.gameWidth, this.gameHeight);
            this.context.fillStyle = "#000000";
            this.context.fill();

            this.context.font = "30px Arial";
            this.context.fillStyle = "#ffffff";
            this.context.textAlign = "center";
            this.context.fillText("You Won! :-) Press Space to Play Again", this.gameWidth / 2, this.gameHeight / 2);
        }
    }

    update(dt) {
        if(this.gamestate === this.GAMESTATES.PAUSED || this.gamestate === this.GAMESTATES.MENU
        || this.gamestate === this.GAMESTATES.GAMEOVER || this.gamestate === this.GAMESTATES.GAMEWON
        || this.gamestate === this.GAMESTATES.NEWLEVEL || this.gamestate === this.GAMESTATES.LOSTLIFE) 
        return;

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
            }
        }
    }

    togglePause() {
        if(this.gamestate === this.GAMESTATES.PAUSED) {
            this.soundPlayed = false;
            this.gamestate = this.GAMESTATES.RUNNING;
            this.soundPlayer.playGameLoop();
        }
        else if(this.gamestate === this.GAMESTATES.RUNNING) {
            this.gamestate = this.GAMESTATES.PAUSED;
            this.soundPlayer.stopGameLoop();
        }
    }

    playGameSound(soundEvent) {
        if(!this.soundPlayed) {
            this.soundPlayer.play(soundEvent);
            this.soundPlayed = true;
        }
    }
}
