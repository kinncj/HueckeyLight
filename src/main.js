'use strict';

let config    = require('./config.js')('./config.json');
let hueConfig = require('./config.js')('./hueconfig.json');
let Hue       = require('philips-hue');
let fs        = require('fs');
let Goal      = require('./Goal.js');

module.exports = function() {
    let hue = new Hue();
    
    if (!hueConfig.bridge) {
        newConnection(hue);

        return;
    }
    
    oldConnection(hue);
}

let oldConnection = function(hue) {
    hue.bridge   = hueConfig.bridge;
    hue.username = hueConfig.username;

    setTimeout(() => new Goal(hue.light(config.bulbs[0], config.city)), 1000);
}

let newConnection = function(hue) {
    hue.getBridges()
        .then(bridges => {
            let bridge = bridges[0];

            hueConfig.bridge = bridge;

            fs.writeFileSync('./hueconfig.json', JSON.stringify(hueConfig), {encoding: 'utf8', mode: '0777', flag: 'w+'});

            return hue.auth(bridge);
        })
        .then(username => {
            hueConfig.username = username;

            fs.writeFileSync('./hueconfig.json', JSON.stringify(hueConfig), {encoding: 'utf8', mode: '0777', flag: 'w+'});
            setTimeout(() => new Goal(hue.light(config.bulbs[0], config.city)), 1000);
        })
        .catch (err => {console.log(err.stack || err);})
    ;
}
