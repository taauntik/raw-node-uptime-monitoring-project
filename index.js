/**
 * Title: Uptime Monitoring Application
 * Description: a RESTFul API to monitor up or down time of user defined links
 * Author: Tasnim Ahmed Auntik
 * Date: 11/12/2021
 */

// dependencies
const http = require('http');
const { ppid } = require('process');

// app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 5000,
};

// create server
app.createServer = () => {
    const { config, handleReqRes } = app;
    const { port } = config;
    const server = http.createServer(handleReqRes);
    server.listen(port, () => {
        console.log(`listening port number ${port}`);
    });
};

// handle request response
app.handleReqRes = (req, res) => {
    // response handle
    res.end('Hello world');
};

// start the server
app.createServer();
