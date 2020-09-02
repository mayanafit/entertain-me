const { gql } = require(`apollo-server`);
const axios = require(`axios`);
const Redis = require('ioredis');
const redis = new Redis();

const typeDefs = gql`
    type Serie {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
        type: String
    }

    extend type Query {
        series: [Serie]
        serie(id: ID): Serie
    }

    input SerieInput {
        title: String!
        overview: String!
        poster_path: String!
        popularity: Float!
        tags: String!
    }

    extend type Mutation {
        addSerie(serie: SerieInput): Serie
        updateSerie(id: ID, serie: SerieInput): Message
        deleteSerie(id: ID): Message
    }
`;

const serieUrl = 'http://localhost:4002/series';

const resolvers = {
    Query: {
        series: async () => {
            try {
                const seriesCache = await redis.get(`series`)
                if (seriesCache) return JSON.parse(seriesCache)
                const series = await axios.get(serieUrl);
                await redis.set(`series`, JSON.stringify(series.data))
                return series.data
            } catch(err) {
                return err
            }
        },
        serie: async (parent, args, context, info) => {
            try {
                const id = args.id
                const serieCache = await redis.get(`serie${id}`)
                if (serieCache) return JSON.parse(serieCache)
                const result = await axios.get(`${serieUrl}/${id}`)
                await redis.set(`serie${id}`, JSON.stringify(result.data))
                return result.data
            } catch(err) {
                return err
            }
        }
    },
    Mutation: {
        addSerie: async (parent, args, context, info) => {
            try {
                const newSerie = args.serie
                const result = await axios.post(serieUrl, newSerie)
                const seriesCache = await redis.get(`series`)
                const series = JSON.parse(seriesCache)
                if (result.data) {
                    await redis.set(`series`, JSON.stringify(series.concat(result.data)))
                    return result.data
                }
            } catch(err) {
                return err
            }
        },
        updateSerie: async (parent, args, context, info) => {
            try {
                const id = args.id
                const updateSerie = args.serie
                const seriesCache = await redis.get(`series`)
                const series = JSON.parse(seriesCache)
                const filterSeries = series.filter(serie => serie._id !== id)
                const result = await axios.put(`${serieUrl}/${id}`, updateSerie)
                if (result.data) {
                    const updatedSerie = await axios.get(`${serieUrl}/${id}`)
                    await redis.set(`series`, JSON.stringify(filterSeries.concat(updatedSerie.data)))
                    await redis.set(`serie${id}`, JSON.stringify(updatedSerie.data))
                    return result.data
                }
            } catch(err) {
                return err
            }
        },
        deleteSerie: async (parent, args, context, info) => {
            try {   
                const id = args.id
                const seriesCache = await redis.get(`series`)
                const series = JSON.parse(seriesCache)
                const result = await axios.delete(`${serieUrl}/${id}`)
                if (result.data) {
                    const updatedSeries = series.filter(serie => serie._id !== id)
                    await redis.set(`series`, JSON.stringify(updatedSeries))
                    await redis.del(`serie${id}`)
                    return result.data
                }
            } catch(err) {
                return err
            }
        }
    }
}

module.exports = { typeDefs, resolvers }