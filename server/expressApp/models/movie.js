const db = require(`../config`);
const Movie = db.collection(`movies`);
const { ObjectID } = require('mongodb');
  
class MovieModel {

    static findAll() {
        return Movie.find().toArray();
    }

    static findOne (id) {
        return Movie.findOne({ _id: ObjectID(id) })
    }

    static insertOne(newMovie) {
        return Movie.insertOne(newMovie)
    }

    static updateOne(id, updateMovie) {
        return Movie.updateOne({ _id: ObjectID(id) }, {$set: updateMovie})
    }

    static deleteOne(id) {
        return Movie.deleteOne({ _id: ObjectID(id) })
    }
}

module.exports = MovieModel