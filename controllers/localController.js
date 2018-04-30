let passport = require('passport');
let mongoose = require('mongoose');
let Client = require('../models/Client');
let bcrypt = require('bcryptjs');
let passport = require('passport');

/**
 * Controller for local authentication strategy
 */
module.exports = () => {
    /**
     * Hashes a password.
     * @param {*} password 
     * @param {(err: Error, hash: string) => {}} callback 
     */
    let hashPassword = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                callback(err, hash);
            });
        });
    }

    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {(err: Error, client: Client) => {}} callback 
     */
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

    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {(err: Error, client: Client) => {}} callback 
     */
    let login = (email, password, callback) => {

    }

    return {
        register: register,
        test : test
    }
};