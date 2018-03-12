const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

// const _ = require('lodash');

// const urlTest = 'https://most.bg/monitori/asus-25-mx259h.html';
// const urlTest = 'https://most.bg/monitori/x7r61aa-prodisplay-p223-21-5.html';
// const urlTest2 = 'https://most.bg/monitori/acer-24-5-kg251qf-bmidpx.html';
// const urlTest2 = 'https://most.bg/monitori/acer-r271bmid-ips-fhd.html';

const extractProductDetailsMost = async (url) => {
    try {
        const dom = await JSDOM.fromURL(url);
        const $ = $init(dom.window);

        const shop = 'most.bg';
        const price = +$('.price-including-tax>.price')
            .text()
            .trim()
            .split(/[\s]/)[0]
            .replace(/,/, '.');
        const title = $('.product-name>h1').html();
        const brand = title.split(' ')[1];
        const model = title.substring(9 + brand.length);
        let screenSizeInch = null;
        let resolution = null;
        let angleOfView = null;
        let reactionTime = null;
        let pixelSize = null;
        $('#product-attribute-specs-table tbody th')
            .each((_, el) => {
                const $child = $(el);
                // console.log($child.text());
                if ($child.text() === 'Размер на екрана ') {
                    screenSizeInch = +$($child)
                        .next()
                        .text()
                        .split('"')[0];
                } else if ($child.text() === 'Разделителна способност') {
                    resolution = $($child)
                        .next()
                        .text();
                } else if ($child.text() === 'Ъгъл на видимост') {
                    angleOfView = $($child)
                        .next()
                        .text();
                } else if ($child.text() === 'Време за реакция') {
                    reactionTime = +$($child)
                        .next()
                        .text()
                        .split(' ')[0];
                } else if ($child.text() === 'Размер на пиксела') {
                    pixelSize = +$($child)
                        .next()
                        .text()
                        .split(' ')[0];
                }
            });
        // console.log(selector);
        // selector.forEach((cell) => console.log(cell.text()));

        return {
            shop,
            url,
            price,
            brand,
            model,
            screenSizeInch,
            resolution,
            pixelSize,
            angleOfView,
            reactionTime,
        };
    } catch (error) {
        // console.log(error);
        // console.log(url);
        return null;
    }
};

// const run = async () => {
//     const result = await extractProductDetailsMost(urlTest);
//     console.log(result);
//     const result2 = await extractProductDetailsMost(urlTest2);
//     console.log(result2);
// };

// run();

module.exports = {
    extractProductDetailsMost,
};
