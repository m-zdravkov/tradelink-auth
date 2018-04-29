let mongoose = require('mongoose');
let fs = require('fs');

/**
 * Sets up the db connection of our application.
 * Requires app.environment from environmentHelper.
 * @param {Express} app 
 */
module.exports = (app) => {
    // Connect to a mongoose database, depending on environment
    
    fs.readFile('./config/dbconfig.json', (err, data) => {
        if(err)
            return console.log(err);

        let dbConfig = JSON.parse(data);
        let dbUrl = '';

        switch(app.environment) {
            default:
            case 'dev': dbUrl = dbConfig.dbDev.url; break;
            case 'test': dbUrl = dbConfig.dbTest.url; break;
        }

        mongoose.connect(dbUrl)
        .then(() => console.log(`MongoDB connected @ ${dbUrl} ...`))
        .catch(err => console.log(err));

        app.dbConnection = mongoose.connection;
    });
};