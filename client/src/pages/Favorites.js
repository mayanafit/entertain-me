import React from 'react';
import {GET_FAVORITES} from '../config/apollo-config';
import { Card, Loading } from '../components';
import { Row } from 'reactstrap';
import { useQuery } from '@apollo/client';

const Favorites = () => {
    // const {favorites} = client.readQuery({
    //     query: GET_FAVORITES,
    // })
    const {data, loading} = useQuery(GET_FAVORITES)
    if (loading) return <Loading />
    return (
        <>
            <h2 className="text-center mb-3 text-light">My Playlist</h2>
            <Row className="d-flex justify-content-center">
                {
                    data.favorites.length < 1 ? <h4 className="text-center mt-5 text-light">
                        You haven't added anything yet.</h4> 
                    : data.favorites.map(favorite => <Card key={favorite._id} data={favorite}/>)
                }
            </Row>
        </>
    )
}

export default Favorites