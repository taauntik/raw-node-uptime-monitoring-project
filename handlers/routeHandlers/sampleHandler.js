/**
 * Title: Sample Handler
 * Description: Sample Handler
 * Author: Tasnim Ahmed Auntik
 * Date: 11/12/2021
 */

// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, {
        message: 'This is a sample url',
    });
};

module.exports = handler;
