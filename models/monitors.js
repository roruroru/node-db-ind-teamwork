'use strict';
module.exports = (sequelize, DataTypes) => {
  const Monitors = sequelize.define('Monitors', {
    model: DataTypes.STRING,
    price: DataTypes.FLOAT,
    resolution: DataTypes.STRING,
    angleOfView: DataTypes.STRING,
    pixelSize: DataTypes.FLOAT,
    reactionTime: DataTypes.FLOAT,
    website: DataTypes.STRING,
  }, {});
  Monitors.associate = (models) => {
    const {
      Brand,
      ScreenSize,
      Shops,
    } = models;

    // Monitors.belongsTo(Brand);
    // Monitors.belongsTo(ScreenSize);
    // Monitors.belongsTo(Shops);
    Brand.hasMany(Monitors);
    ScreenSize.hasMany(Monitors);
    Shops.hasMany(Monitors);
  };
  return Monitors;
};
