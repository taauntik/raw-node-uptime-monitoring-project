/**
 * Title: Workers Library
 * Description: Workers related files
 * Author: Tasnim Ahmed Auntik
 * Date: 14/12/2021
 */

// worker object - module scaffolding
const worker = {};

// start the worker
worker.init = () => {
    console.log('workers started');
};

// export the worker module
module.exports = worker;
