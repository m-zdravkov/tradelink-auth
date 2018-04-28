/**
 * Sets the environment of the Express application (custom property)
 * @param {Express} app 
 */
module.exports = (app) => {
    app.environment = 'dev'; // Assume 'dev' by default

    if( process.env.env !== '' &&
        process.env.env !== 'undefined')
            app.environment = process.env.env;

    console.log(`App running in '${app.environment}' environment.`);
};