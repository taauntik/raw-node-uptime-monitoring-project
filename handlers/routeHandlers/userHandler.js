/**
 * Title: User Handler
 * Description: Route Handler to handle user related routes
 * Author: Tasnim Ahmed Auntik
 * Date: 12/12/2021
 */

// dependencies
const data = require('../../lib/data');
const { hash, parseJSON } = require('../../helpers/utilities');
const tokenHandler = require('./tokenHandler');

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {
    const firstName =
        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =
        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

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

    const tosAgreement =
        typeof requestProperties.body.tosAgreement === 'boolean' &&
        requestProperties.body.tosAgreement
            ? requestProperties.body.tosAgreement
            : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure that the user doesn't already exists
        data.read('users', phone, (err1) => {
            if (err1) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };

                // store the user to db
                data.create('users', phone, userObject, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'User was created successfully',
                        });
                    } else {
                        callback(500, {
                            error: 'Could not create user',
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'There was a problem in server side',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};

handler._users.get = (requestProperties, callback) => {
    // check the phone number is valid
    const phone =
        typeof requestProperties.queryStringObject.phone === 'string' &&
        requestProperties.queryStringObject.phone.trim().length === 11
            ? requestProperties.queryStringObject.phone
            : false;
    if (phone) {
        // verify token
        const headerToken = requestProperties.headersObject.token;
        const token = typeof headerToken === 'string' ? headerToken : false;

        tokenHandler._token.verify(token, phone, (tokenId) => {
            if (tokenId) {
                // look up the user
                data.read('users', phone, (err, u) => {
                    const user = { ...parseJSON(u) };
                    if (!err && user) {
                        delete user.password;
                        callback(200, user);
                    } else {
                        callback(404, {
                            error: 'Requested user was not found',
                        });
                    }
                });
            } else {
                callback(403, {
                    error: 'Authentication failed!',
                });
            }
        });
    } else {
        callback(404, {
            error: 'Requested user was not found',
        });
    }
};

// @TODO Authentication
handler._users.put = (requestProperties, callback) => {
    const firstName =
        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =
        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

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

    if (phone) {
        if (firstName || lastName || password) {
            // verify token
            const headerToken = requestProperties.headersObject.token;
            const token = typeof headerToken === 'string' ? headerToken : false;

            tokenHandler._token.verify(token, phone, (tokenId) => {
                if (tokenId) {
                    // look up the user
                    data.read('users', phone, (err1, user) => {
                        const userData = { ...parseJSON(user) };
                        if (!err1 && userData) {
                            if (firstName) {
                                userData.firstName = firstName;
                            }
                            if (lastName) {
                                userData.lastName = lastName;
                            }
                            if (password) {
                                userData.password = hash(password);
                            }

                            // store to database
                            data.update('users', phone, userData, (err2) => {
                                if (!err2) {
                                    callback(200, {
                                        message: 'User was updated successfully',
                                    });
                                } else {
                                    callback(500, {
                                        error: 'There was a problem in the server side',
                                    });
                                }
                            });
                        } else {
                            callback(400, {
                                error: 'You have a problem in your request!',
                            });
                        }
                    });
                } else {
                    callback(403, {
                        error: 'Authentication failed!',
                    });
                }
            });
        } else {
            callback(400, {
                error: 'You have a problem in your request',
            });
        }
    } else {
        callback(400, {
            error: 'Invalid phone number, please try again',
        });
    }
};

// @TODO Authentication
handler._users.delete = (requestProperties, callback) => {
    // check the phone number is valid
    const phone =
        typeof requestProperties.queryStringObject.phone === 'string' &&
        requestProperties.queryStringObject.phone.trim().length === 11
            ? requestProperties.queryStringObject.phone
            : false;

    if (phone) {
        // lookup the user
        data.read('users', phone, (err1, user) => {
            if (!err1 && user) {
                data.delete('users', phone, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'User was successfully deleted',
                        });
                    } else {
                        callback(500, {
                            error: 'There was a server side error',
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'There was a server side error',
                });
            }
        });
    } else {
        callback(400, {
            error: 'There was a problem in your request',
        });
    }
};

module.exports = handler;
