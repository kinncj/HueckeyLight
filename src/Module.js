'use strict';

class Module
{
    execute(data, config)
    {
        throw new ModuleException("Method execute must be implemented.");
    }
}

class ModuleException
{
    constructor(message)
    {
        this.name    = "Module Exception";
        this.message = message;
    }
}

module.exports = Module;