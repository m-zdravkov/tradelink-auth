let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.status(404)
       .send({"errors" : {"text" : "Available routes: /auth and /register"}});
});

module.exports = router;