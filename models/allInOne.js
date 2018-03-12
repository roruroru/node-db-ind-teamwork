'use strict';
module.exports = (sequelize, DataTypes) => {
    const AllInOne = sequelize.define('AllInOne', {
        brand: DataTypes.STRING,
        model: DataTypes.STRING,
        price: DataTypes.FLOAT,
        screenSize: DataTypes.FLOAT,
        resolution: DataTypes.STRING,
        angleOfView: DataTypes.STRING,
        pixelSize: DataTypes.FLOAT,
        reactionTime: DataTypes.FLOAT,
        website: DataTypes.STRING,
        shop: DataTypes.STRING,
    }, {});
    AllInOne.associate = (models) => {

    };
    return AllInOne;
};
