const Movie = require(`../models/movie`);

class MovieController {
    static async findAll (req, res) {
        try {
            const movies = await Movie.findAll();
            res.status(200).json(movies)
        } catch(err) {
            res.status(500).json({message: err})
        }
    }

    static async findOne (req, res) {
        const MovieId = req.params.id
        try {
            const movie = await Movie.findOne(MovieId)
            if (!movie) {
                res.status(404).json({message: 'cant find the data'})
            } else {
                res.status(200).json(movie)
            }
        } catch(err) {
            res.status(500).json({message: err})
        }
    }

    static async insertOne (req, res) {
        const tags = req.body.tags.split(`,`)
        const newMovie = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: +req.body.popularity,
            tags,
        }
        try {
            const result = await Movie.insertOne(newMovie)
            res.status(201).json(result.ops[0])
        } catch(err) {
            res.status(500).json({message: err})
        }
    }

    static async updateOne (req, res) {
        const MovieId = req.params.id
        const tags = req.body.tags.split(`,`)
        const updateMovie = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: +req.body.popularity,
            tags,
        }
        try {
            const result = await Movie.updateOne(MovieId, updateMovie)
            if (result.matchedCount === 1) {
                res.status(200).json(result)
            } else {
                res.status(404).json({message: 'cant find the data'})
            }
        } catch(err) {
            res.status(500).json({message: err})
        }
    }


    static async deleteOne (req, res) {
        const MovieId = req.params.id
        try {
            const result = await Movie.deleteOne(MovieId)
            if (result.deletedCount === 1) {
                res.status(200).json(result)
            } else {
                res.status(404).json({message: 'cant find the data'})
            }
        } catch(err) {
            res.status(500).json({message: err})
        }
    }
}


module.exports = MovieController