'use strict';

let modules = require('./config.js')('./modules.json');
let Module  = require('./Module');

class ModuleManager
{
    constructor()
    {
        this.modules = modules;
    }

    get(name)
    {
        return this.modules[name];
    }

    all()
    {
        return this.modules;
    }

    execute(data)
    {
        Object.keys(this.modules).forEach(function(index){
            let module = require('../modules/' + this.modules[index].module);

            if (module instanceof Module) {
                module.execute(data || {}, this.modules[index].config || {});
            }
        }.bind(this));
    }
}

module.exports = new ModuleManager();