'use strict';
module.exports = (sequelize, DataTypes) => {
  const ScreenSize = sequelize.define('ScreenSize', {
    name: {
      type: DataTypes.FLOAT,
      unique: true,
      allowNull: false,
    },
  }, {});
  ScreenSize.associate = (models) => {
    // associations can be defined here
  };
  return ScreenSize;
};
