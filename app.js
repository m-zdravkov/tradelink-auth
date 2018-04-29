let express = require('express');
let bodyParser = require('body-parser');
let app = module.exports = express();

// Get the environment setting from the CLI
require('./helpers/environmentHelper')(app);

// Database setup
require('./helpers/databaseHelper')(app);

app.use(bodyParser.json());

// Port
app.port = process.env.port || 8082;

app.use((req, res, next) => {
    // Console logger
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Routes middleware
app.use('/', require('./router.js'));

// Start server
if(app.environment !== 'test') {
    app.listen(app.port, () => {
        console.log(`Server started on port ${app.port}...`);
    });
}