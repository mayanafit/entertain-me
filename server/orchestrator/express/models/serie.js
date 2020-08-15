const axios = require(`axios`);
const serieUrl = 'http://localhost:3002/series'

class Serie {
    static findAll() {
        return axios.get(serieUrl)
    }

    static findOne(id) {
        return axios.get(`${serieUrl}/${id}`)
    }

    static insertOne(newSerie) {
        return axios.post(serieUrl, newSerie)
    }

    static updateOne(id, updateSerie) {
        return axios.put(`${serieUrl}/${id}`, updateSerie)
    }

    static deleteOne(id) {
        return axios.delete(`${serieUrl}/${id}`)
    }
}

module.exports = Serie