const path = require("path");
const fs = require("fs");
const rootDir = require('app-root-path').path;

class File {

    constructor(directory = path.join(rootDir, "output")) {
        this.directory = directory;
        this.detailFile = "detail.json";
        this.outputFile = "output.json";
        this.getReady();
    }

    getReady() {
        if (!fs.existsSync(this.directory))
            try {
                fs.mkdirSync(this.directory);
            } catch (err) {
                console.log("We do not have permession to write in this directory");
            }

    }

    readOutputState() {
        try {
            let outputState = fs.readFileSync(path.join(this.directory, this.outputFile));
            return JSON.parse(outputState);
        } catch (err) {
            console.warn("output file doesn't exist");
            return false;
        }
    }

    readDetailState() {
        try {
            let detailState = fs.readFileSync(path.join(this.directory, this.detailFile));
            return JSON.parse(detailState);
        } catch (err) {
            console.warn("detail file doesn't exist");
            return false;
        }
    }

    updateDetail(detail) {
        try {
            fs.writeFileSync(path.join(this.directory, this.detailFile), JSON.stringify(detail));
        } catch (err) {
            console.log(err)
            return
        }
    }

    updateOutput(output) {
        try {
            fs.writeFileSync(path.join(this.directory, this.outputFile), JSON.stringify(output));
        } catch (err) {
            console.log(err)
            return
        }
    }

}

module.exports = File;