const { gql } = require(`apollo-server`);
const axios = require(`axios`);
const Redis = require('ioredis');
const redis = new Redis();

const typeDefs = gql`
    type Movie {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    extend type Query {
        movies: [Movie]
        movie(id: ID): Movie
    }

    input MovieInput {
        title: String!
        overview: String!
        poster_path: String!
        popularity: Float!
        tags: String!
    }

    extend type Mutation {
        addMovie(movie: MovieInput): Movie
        updateMovie(id: ID, movie: MovieInput): Message
        deleteMovie(id: ID): Message
    }
`;

const movieUrl = 'http://localhost:3001/movies';

const resolvers = {
    Query: {
        movies: async () => {
            try {
                const moviesCache = await redis.get(`movies`)
                if (moviesCache) return JSON.parse(moviesCache)
                const movies = await axios.get(movieUrl);
                await redis.set(`movies`, JSON.stringify(movies.data))
                return movies.data
            } catch(err) {
                return err
            }
        },
        movie: async (parent, args, context, info) => {
            try {
                const id = args.id
                const movieCache = await redis.get(`movie${id}`)
                if (movieCache) return JSON.parse(movieCache)
                const result = await axios.get(`${movieUrl}/${id}`)
                await redis.set(`movie${id}`, JSON.stringify(result.data))
                return result.data
            } catch(err) {
                return err
            }
        }
    },
    Mutation: {
        addMovie: async (parent, args, context, info) => {
            try {
                const newMovie = args.movie
                const result = await axios.post(movieUrl, newMovie)
                const moviesCache = await redis.get(`movies`)
                const movies = JSON.parse(moviesCache)
                if (result.data) {
                    await redis.set(`movies`, JSON.stringify(movies.concat(result.data)))
                    return result.data
                }
            } catch(err) {
                return err
            }
        },
        updateMovie: async (parent, args, context, info) => {
            try {
                const id = args.id
                const updateMovie = args.movie
                const moviesCache = await redis.get(`movies`)
                const movies = JSON.parse(moviesCache)
                const filterMovies = movies.filter(movie => movie._id !== id)
                const result = await axios.put(`${movieUrl}/${id}`, updateMovie)
                if (result.data) {
                    const updatedMovie = await axios.get(`${movieUrl}/${id}`)
                    await redis.set(`movies`, JSON.stringify(filterMovies.concat(updatedMovie.data)))
                    await redis.set(`movie${id}`, JSON.stringify(updatedMovie.data))
                    return result.data
                }
            } catch(err) {
                return err
            }
        },
        deleteMovie: async (parent, args, context, info) => {
            try {   
                const id = args.id
                const moviesCache = await redis.get(`movies`)
                const movies = JSON.parse(moviesCache)
                const result = await axios.delete(`${movieUrl}/${id}`)
                if (result.data) {
                    const updatedMovies = movies.filter(movie => movie._id !== id)
                    await redis.set(`movies`, JSON.stringify(updatedMovies))
                    await redis.del(`movie${id}`)
                    return result.data
                }
            } catch(err) {
                return err
            }
        }
    }
}

module.exports = { typeDefs, resolvers }