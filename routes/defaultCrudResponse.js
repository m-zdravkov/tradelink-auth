let express = require('express');
let router = express.Router();

module.exports = () => {
    /**
     * Sends a json response, throws error
     * @param {Response} res - The response object
     * @param {*} err 
     * @param {*} data 
     */
    let json = (res, err, data) => {
        if(err) {
            throw err;
        }
        res.json(data);
    }

    let jsonOk = (res) => {
        res.json({"response":"OK"});
    }

    return {
        json : json,
        jsonOk : jsonOk,
    }
}