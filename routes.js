/**
 * Title: Routes
 * Description: Application Routes
 * Author: Tasnim Ahmed Auntik
 * Date: 11/12/2021
 */

// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');

const routes = {
    sample: sampleHandler,
};

module.exports = routes;
