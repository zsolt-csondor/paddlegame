import {Howl, Howler} from 'howler';

export default class SoundPlayer {
    constructor() {

        this.sound = new Howl({
            src: ["./assets/bat_hit.wav", "./assets/bat_hit.wav"],
            sprite: {
                bat: [0, 2000]
              }
        });

        this.sounds = {
            collision: {
                paddle: new Howl({
                    src: ["./assets/bat_hit.wav", "./assets/bat_hit.wav"],
                    sprite: {
                        bat: [0, 2000]
                    }
                }),
                wall: new Howl({
                    src: ["./assets/bat_hit.wav", "./assets/bat_hit.wav"],
                    sprite: {
                        bat: [0, 2000]
                    }
                }),
                brick: new Howl({
                    src: ["./assets/brick_hit.wav", "./assets/brick_hit.wav"],
                    sprite: {
                        bat: [0, 2000]
                    }
                })
            }
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
        
        let evtType = event.type;
        let evtObj = event.eventObject;
        
        this.sounds[evtType][evtObj].play("bat");
            
        
    }


}