const Serie = require(`../models/serie`);
const Redis = require('ioredis');
const redis = new Redis();

class SerieController {
    
    static async findAll(req, res) {
        const seriesCache = await redis.get(`series`)
        if (seriesCache) {
            res.status(200).json(JSON.parse(seriesCache))
        } else {
            Serie.findAll()
            .then( async (result) => {
                await redis.set(`series`, JSON.stringify(result.data))
                res.status(200).json(result.data)
            })
            .catch((err) => {
                res.status(500).json(err.message)
            })
        }
    }

    static findOne(req, res) {
        const SerieId = req.params.id 
        Serie.findOne(SerieId)
        .then((result) => {
            res.status(200).json(result.data)
        })
        .catch((err) => {
            res.status(500).json(err.message)
        })
    }

    static insertOne(req, res) {
        const {title, overview, poster_path, popularity, tags} = req.body
        Serie.insertOne({title, overview, poster_path, popularity, tags})
        .then( async (result) => {
            await redis.del('series')
            res.status(200).json(result.data)
        })
        .catch((err) => {
            res.status(500).json(err.message)
        })
    }

    static updateOne(req, res) {
        const {title, overview, poster_path, popularity, tags} = req.body
        const SerieId = req.params.id
        Serie.updateOne(SerieId, {title, overview, poster_path, popularity, tags})
        .then( async (result) => {
            await redis.del('series')
            res.status(200).json(result.data)
        })
        .catch((err) => {
            res.status(500).json(err.message)
        })
    }

    static deleteOne(req, res) {
        const SerieId = req.params.id
        Serie.deleteOne(SerieId)
        .then( async (result) => {
            await redis.del('series')
            res.status(200).json(result.data)
        })
        .catch((err) => {
            res.status(500).json(err.message)
        })
    }

}

module.exports = SerieController