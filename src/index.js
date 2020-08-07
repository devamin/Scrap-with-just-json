const checker = require("./checker");
const Scrapy = require("./scrapers");


const domManager = "pupeteer";

function scrapIt(rules, outputDir, Network, domEngine) {
    let scrapy = new Scrapy(rules, outputDir, Network);
    scrapy.start();
}

//scarpIt(rules, __dirname + "/../output");

module.exports = scrapIt;