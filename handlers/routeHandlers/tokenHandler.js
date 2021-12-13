/**
 * Title: Token Handler
 * Description: Route Handler to handle token related routes
 * Author: Tasnim Ahmed Auntik
 * Date: 13/12/2021
 */

// dependencies
const data = require('../../lib/data');
// const { hash, parseJSON } = require('../../helpers/utilities');

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._token = {};

handler._token.post = (requestProperties, callback) => {};

handler._token.get = (requestProperties, callback) => {};

// @TODO Authentication
handler._token.put = (requestProperties, callback) => {};

// @TODO Authentication
handler._token.delete = (requestProperties, callback) => {};

module.exports = handler;
