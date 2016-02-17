'use strict';

let fs     = require('fs');
let color  = require('./color.js');
let config = require('./config.js')('./config.json');
let main   = require('./main.js');
let rl     = require('readline-sync');

if (!config.city) {
    console.log('Make sure you pressed the LINK button!');
    
    config.city  = rl.question("What city is your team from? eg: Toronto\n");
    config.color = rl.question("Which light color do you want in RGB?eg: 138,43,226\n");
    config.bulbs = rl.question("Which light bulb?eg: 1\n");
    config.color = color(config.color);
    config.bulbs = [config.bulbs];

    fs.writeFileSync('./config.json', JSON.stringify(config), {encoding: 'utf8', mode: '0777', flag: 'w+'});
}

main();
