/**
 * Title: Sever Library
 * Description: Sever related files
 * Author: Tasnim Ahmed Auntik
 * Date: 14/12/2021
 */

// dependencies
const http = require('http');
const { handleReqRes } = require('../helpers/handleReqRes');
const environment = require('../helpers/environments');

// worker object - module scaffolding
const server = {};

// create server
server.createServer = () => {
    const { handleReqRes: handleRequestResponse } = server;
    const { port } = environment;
    const createSeverVariable = http.createServer(handleRequestResponse);
    createSeverVariable.listen(port, () => {
        console.log(`listening port number ${port}`);
    });
};

// handle request response
server.handleReqRes = handleReqRes;

// start the server
server.init = () => {
    server.createServer();
};

// export the server module
module.exports = server;
