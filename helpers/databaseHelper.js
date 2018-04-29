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
        if(err) {
            console.log(err);
            throw err;
        }

        let dbConfig = JSON.parse(data);
        let dbSetting = undefined;

        switch(app.environment) {
            default:
            case 'dev':
                dbSetting = dbConfig.dbDev;
                break;
            case 'test':
                dbSetting = dbConfig.dbTest;
                break;
        }

        if(dbSetting.engine === 'mongo') {
            mongoose.connect(dbSetting.url)
            .then(() => console.log(`MongoDB connected @ ${dbSetting.url} ...`))
            .catch(err => console.log(err));

            app.dbConnection = mongoose.connection;
        }else
            throw new Error(`Unsupported database engine: ${dbSetting.engine}`);
    });
};