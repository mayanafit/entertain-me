import React from 'react';
import { Row, Button } from 'reactstrap';
import { Card, Loading } from '../components';
import { GrAddCircle } from 'react-icons/gr';
import { useHistory } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

export const FETCH_SERIES = gql`
query FindSeries {
    series {
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

const Series = () => {
    const history = useHistory()
    const {loading, error, data} = useQuery(FETCH_SERIES)
    const handleClick = () => {
        history.push(`/series/add`)
    }
    return (
        <>
         {loading ? <Loading />
        : error ? <h1 className="text-center text-light">Error 404 Not Found</h1> : (
                <>
                    <h2 className="text-center mb-3 text-light">Series</h2>
                    <div className="d-flex justify-content-center mb-3">
                        <Button onClick={() => handleClick()} size="sm" color="warning"><GrAddCircle /> New Serie</Button>
                    </div>
                    <Row className="d-flex justify-content-center mx-3">
                        {data.series.map(serie => <Card key={serie._id} data={serie} />)}
                    </Row>
                </>
            )
        }
        </>
    )
}

export default Series