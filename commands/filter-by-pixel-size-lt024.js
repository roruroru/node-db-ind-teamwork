const {
    AllInOne,
} = require('../models');


const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const filterByPixelSize = async (pixelSize) => {
    const filteredTable =
        await AllInOne.findAll({
            where: {
                pixelSize: {
                    [Op.lt]: pixelSize,
                },
            },
        });

    filteredTable.map((result) =>
        console.log(`brand: ${result.brand} | model: ${result.model} | pixelSize: ${result.pixelSize}`));
};

filterByPixelSize(0.24);

module.exports = {
    filterByPixelSize,
};
