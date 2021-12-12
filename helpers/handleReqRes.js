/**
 * Title: Handle Request Response
 * Description: Handle Request Response
 * Author: Tasnim Ahmed Auntik
 * Date: 11/12/2021
 */

// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');
const { parseJSON } = require('./utilities');

// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    // request handling
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        requestProperties.body = parseJSON(realData);

        chosenHandler(requestProperties, (statusCode, payload) => {
            let status = statusCode;
            let payloadObject = payload;
            status = typeof status === 'number' ? status : 500;
            payloadObject = typeof payloadObject === 'object' ? payloadObject : {};

            const payloadString = JSON.stringify(payloadObject);

            // return the final response
            res.setHeader('Content-type', 'application/json');
            res.writeHead(status, 'utf8', () => {});
            res.end(payloadString);
        });
    });
};

module.exports = handler;
