import React from 'react';
import { Container } from 'reactstrap';
import { FormTemplate } from '../components';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useMutation, gql, useQuery } from '@apollo/client';
import { FETCH_MOVIES } from './Movies';
import { FIND_MOVIE } from './MovieDetail';
import Swal from 'sweetalert2';

const ADD_MOVIE = gql`
    mutation AddMovie($newMovie: MovieInput) {
        addMovie(movie: $newMovie) {
            _id
            title
        }
    }
`

const UPDATE_MOVIE = gql`
    mutation UpdateMovie($id: ID, $updateMovie: MovieInput) {
        updateMovie(id: $id, movie: $updateMovie) {
            message
        }
    }
`

const FormPageMovie = () => {
    const params = useParams()
    const {pathname, state} = useLocation()
    // console.log(params.id)
    const history = useHistory()
    const {data:resultMovie} = useQuery(FIND_MOVIE, {
        variables: {MovieId: params.id}
    })
    const [addMovie] = useMutation(ADD_MOVIE, {
            refetchQueries: [{
            query: FETCH_MOVIES,
        }],
        onCompleted: () => {
            history.push(`/movies`)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Success adding new movie!`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    })

    const [updateMovie] = useMutation(UPDATE_MOVIE, {
        refetchQueries: [{
            query: FETCH_MOVIES,
        }],
        onCompleted: () => {
            history.push(`/movies`)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Success update the movie!`,
                showConfirmButton: false,
                timer: 1500
            })
        } 
    })
    const handleAdd = input => {
        if (state) {
            updateMovie({
                variables: {
                    id: params.id,
                    updateMovie: input,
                }
            })
        } else {
            addMovie({
                variables: {
                    newMovie: input
                }
            })
        }
    }
    return (
        <Container className="bg-light px-5 py-5 mt-3" style={{width: '700px'}}>
            <h2 className="text-center">{pathname === '/movies/add' ? 'Add' : 'Edit'} Movie</h2>
            <FormTemplate addInput={(input) => handleAdd(input)} data={resultMovie ? resultMovie.movie : ''}/>
        </Container>
    )
}

export default FormPageMovie