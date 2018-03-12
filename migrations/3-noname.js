'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "BrandId" to table "Monitors"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2018-03-12T06:53:47.347Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Monitors",
        "BrandId",
        {
            "type": Sequelize.INTEGER,
            "onUpdate": "CASCADE",
            "onDelete": "SET NULL",
            "references": {
                "model": "Brands",
                "key": "id"
            },
            "allowNull": true
        }
    ]
}];

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
