const {
    AllInOne,
} = require('../models');


const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const filterByPrice = async (price) => {
    const filteredTable =
        await AllInOne.findAll({
            where: {
                price: {
                    [Op.gt]: price,
                },
            },
        });

    filteredTable.map((result) =>
        console.log(`brand: ${result.brand} | model: ${result.model} | price: ${result.price}`));
};

filterByPrice(500);

module.exports = {
    filterByPrice,
};
