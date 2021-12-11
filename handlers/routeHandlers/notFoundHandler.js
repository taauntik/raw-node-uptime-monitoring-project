/**
 * Title: Not Found Handler
 * Description: 404 Not Fond Handler
 * Author: Tasnim Ahmed Auntik
 * Date: 11/12/2021
 */

const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(404, {
        message: 'Your requested URL was not found!',
    });
};

module.exports = handler;
