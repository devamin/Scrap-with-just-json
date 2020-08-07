const axios = require("axios");


class Network {

    constructor(server) {
        this.server = server;

    }

    async updateOutput(output) {
        console.log("the output to update index : ", output.length - 1);
        console.log("on this server ", this.server);

        axios.post(this.server.route, output[output.length - 1])
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.error(error)
            });

    }

}

module.exports = Network;