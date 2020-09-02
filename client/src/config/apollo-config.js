import { ApolloClient, InMemoryCache, gql, makeVar } from '@apollo/client';

export const favoritesData = makeVar([])

export const GET_FAVORITES = gql`
    query {
        favorites {
            _id
            title
            popularity
            type
            poster_path
        }
    }
`

const client = new ApolloClient({
    uri: 'http://localhost:4003',
    cache: new InMemoryCache(
        {
        typePolicies: {
            Query: {
                fields: {
                    favorites: {
                        read: () => {
                            return favoritesData()
                        }
                    }
                }
            }
        }
    })
});

// client.writeQuery({
//     query: GET_FAVORITES,
//     data: {
//         favorites: []
//     }
// })

export default client