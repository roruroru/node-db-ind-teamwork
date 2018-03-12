'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "ShopId" from table "Monitors"
 * removeColumn "ScreenSizeId" from table "Monitors"
 *
 **/

var info = {
    "revision": 6,
    "name": "noname",
    "created": "2018-03-12T11:10:08.305Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Monitors", "ShopId"]
    },
    {
        fn: "removeColumn",
        params: ["Monitors", "ScreenSizeId"]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
