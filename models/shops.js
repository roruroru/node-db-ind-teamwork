'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shops = sequelize.define('Shops', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {});
  Shops.associate = function(models) {
    // associations can be defined here
  };
  return Shops;
};
