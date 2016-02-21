'use strict';

let jsonp  = require('jsonp-client');
let config = require('./config.js')('./config.json');
let player = require('play-sound')({player: 'mplayer'});
let path   = require('path');

const MAX_TIMER  = 14;
const AUDIO_FILE = 'horn.mp3';

class Goal
{
    constructor(light, team)
    {
        this.light     = light;
        this.team      = team;
        this.score     = false;
        this.timer     = 0;
        this.iterating = false;

        setTimeout(() => this.tick(), 3000);
    }

    tick()
    {
        try {
        jsonp('http://live.nhle.com/GameData/RegularSeasonScoreboardv3.jsonp', function(err, data){
            let games = data.games || [];
            let score = false;
            games.forEach(function(game){
                if (game.atn === this.team) {
                    score = game.ats;
                }

                if (game.htn === this.team) {
                    score = game.hts
                }
            }.bind(this));

            if (score) {
                if (this.score != score) {
                    if (!this.iterating) {
                        player.play(AUDIO_FILE, (error) => { console.log('audioError', err); });
                        this.play();
                    }
                }

                this.score = score;
            }

            setTimeout(() => this.tick(), 2000);
        }.bind(this));
        } catch (error) {
            console.log('NHL API ERROR:', error);
        }
    }

    play()
    {
        if (this.timer > MAX_TIMER) {
            this.timer     = 0;
            this.iterating = false;
            return;
        }
        
        this.iterating = true;

        let on     = true;
        let bright = 100;
        switch (this.timer) {
           case 0:
           case 7:
               bright = 0;
               break;
           case 1:
           case 8:
               bright = 100;
               break;
           case 2:
           case 9:
               bright = 0;
               break;
           case 3:
           case 10:
               bright = 100;
               break;
           case 4:
           case 11:
               bright = 0;
               break;
           case 5:
           case 13:
               bright = 100;
               break
           case 6:
           case 14:
               bright = 0;
               on     = false;
               break;
        }

        let state = {
            on:  on,
            bri: bright,
            xy: config.color
        };

        this.timer++;
        this.light.setState(state);
        setTimeout(this.play.bind(this), 500);
    }
}

module.exports = Goal;
