const Movie = require(`../models/movie`);
const Serie = require(`../models/serie`);
const Redis = require('ioredis');
const redis = new Redis();

class EntertainMeController {
    
    static async findAll(req, res) {

        const entertainmeCache = await redis.get('entertainme')
        if (entertainmeCache) {
            res.status(200).json(JSON.parse(entertainmeCache))
        } else {
            Movie.findAll()
            .then((result) => {
                return {
                    seriesData: Serie.findAll(),
                    movies: result.data
                }
            })
            .then(async ({seriesData, movies}) => {
                const result = await seriesData
                let series = result.data
                const entertainMe = {
                    movies, series
                }
                await redis.set('entertainme', JSON.stringify(entertainMe))
                res.status(200).json(entertainMe)
            })
            .catch((err) => {
                res.status(500).json(err.message)
            })
        }
    }
}

module.exports = EntertainMeController