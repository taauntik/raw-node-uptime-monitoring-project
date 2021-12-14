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
    twilio: {
        fromPhone: '+16175551212',
        accountSid: 'ACa538c21d56083860d2a7dbe4f24526ea',
        authToken: 'c545559e6abe698319c06222458eeb70',
    },
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'production90234',
    twilio: {
        fromPhone: '+16175551212',
        accountSid: 'ACa538c21d56083860d2a7dbe4f24526ea',
        authToken: 'c545559e6abe698319c06222458eeb70',
    },
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
