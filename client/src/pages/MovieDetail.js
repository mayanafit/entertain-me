import React from 'react';
import { DetailCard, Loading } from '../components';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

export const FIND_MOVIE = gql`
query FindOneMovie($MovieId: ID) {
    movie(id: $MovieId) {
        _id
        title
        overview
        tags
        popularity
        poster_path
    }
}
`

const MovieDetail = () => {
    const params = useParams()
    const {loading, error, data} = useQuery(FIND_MOVIE, {
        variables: {MovieId: params.id}
    })
    // console.log(data)
    return (
        <>
            {
                loading ? <Loading />
                : error ?  <h1 className="text-center text-light">Error 404 Not Found</h1> 
                : (
                    <DetailCard data={data.movie}/>
                )
            }
        </>
    )
}

export default MovieDetail