const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const _ = require('lodash');

const prm = require('./product-most');

const {
    extractProductDetailsMost,
} = prm;

const url = 'https://most.bg/monitori/where/limit/20/p/1.html';

const extractPageUrls = async () => {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    // const pageLinksSelector = '.paging a';
    const totalProductsSelector = '.category-products>.toolbar>.sorter>.amount';
    const totalProductsCount = +$(totalProductsSelector)
        .text()
        .trim()
        .split(' ')
        .pop();

    const productsPerPage = 20;
    const totalPages = totalProductsCount / productsPerPage | 0;
    const urlCorrection = Array.from({
        length: totalPages + 1,
    }, () => 0);

    const urlStart = 'https://most.bg/monitori/where/limit/20/p/';
    const urlEnd = '.html';
    urlCorrection.forEach((number, index) =>
        (urlCorrection[index] = urlStart + (index + 1) + urlEnd));

    return urlCorrection;
};

const getProductUrls = async () => {
    const pageUrls = await extractPageUrls();
    const productUrlSelector = '.item>.product-name>a';

    const productsUrls = (await Promise.all(pageUrls
            .map((pageUrl) => JSDOM.fromURL(pageUrl))))
            .map((dom) => $init(dom.window))
            .map(($) => [...$(productUrlSelector)]
                .map((htmlAnchorElement) =>
                $(htmlAnchorElement).attr('href')));

    return _.chain(productsUrls)
            .flatten()
            .sortedUniq()
            .value();
};

const run = async () => {
    const productsUrls = await getProductUrls();
    // console.log(productsUrls);
    // console.log(productsUrls.length);

    const data = await Promise.all(
        productsUrls
            .map(async (productUrl) => {
                return await extractProductDetailsMost(productUrl);
            }));

    // console.log(data.length);
    console.log(data);
};

run();
