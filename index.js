/**
 * Title: Uptime Monitoring Application
 * Description: a RESTFul API to monitor up or down time of user defined links
 * Author: Tasnim Ahmed Auntik
 * Date: 11/12/2021
 */

// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
// const data = require('./lib/data');

// app object - module scaffolding
const app = {};

// create server
app.createServer = () => {
    const { handleReqRes: handleRequestResponse } = app;
    const { port } = environment;
    const server = http.createServer(handleRequestResponse);
    server.listen(port, () => {
        console.log(`listening port number ${port}`);
    });
};

// handle request response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
