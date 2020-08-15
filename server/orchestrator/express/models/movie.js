const axios = require(`axios`);
const movieUrl = 'http://localhost:3001/movies'

class Movie {
    static findAll() {
        return axios.get(movieUrl)
    }

    static findOne(id) {
        return axios.get(`${movieUrl}/${id}`)
    }

    static insertOne(newMovie) {
        return axios.post(movieUrl, newMovie)
    }

    static updateOne(id, updateMovie) {
        return axios.put(`${movieUrl}/${id}`, updateMovie)
    }

    static deleteOne(id) {
        return axios.delete(`${movieUrl}/${id}`)
    }   
}

module.exports = Movie