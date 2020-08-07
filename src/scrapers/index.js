const puppeteer = require('puppeteer');
const Tracker = require("../tracker");
const jsdom = require("jsdom");
const Extractor = require("../extractor");
const catcher = require("../exceptions/catcher");
const {
    JSDOM
} = jsdom;

class Scrapy {

    constructor(rules, dir, network) {


        this.rules = rules;
        this.queueHelper = [];
        this.output = [];
        this.detail = {};
        this.onProcessStart = this.detail;
        this.browser;
        /*
            Restore if necessary 
            setup folders and all networks test
        */
        this.server = (network) ? {} : false;

        if (this.server) {
            this.server.route = rules.server.route;
            this.server.token = rules.server.token;
        }
        this.tracker = new Tracker(this.detail, this.output, dir, this.server);
    }

    async start() {
        this.browser = await puppeteer.launch({
            headless: false
        });
        this.scrap(this.rules);


    }

    async scrap(rules) {

        const page = await this.browser.newPage();

        await page.setViewport({
            width: 1640,
            height: 926
        });

        await page.setRequestInterception(true);

        page.on('request', (req) => {
            if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
                req.abort();
            } else {
                req.continue();
            }
        });

        // page.on('console', msg => {
        //     for (let i = 0; i < msg.args().length; ++i)
        //         console.log(`${i}: ${msg.args()[i]}`);
        // });

        await page.goto(rules.start, {
            waitUntil: 'networkidle2',
            timeout: 0
        });

        //console.log(rules);


        // wait until rendring one of used selectors 
        let selector = rules.box || rules.includes[0].selector;

        // ONLY FOR CSR WEBSITES 
        // await page.waitForSelector(selector, {
        //     timeout: 1000
        // });

        if (rules.type === "next")
            this.onProcessStart.next = this.onProcessStart.next || [];

        this.onProcessStart.start = this.onProcessStart.start || rules.start;
        this.onProcessStart.status = this.onProcessStart.status || "processing";




        const body = await page.content();

        //setup Dom document 
        const dom = new JSDOM(body);
        let document = dom.window.document;

        let data = {};
        let containDataByIndex = false;
        let extracted = {};
        let incByIndex = [];

        for (let inc of rules.includes) {
            if (inc.constraint && inc.constraint.BY_INDEX) {
                incByIndex.push(inc);
                containDataByIndex = true;
                continue;
            }
            //Usage of Extractor Class To extract and Filter Data 
            try {
                extracted = Extractor(document, inc);

                data = {
                    ...data,
                    ...extracted
                };

            } catch (err) {
                if (!catcher(err)) return;
            }
        }


        if (rules.type === "end") {
            if (rules.dataByIndex)
                data = {
                    ...data,
                    ...rules.dataByIndex
                };
            this.output.push(data);
            this.onProcessStart.status = "ok";
            this.tracker.update(1);

            return;
        }

        let boxs = document.querySelectorAll(rules.box);
        this.onProcessStart.length = boxs.length;
        let i = this.onProcessStart.tracked || 0;
        for (; i < boxs.length; i++) {

            let box = boxs[i];
            let ATag = box.querySelector(rules.link);
            const host = new URL(rules.start)
            let href = host.origin + ATag[rules.att];

            this.onProcessStart.next.push({});
            this.queueHelper.push(this.onProcessStart);
            //this.onProcessStart.tracked = i + 1; // TO REVIEW
            this.onProcessStart = this.onProcessStart.next[i];
            // this.tracker.update();
            let dataByIndex = {};
            if (containDataByIndex) {

                for (let inc of incByIndex) {

                    try {
                        extracted = Extractor(box, inc);
                        dataByIndex = {
                            ...dataByIndex,
                            ...extracted
                        }
                    } catch (err) {
                        if (!catcher(err)) return;
                    }
                }
            }

            let nextRules = rules.next;
            nextRules.start = href;
            nextRules.dataByIndex = dataByIndex;

            await this.scrap(nextRules);

            this.onProcessStart = this.queueHelper.shift();
            this.onProcessStart.tracked = i + 1;
            this.tracker.update();
            //console.log(data);
        }

        this.onProcessStart.status = "ok";
        this.tracker.update();

        console.log("finish");

        await page.close();

    }

};




module.exports = Scrapy;