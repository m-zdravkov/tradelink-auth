const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        validate: {
            validator: (value) => {
                mongoose.model('clients').count({email: value}, (err, count) => {
                    return (count == 0 && !err);
                });
            },
            message: 'Client already exists!'
        }
    },
    passwordHash: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('clients', ClientSchema);