'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "monitors"
 * createTable "Monitors", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2018-03-12T06:52:45.017Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "dropTable",
        params: ["monitors"]
    },
    {
        fn: "createTable",
        params: [
            "Monitors",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "model": {
                    "type": Sequelize.STRING
                },
                "price": {
                    "type": Sequelize.FLOAT
                },
                "resolution": {
                    "type": Sequelize.STRING
                },
                "angleOfView": {
                    "type": Sequelize.STRING
                },
                "pixelSize": {
                    "type": Sequelize.FLOAT
                },
                "reactionTime": {
                    "type": Sequelize.FLOAT
                },
                "website": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
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
