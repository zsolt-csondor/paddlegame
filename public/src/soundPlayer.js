import {Howl, Howler} from 'howler';

export default class SoundPlayer {
    constructor() {

        this.sounds = {
            collision: {
                paddle: new Howl({
                    src: ["./assets/bat_hit.wav", "./assets/bat_hit.wav"],
                    sprite: {
                        interval: [0, 2000]
                    }
                }),
                wall: new Howl({
                    src: ["./assets/bat_hit.wav", "./assets/bat_hit.wav"],
                    sprite: {
                        interval: [0, 2000]
                    }
                }),
                brick: new Howl({
                    src: ["./assets/brick_hit.wav", "./assets/brick_hit.wav"],
                    sprite: {
                        interval: [0, 2000]
                    }
                })
            },
            lifeLost:  new Howl({
                src: ["./assets/life_lost.wav", "./assets/life_lost.wav"],
                sprite: {
                    interval: [0, 2000]
                }
            }),
            gameOver:  new Howl({
                src: ["./assets/game_over.wav", "./assets/game_over.wav"],
                sprite: {
                    interval: [0, 4000]
                }
            }),
        }
    }

    /**
     * 
     * @param {object} event 
     * {
     *  type: collision,
     *  eventObject: wall
     * }
     */
    play(event) {
 
        if(!event) {
            console.warn("SoundPlayer.play was called without a parameter");
            return;
        }

        let evtType = event.type;
        let evtObj = event.eventObject;

        //If there is an object involved, the ball hit something
        //otherwise it is a game event, like game over so just key on the type
        if(evtObj !== undefined) {
            this.sounds[evtType][evtObj].play("interval");
        }
        else {
            this.sounds[evtType].play("interval");
        }        
    }
}