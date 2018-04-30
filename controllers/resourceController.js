let mongoose = require('mongoose');

/**
 * Generic resource CRUD controller.
 * @param {mongoose.Model} Resource 
 */
module.exports = (Resource) => {
    let get = (callback, limit) => {
        Resource.find(callback).limit(limit);
    }

    let getById = (id, callback) => {
        Resource.findById(id, callback);
    }

    let add = (object, callback) => {
        Resource.create(object, callback);
    }

    let update = (id, object, options, callback) => {
        let query = {_id:id};
        Resource.findOneAndUpdate(query, object, options, callback);
    }

    let remove = (id, options, callback) => {
        Resource.findByIdAndRemove(id,options,callback);
    }

    return {
        get : get,
        getById : getById,
        add : add,
        update : update,
        remove : remove
    }
};