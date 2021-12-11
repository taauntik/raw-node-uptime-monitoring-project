/**
 * Title: Uptime Monitoring Application
 * Description: a RESTFul API to monitor up or down time of user defined links
 * Author: Tasnim Ahmed Auntik
 * Date: 11/12/2021
 */

// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');

// app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 5000,
};

// create server
app.createServer = () => {
    const { config, handleReqRes: handleRequestResponse } = app;
    const { port } = config;
    const server = http.createServer(handleRequestResponse);
    server.listen(port, () => {
        console.log(`listening port number ${port}`);
    });
};

// handle request response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
