const db = require('./database/db');

const crawlTechnopolis = require('./crawl-technopolis');

const crawlMost = require('./crawl-most');

const run = async () => {
    await db.emptyTableRows();
    await crawlMost.runMost();
    await crawlTechnopolis.runTechnopolis();
};

run();
