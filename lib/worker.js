/**
 * Title: Workers Library
 * Description: Workers related files
 * Author: Tasnim Ahmed Auntik
 * Date: 14/12/2021
 */

// dependencies
const data = require('./data');

// worker object - module scaffolding
const worker = {};

// timer to execute the worker process once per minute
worker.loop = () => {
    setInterval(() => {
        worker.gatherAllChecks();
    }, 1000 * 60);
};

// look up all the checks from database
worker.gatherAllChecks = () => {
    // get all the checks
};

// start the worker
worker.init = () => {
    // execute all the checks
    worker.gatherAllChecks();

    // call the loop so that the checks continue
    worker.loop();
};
// export the worker module
module.exports = worker;
