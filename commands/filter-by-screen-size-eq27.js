const {
    AllInOne,
} = require('../models');

// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

const filterByScreenSize = async (screenSize) => {
    const filteredTable =
        await AllInOne.findAll({
            where: {
                screenSize: screenSize,
            },
        });

    filteredTable.map((result) =>
        console.log(`brand: ${result.brand} | model: ${result.model} | screenSize: ${result.screenSize}`));
};

filterByScreenSize(27);

module.exports = {
    filterByScreenSize,
};
