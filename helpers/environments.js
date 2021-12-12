/**
 * Title: Environments
 * Description: Handle all environment related things
 * Author: Tasnim Ahmed Auntik
 * Date: 12/12/2021
 */

// dependencies

// module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'staging234251',
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'production90234',
};

// determine which environment was passed
const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object;
const environmentToExport =
    typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

module.exports = environmentToExport;
