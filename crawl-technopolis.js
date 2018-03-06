const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const _ = require('lodash');

const prt = require('./product-technopolis');

const {
    extractProductDetailsTech,
} = prt;

const url = 'http://www.technopolis.bg/bg//%D0%9A%D0%BE%D0%BC%D0%BF%D1%8E%D1%82%D1%80%D0%B8-%D0%B8-%D0%BF%D0%B5%D1%80%D0%B8%D1%84%D0%B5%D1%80%D0%B8%D1%8F/%D0%9C%D0%BE%D0%BD%D0%B8%D1%82%D0%BE%D1%80%D0%B8/c/P11010301?pageselect=24&page=0&q=:price-asc&text=&layout=List&sort=price-asc';

const extractPageUrls = async () => {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    // const pageLinksSelector = '.paging a';
    const totalProductsSelector = 'ol>li>label>span';
    const totalProductsCount = $(totalProductsSelector).text().trim();
    // const totalProductsCount = dom.window.document
    //     .querySelector(totalProductsSelector)
    //     .textContent
    //     .trim();
    const productsPerPage = 24;
    const totalPages = totalProductsCount / productsPerPage | 0;
    const urlCorrection = Array.from({
        length: totalPages + 1,
    }, () => 0);
    const urlStart = 'http://www.technopolis.bg/bg//%D0%9A%D0%BE%D0%BC%D0%BF%D1%8E%D1%82%D1%80%D0%B8-%D0%B8-%D0%BF%D0%B5%D1%80%D0%B8%D1%84%D0%B5%D1%80%D0%B8%D1%8F/%D0%9C%D0%BE%D0%BD%D0%B8%D1%82%D0%BE%D1%80%D0%B8/c/P11010301?pageselect=24&page=';
    const urlEnd = '&q=:price-asc&text=&layout=List&sort=price-asc';
    urlCorrection.forEach((number, index) =>
        (urlCorrection[index] = urlStart + index + urlEnd));

    // urlCorrection.map((x) => (x = urlStart + x + urlEnd));
    // http://www.technopolis.bg/bg//%D0%9A%D0%BE%D0%BC%D0%BF%D1%8E%D1%82%D1%80%D0%B8-%D0%B8-%D0%BF%D0%B5%D1%80%D0%B8%D1%84%D0%B5%D1%80%D0%B8%D1%8F/%D0%9C%D0%BE%D0%BD%D0%B8%D1%82%D0%BE%D1%80%D0%B8/c/P11010301?pageselect=24&page=
    // 0
    // &q=:price-asc&text=&layout=List&sort=price-asc

    // return [...$(pageLinksSelector)].map((link) => $(link))
    //     .map(($link) => $link.attr('href'));
    return urlCorrection;
};

const getProductUrls = async () => {
    const pageUrls = await extractPageUrls();
    const productUrlSelector = '.product-box h2 a';
    const linkStart = 'http://www.technopolis.bg';

    const productsUrls = (await Promise.all(pageUrls
            .map((pageUrl) => JSDOM.fromURL(pageUrl))))
            .map((dom) => $init(dom.window))
            .map(($) => [...$(productUrlSelector)]
                .map((htmlAnchorElement) =>
                (linkStart + $(htmlAnchorElement).attr('href'))));

    // const productsUrls = (await Promise.all(pageUrls
    //     .map((pageUrl) => JSDOM.fromURL(pageUrl))))
    //     .map((dom) => $init(dom.window))
    //     .map(($) => [...$('.product-box h2 a')]
    //         .map((link) =>
    //         (linkStart + $(link).attr('href'))));
    // return productsUrls;

    return _.chain(productsUrls)
            .flatten()
            .sortedUniq()
            .value();
};

const run = async () => {
    const productsUrls = await getProductUrls();
    // console.log(productsUrls);
    // console.log(productsUrls.length);
    // const dataToBeInDbTech = [];
    const data = await Promise.all(
        productsUrls
            .map(async (productUrl) => {
                return await extractProductDetailsTech(productUrl);
                // dataToBeInDbTech.push(productInfo);
            }));

    // console.log(dataToBeInDbTech);
    // console.log(productsUrls);
    console.log(data);
    console.log(data.length);
};

run();

// const run2 = async () => {
//     // const result = await extractProductDetailsTech('http://www.technopolis.bg/bg/Monitors/Monitor-ASUS-VG248QE/p/501170');
//     // console.log(result);
// };
// run2();
