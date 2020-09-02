const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');
const movieSchema = require(`./schemas/movieSchema`);
const serieSchema = require(`./schemas/serieSchema`);

const typeDefs = gql`

    type Message {
        message: String
    }

    type Query
    type Mutation
`;

const schema = makeExecutableSchema({
    typeDefs: [ typeDefs, movieSchema.typeDefs, serieSchema.typeDefs ],
    resolvers: [ movieSchema.resolvers, serieSchema.resolvers ],
})

const server = new ApolloServer({ schema })

server.listen(4003).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });