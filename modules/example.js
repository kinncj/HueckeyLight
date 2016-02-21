'use strict';

let Module = require('./../src/Module.js');

class Example extends Module
{
    execute(data, config)
    {
        console.log('SCORE:', data);
    }
}

module.exports = new Example();
