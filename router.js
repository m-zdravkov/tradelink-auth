let express = require('express');
let router = express.Router();
let localController = require('./controllers/localController')();

// Erroneous routes
router.get('/', (req, res) => {
    res.status(404)
       .send("Available routes: /auth and /register + ?method= (google,facebook, or local/no parameter).");
});

router.get('/login', (req, res) => {
    res.status(405)
        .send("Can not GET on /login. Use POST.");
});

router.get('/register', (req, res) => {
    res.status(405)
        .send("Can not GET on /register. Use POST.");
});

// For dev purposes
let notImplemented = (res) => {
    let msg = "Login method not implemented yet.";
    res.status(501).send({"errors" : {"text" : msg}});
    console.log(msg);
    throw msg;
}

router.post('/login', (req, res) => {
    switch(req.query.method) {
        default:
        case "local":
            //local.login(req.email, req.password);    
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
                if(err != null)
                    res.status(500).send(err);
                else
                    res.status(201).send(client);
            });
                // .then(res.status(201))
                // .catch(err => {
                //     res.status(403, {"errors": {"text" : "Could not register, got error message: "+err}});
                // });
            break;
        case "google":
            res.status(404).send("You can't create a google account here.");
            break;
        case "facebook":
            res.status(404).send("You can't create a facebook account here.");
            break;
    }
});

module.exports = router;