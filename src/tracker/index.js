const FileOutput = require("../output").file;
const Network = require("../output").network;


class Tracker {

    constructor(detail, output, dir = null, server = null) {
        this.outputUpdateMethods = [];
        this.detail = detail;
        this.output = output;
        let localOutputUpdate = 1;
        if (!server && dir) {
            console.log("from !network && dir", server, dir);
            this.file = (typeof dir === "string") ? new FileOutput(dir) : new FileOutput();
            this.outputUpdateMethods.push(this.file.updateOutput.bind(this.file));
        } else if (server && !dir) {
            console.log("from else of  !network && dir", server, dir);
            this.remote = new Network(server);
            this.outputUpdateMethods.push(this.remote.updateOutput.bind(this.remote));
            this.file = new FileOutput();
            localOutputUpdate = 0;
        }
        if (!dir && !server) {
            console.log("default setting !network && !dir", server, dir);
            this.file = new FileOutput();
            this.outputUpdateMethods.push(this.file.updateOutput.bind(this.file));
        } else if (dir && server) {
            console.log("both network && dir", server, dir);
            this.file = (typeof dir === "string") ? new FileOutput(dir) : new FileOutput();
            this.outputUpdateMethods.push(this.file.updateOutput.bind(this.file));
            this.remote = new Network(server);
            this.outputUpdateMethods.push(this.remote.updateOutput.bind(this.remote));
        }


        this.detailUpdate = this.file.updateDetail.bind(this.file);

        this.restoreState(localOutputUpdate);
    }

    restoreState(localOutput = 0) {
        let detail = this.file.readDetailState();
        this.detail = Object.assign(this.detail, detail);
        if (localOutput) {
            let output = this.file.readOutputState();
            this.output = Object.assign(this.output, output);
        }
    }

    update(upOutput = 0) {
        this.detailUpdate(this.detail);
        if (upOutput)
            for (let updater of this.outputUpdateMethods)
                updater(this.output);
    }




}

module.exports = Tracker;