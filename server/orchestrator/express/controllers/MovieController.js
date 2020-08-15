const Movie = require(`../models/movie`);
const Redis = require('ioredis');
const redis = new Redis();

class MovieController {
    
    static async findAll(req, res) {
        const moviesCache = await redis.get(`movies`)
        if (moviesCache) {
            res.status(200).json(JSON.parse(moviesCache))
        } else {
            Movie.findAll()
            .then( async (result) => {
                await redis.set(`movies`, JSON.stringify(result.data))
                res.status(200).json(result.data)
            })
            .catch((err) => {
                res.status(500).json({message: err})
            })
        }
    }

    static findOne(req, res) {
        const MovieId = req.params.id
        Movie.findOne(MovieId)
        .then( async (result) => {
            res.status(200).json(result.data)
        })
        .catch((err) => {
            res.status(500).json(err.message)
        })
    }

    static insertOne(req, res) {
        const {title, overview, poster_path, popularity, tags} = req.body
        Movie.insertOne({title, overview, poster_path, popularity, tags})
        .then( async (result) => {
            const movies = await redis.get('movies')
            await redis.set(`movies`, JSON.stringify(movies.concat(result.data)))
            res.status(201).json(result.data)
        })
        .catch((err) => {
            res.status(500).json(err.message)
        })
    }

    static updateOne(req, res) {
        const {title, overview, poster_path, popularity, tags} = req.body
        const MovieId = req.params.id
        Movie.updateOne(MovieId, {title, overview, poster_path, popularity, tags})
        .then( async (result) => {
            const movies = await redis.get('movies')
            await redis.set(`movies`, JSON.stringify(movies.concat(result.data)))
            res.status(201).json(result.data)
        })
        .catch((err) => {
            res.status(500).json(err.message)
        })
    }

    static deleteOne(req, res) {
        const MovieId = req.params.id
        Movie.deleteOne(MovieId)
        .then( async (result) => {
            const movies = await redis.get('movies')
            await redis.set(`movies`, JSON.stringify(movies.concat(result.data)))
            res.status(200).json(result.data)
        })
        .catch((err) => {
            res.status(500).json(err.message)
        })
    }

}

module.exports = MovieController