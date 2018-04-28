let express = require('express');
let bodyParser = require('body-parser');
let app = module.exports = express();

app.use(bodyParser.json());

// Port
app.port = process.env.port || 8082;

// Routes
app.use('/', require('./router.js'));

// Start server
app.listen(app.port, () => {
    console.log(`Server started on port ${app.port}...`);
});