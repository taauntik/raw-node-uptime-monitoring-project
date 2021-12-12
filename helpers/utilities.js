/**
 * Title: Utilities
 * Description: Important utility functions
 * Author: Tasnim Ahmed Auntik
 * Date: 12/12/2021
 */

// dependencies
const { createHmac } = require('crypto');
const environments = require('./environments');

// module scaffolding
const utilities = {};

// parse JSON string to object
utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch (error) {
        output = {};
    }

    return output;
};

// hash string
utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const hash = createHmac('sha256', environments.secretKey)
            .update('I love cupcakes')
            .digest('hex');

        return hash;
    }
    return false;
};

module.exports = utilities;
