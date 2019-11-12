import {Howl, Howler} from 'howler';

export default class SoundPlayer {
    constructor() {

        this.sound = new Howl({
            src: ["./assets/bat_hit.wav", "./assets/bat_hit.wav"],
            sprite: {
                bat: [0, 2000]
              }
        });

        this.played = false;


    }

    play() {
        if(!this.played) {
            this.sound.play("bat");
            //this.played = true;
        }
    }


}