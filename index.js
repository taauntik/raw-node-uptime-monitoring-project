/**
 * Title: Uptime Monitoring Application
 * Description: a RESTFul API to monitor up or down time of user defined links
 * Author: Tasnim Ahmed Auntik
 * Date: 11/12/2021
 */

// dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

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
    // request handling
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        // response handle
        res.end('Hello world');
    });
};

// start the server
app.createServer();
