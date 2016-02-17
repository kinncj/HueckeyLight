'use strict';

let fs = require('fs');

(function(){
    try {
        let stat = fs.statSync('./config.json');
    } catch (error) {
        fs.writeFileSync('./config.json', JSON.stringify({}), {encoding: 'utf8', mode: '0777', flag: 'w+'});
    }

    try {
        let stat = fs.statSync('./hueconfig.json');
    } catch (error) {
        fs.writeFileSync('./hueconfig.json', JSON.stringify({}), {encoding: 'utf8', mode: '0777', flag: 'w+'});
    }
})();

module.exports = function(configFile) {
    return JSON.parse(fs.readFileSync(configFile));
}
