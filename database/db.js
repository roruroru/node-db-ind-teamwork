const {
    Brand,
    Monitors,
    ScreenSize,
    Shops,
    AllInOne,
} = require('../models');


const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const emptyTableRows = async () => {
    await AllInOne.destroy({
        truncate: {
            cascade: true,
        },
    });
    await Brand.destroy({
        truncate: {
            cascade: true,
        },
    });
    await Monitors.destroy({
        truncate: {
            cascade: true,
        },
    });
    await Shops.destroy({
        truncate: {
            cascade: true,
        },
    });
    await ScreenSize.destroy({
        truncate: {
            cascade: true,
        },
    });
};

const addDataToDB = async (obj) => {
    try {
        // const brand = (await Brand.create({
        //     name: obj.brand,
        // }));

        // const screenSize = (await ScreenSize.create({
        //     name: obj.screenSizeInch,
        // }));

        // const shops = (await Shops.create({
        //     name: obj.shop,
        // }));

        // const monitors = (await Monitors.create({
        //     model: obj.model,
        //     price: obj.price,
        //     resolution: obj.resolution,
        //     angleOfView: obj.angleOfView,
        //     pixelSize: obj.pixelSize,
        //     reactionTime: obj.reactionTime,
        //     website: obj.url,
        //     BrandId: brand.id,
        //     ScreenSizeId: screenSize.id,
        //     ShopId: shops.id,
        // }));

        const allInOne = (await AllInOne.create({
            brand: obj.brand,
            model: obj.model,
            price: obj.price,
            screenSize: obj.screenSizeInch,
            resolution: obj.resolution,
            angleOfView: obj.angleOfView,
            pixelSize: obj.pixelSize,
            reactionTime: obj.reactionTime,
            website: obj.url,
            shop: obj.shop,
        }));
    } catch (error) {
        // console.log('Failed add! ' + obj.url);
        // console.log(error);
    }
};

const getObjFromList = async (objList) => {
    await Promise.all(objList.map((obj) => {
        const result = addDataToDB(obj);
        return result;
    }));
};

module.exports = {
    addDataToDB,
    getObjFromList,
    emptyTableRows,
};
