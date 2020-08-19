import React from 'react';
import { Row, Button } from 'reactstrap';
import { Card, Loading } from '../components';
import { GrAddCircle } from 'react-icons/gr';
import { useHistory } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

export const FETCH_MOVIES = gql`
query FindMovies {
    movies {
        _id
        title
        poster_path
        popularity
        overview
        tags
        type
    }
}
`

const Movies = () => {
    const history = useHistory()
    const {loading, error, data} = useQuery(FETCH_MOVIES)
    
    const handleClick = () => {
        history.push(`/movies/add`)
    }

    if (loading) return <Loading />
    if (error) return <h1 className="text-center text-light">Error 404 Not Found</h1>
    return (
        <>
            <h2 className="text-center mb-3 text-light">Movies</h2>
            <div className="d-flex justify-content-center mb-3">
                <Button onClick={() => handleClick()} size="sm" color="warning"><GrAddCircle /> New Movie</Button>
            </div>
            <Row className="d-flex justify-content-center mx-3">
                {data.movies.map(movie => <Card key={movie._id} data={movie} />)}
            </Row>
        </>
    )
}

export default Movies