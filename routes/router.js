let express = require('express');
let router = express.Router();
let Client = require('../models/Client');
let crudRouter = require('./crudRouter.js')(Client);
let localController = require('../controllers/localController')();
// let passport = require('passport');

// Erroneous routes
router.get('/', (req, res) => {
    res.status(404)
       .send("Available routes: /auth and /register + ?method= (google,facebook, or local/no parameter).");
});

router.use('/clients', crudRouter);

router.get('/login', (req, res) => {
    res.status(405)
        .send({"errmsg": "Can not GET on /login. Use POST."});
});

router.get('/register', (req, res) => {
    res.status(405)
        .send({"errmsg": "Can not GET on /register. Use POST."});
});

// For dev purposes
let notImplemented = (res) => {
    let msg = "Login method not implemented yet.";
    res.status(501).send({"errmsg" : msg});
    console.log(msg);
    throw msg;
}

router.post('/login', (req, res) => {
    switch(req.query.method) {
        default:
        case "local":
            local.login(req.email, req.password, next);    
            notImplemented(res);
            break;
        case "google":
            //google.login(req.email, req.password);
            notImplemented(res);
            break;
        case "facebook":
            //facebook.login(req.email, req.password);
            notImplemented(res);
            break;
    }
});

router.post('/register', (req, res) => {
    switch(req.query.method) {
        default:
        case "local":
            localController.register(req.body.email, req.body.password, (err, client) => {
                if(err != null) {
                    if(err.code == 11000) {
                        res.status(403).send(
                            {
                                "errmsg": "Duplicate email not allowed.",
                                "client": {"email": req.body.email}
                            });
                    } else
                        res.status(500).send(err);
                }else
                    res.status(201).send(client);
            });
            break;
        case "google":
            res.status(404).send({"errormsg": "You can't create a google account from our services."});
            break;
        case "facebook":
            res.status(404).send({"errormsg": "You can't create a facebook account from our services."});
            break;
    }
});

module.exports = router;