const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

// const _ = require('lodash');

const urlTest = 'http://www.technopolis.bg/bg/Monitors/Monitor-DELL-P2416D/p/512852';

const extractProductDetailsTech = async (url) => {
    try {
        const dom = await JSDOM.fromURL(url);
        const $ = $init(dom.window);

        const price = +$('.price>.priceValue').text();
        const brand =
            $('.table-characteristics tbody tr:nth-child(1) td:nth-child(2)')
            .html();
        const model =
            $('.table-characteristics tbody tr:nth-child(2) td:nth-child(2)')
            .html();
        const screenSizeInch =
            $('.table-characteristics tbody tr:nth-child(4) td:nth-child(2)')
            .html()
            .split(' ')
            .map(Number)[0];
        const resolution =
            $('.table-characteristics tbody tr:nth-child(6) td:nth-child(2)')
            .html()
            .split(' ')[0];
        const pixelSize =
            $('.table-characteristics tbody tr:nth-child(7) td:nth-child(2)')
            .html()
            .split(' ')
            .map(Number)[0];
        const angleOfView =
            $('.table-characteristics tbody tr:nth-child(10) td:nth-child(2)')
            .html();
        const reactionTime =
            $('.table-characteristics tbody tr:nth-child(11) td:nth-child(2)')
            .html()
            .split(' ')
            .map(Number)[0];
        // const interfacePorts =
        //     $('.table-characteristics tbody tr:nth-child(12) td:nth-child(2)')
        //     .html();
        // const weight =
        //     $('.table-characteristics tbody tr:nth-child(16) td:nth-child(2)')
        //     .html()
        //     .split(' ')
        //     .map(Number)[0];
        // const size =
        //     $('.table-characteristics tbody tr:nth-child(17) td:nth-child(2)')
        //     .html()
        //     .split(' ')[0];
        // const warranty =
        //     $('.table-characteristics tbody tr:nth-child(19) td:nth-child(2)')
        //     .html()
        //     .split(' ')
        //     .map(Number)[0];

        return {
            price,
            brand,
            model,
            screenSizeInch,
            resolution,
            pixelSize,
            angleOfView,
            reactionTime,
            // interfacePorts,
            // weight,
            // size,
            // warranty,
        };
    } catch (error) {
        console.log(error);
        console.log(url);
        return null;
    }
};

// const run = async () => {
//     const result = await extractProductDetailsTech(urlTest);
//     console.log(result);
// };

// run();

module.exports = {
    extractProductDetailsTech,
};
