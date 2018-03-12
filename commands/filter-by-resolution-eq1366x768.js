const {
    AllInOne,
} = require('../models');

// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

const filterByResolution = async (resolution) => {
    const filteredTable =
        await AllInOne.findAll({
            where: {
                resolution: resolution,
            },
        });

    filteredTable.map((result) =>
        console.log(`brand: ${result.brand} | model: ${result.model} | resolution: ${result.resolution}`));
};

filterByResolution('1366x768');

module.exports = {
    filterByResolution,
};
