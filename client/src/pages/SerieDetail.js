import React from 'react';
import { DetailCard, Loading } from '../components';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

export const FIND_SERIE = gql`
query findOneSerie($id: ID) {
    serie(id: $id) {
        _id
        title
        overview
        tags
        popularity
        poster_path
    }
}
`

const SerieDetail = () => {
    const params = useParams()

    const {loading, error, data} = useQuery(FIND_SERIE, {
        variables: {id: params.id}
    })
    return (
        <>
            {
                loading ? <Loading /> 
                : error ?  <h1 className="text-center text-light">Error 404 Not Found</h1> 
                : (
                    <DetailCard data={data.serie}/>
                )
            }
        </>
    )
}

export default SerieDetail