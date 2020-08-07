const rules = require("./input/arrayOfProducts.json");
const scrapIt = require("./src");

scrapIt(rules, __dirname + "/output");

module.exports = scrapIt;