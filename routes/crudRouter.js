let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let defaultCrudResponse = require('./defaultCrudResponse')();
let requireUncached = require('require-uncached');

// At /api/resource

/**
 * 
 * @param {mongoose.Model} Resource 
 */
module.exports = (Resource) => {
    let resourceController = requireUncached('../controllers/resourceController')(Resource);

    // GET Resource
    router.get('/', (req, res) => {
        resourceController.get((err, data) => {
            defaultCrudResponse.json(res, err, data)
        });
    });

    // GET ResourceById
    router.get('/:_id', (req, res) => {
        resourceController.getById(req.params._id, (err, data) => {
            defaultCrudResponse.json(res, err, data)
        });
    });

    // POST Resource
    router.post('/', (req, res) => {
        let data = req.body;
        resourceController.add(data, (err, data) => {
            defaultCrudResponse.json(res, err, data)
        });
    })

    // PUT Resource
    router.put('/:_id', (req, res) => {
        let id = req.params._id;
        let data = req.body;
        resourceController.update(id, data, {}, (err, data) => {
            defaultCrudResponse.json(res, err, data)
        });
    });

    // DELETE Resource
    router.delete('/:_id', (req, res) => {
        let id = req.params._id;
        resourceController.remove(id, {}, (err, id) => {
            defaultCrudResponse.json(res, err, id)
        });
    })

    return router;
}