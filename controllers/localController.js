let passport = require('passport');
let mongoose = require('mongoose');
let Client = require('../models/Client');
let bcrypt = require('bcryptjs');

/**
 * Controller for local authentication strategy
 */
module.exports = () => {
    /**
     * 
     * @param {*} password 
     * @param {*} callback 
     */
    let hashPassword = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                callback(err, hash);
            });
        });
    }

    let register = (email, password, callback) => {
        hashPassword(password, (err, hash) => {
            /**
             * @type {Client}
             */
            let client = new Client({
                email: email,
                passwordHash: hash
            });

            client.save()
                .then(newClient => {
                    callback(null, newClient);
                })
                .catch(err => {
                    callback(err, null);
                });
        });
    }

    let login = () => {

    }

    let test = (txt, callback) => {
        return callback(txt+" works");
    }

    return {
        register: register,
        test : test
    }
};