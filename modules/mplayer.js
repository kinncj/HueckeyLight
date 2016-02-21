'use strict';

let Module = require('./../src/Module.js');
let player = require('play-sound')({player: 'mplayer'});

const AUDIO_FILE = 'horn.mp3';

class Mplayer extends Module
{
    execute(data, config)
    {
        if (config.silent) {
            return;
        }

        player.play(AUDIO_FILE, (error) => { console.log('audioError', error); });
    }
}

module.exports = new Mplayer();
