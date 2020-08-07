const rules = require("./input/ammar.json");
const scrapIt = require("./src");

scrapIt(rules, __dirname + "/output");

module.exports = scrapIt;