/**
 * Title: Token Handler
 * Description: Route Handler to handle token related routes
 * Author: Tasnim Ahmed Auntik
 * Date: 13/12/2021
 */

// dependencies
const data = require('../../lib/data');
const { hash, createRandomString, parseJSON } = require('../../helpers/utilities');

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

handler._token.post = (requestProperties, callback) => {
    const phone =
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password =
        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;
    if (phone && password) {
        data.read('users', phone, (err, userData) => {
            const user = { ...parseJSON(userData) };
            const hashedPassword = hash(password);
            if (user.password === hashedPassword) {
                const tokenId = createRandomString(20);
                const expires = Date.now() + 60 * 60 * 1000;
                const tokenObject = {
                    phone,
                    id: tokenId,
                    expires,
                };

                // store the token
                data.create('tokens', tokenId, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, tokenObject);
                    } else {
                        callback(500, {
                            error: 'There was a problem in server side',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'Password is not valid',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};

handler._token.get = (requestProperties, callback) => {
    // check the token id is valid
    const id =
        typeof requestProperties.queryStringObject.id === 'string' &&
        requestProperties.queryStringObject.id.trim().length === 20
            ? requestProperties.queryStringObject.id
            : false;
    if (id) {
        // look up the token
        data.read('tokens', id, (err, tokenObject) => {
            const token = { ...parseJSON(tokenObject) };
            if (!err && token) {
                callback(200, token);
            } else {
                callback(404, {
                    error: 'Requested token was not found',
                });
            }
        });
    } else {
        callback(404, {
            error: 'Requested token was not found',
        });
    }
};

// @TODO Authentication
handler._token.put = (requestProperties, callback) => {
    const id =
        typeof requestProperties.body.id === 'string' &&
        requestProperties.body.id.trim().length === 20
            ? requestProperties.body.id
            : false;

    const extend =
        typeof requestProperties.body.extend === 'boolean' && requestProperties.body.extend === true
            ? requestProperties.body.extend
            : false;

    if (id && extend) {
        data.read('tokens', id, (err, tokenObject) => {
            const token = parseJSON(tokenObject);
            if (token.expires > Date.now()) {
                token.expires = Date.now() * 60 * 60 * 1000;

                // store the updated token
                data.update('tokens', id, token, (err2) => {
                    if (!err2) {
                        callback(200);
                    } else {
                        callback(500, {
                            error: 'There was a server side error',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'Token already expired',
                });
            }
        });
    } else {
        callback(400, {
            error: 'There was a problem in your request',
        });
    }
};

// @TODO Authentication
handler._token.delete = (requestProperties, callback) => {};

module.exports = handler;
