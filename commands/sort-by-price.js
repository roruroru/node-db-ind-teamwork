const {
    AllInOne,
} = require('../models');


// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

const sortByPrice = async () => {
    const sortedTable =
        await AllInOne.findAll({
            order: [
                ['price', 'ASC'],
            ],
        });

    sortedTable.map((result) =>
    console.log(`brand: ${result.brand} | model: ${result.model} | price: ${result.price}`));
};

sortByPrice();

module.exports = {
    sortByPrice,
};
