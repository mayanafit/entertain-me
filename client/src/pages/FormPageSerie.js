import React from 'react';
import { Container } from 'reactstrap';
import { FormTemplate } from '../components';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useMutation, gql, useQuery } from '@apollo/client';
import { FETCH_SERIES } from './Series';
import { FIND_SERIE } from './SerieDetail';
import Swal from 'sweetalert2';

const ADD_SERIE = gql`
    mutation AddSerie($newSerie: SerieInput) {
        addSerie(serie: $newSerie) {
            _id
            title
        }
    }
`

const UPDATE_SERIE = gql`
    mutation UpdateSerie($id: ID, $updateSerie: SerieInput) {
        updateSerie(id: $id, serie: $updateSerie) {
            message
        }
    }
`


const FormPageSerie = () => {
    const params = useParams()
    const {pathname, state} = useLocation()
    const history = useHistory()
    const {data:resultSerie} = useQuery(FIND_SERIE, {
        variables: {id: params.id}
    })
    const [addSerie] = useMutation(ADD_SERIE, {
        refetchQueries: [{
            query: FETCH_SERIES,
        }],
        onCompleted: () => {
            history.push(`/series`)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Success adding new serie!`,
                showConfirmButton: false,
                timer: 1500
            })   
        }
    })

    const [updateSerie] = useMutation(UPDATE_SERIE, {
        refetchQueries: [{
            query: FETCH_SERIES,
        }],
        onCompleted: () => {
            history.push(`/series`)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Success updating the serie!`,
                showConfirmButton: false,
                timer: 1500
            })   
        }
    })
    const handleAdd = input => {
        // console.log(input, `ini input di series`)
        if (state) {
            updateSerie({
                variables: {
                    id: params.id,
                    updateSerie: input,
                }
            })
        } else if (pathname === '/series/add') {
            addSerie({
                variables: {
                    newSerie: input
                }
            })
        }
    }
    return (
        <Container className="bg-light px-5 py-5 mt-3" style={{width: '700px'}}>
            <h2 className="text-center">{pathname === '/series/add' ? 'Add' : 'Edit'} Serie</h2>
            <FormTemplate addInput={(input) => handleAdd(input)} data={resultSerie ? resultSerie.serie : ''}/>
        </Container>
    )
}

export default FormPageSerie