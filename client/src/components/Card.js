import React from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import { Button } from 'reactstrap';
import { FaStar, FaTimesCircle } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client'; 
import { FETCH_MOVIES } from '../pages/Movies';
import { FETCH_SERIES } from '../pages/Series';
import { favoritesData } from '../config/apollo-config';
import Swal from 'sweetalert2';

const DELETE_MOVIE = gql`
    mutation DeleteMovie($id: ID) {
        deleteMovie(id: $id) {
            message
        }
    }

`

const DELETE_SERIE = gql`
    mutation DeleteSerie($id: ID) {
        deleteSerie(id: $id) {
            message
        }
    }

`

function Card({data}) {
    const {pathname} = useLocation()
    const [deleteMovie] = useMutation(DELETE_MOVIE, {
        refetchQueries: [{
            query: FETCH_MOVIES,
        }]
    })
    const [deleteSerie] = useMutation(DELETE_SERIE, {
        refetchQueries: [{
            query: FETCH_SERIES,
        }]
    })
    const handleDelete = (type) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to undo this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                if (type === 'movie') {
                    deleteMovie({
                        variables: {
                            id: data._id
                        }
                    })
                } else {
                    deleteSerie({
                        variables: {
                            id: data._id
                        }
                    })
                }
            }
        })
    }

    const handleFavorites = (id) => {
        // const {favorites: currentFavorites} = client.readQuery({
        //     query: GET_FAVORITES,
        // })
        // client.writeQuery({
        //     query: GET_FAVORITES,
        //     data: {
        //         favorites: [...currentFavorites, data]
        //     }
        // })
        const currentFav = favoritesData()
        const filterFav = currentFav.filter(fav => fav._id === id)
        if (filterFav.length > 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `This ${data.type} already added to your favorites!`,
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            favoritesData([...currentFav, data])
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `This ${data.type} has been added to favorites!`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    return (
        <>
            <div className="d-flex my-3 cardStyle">
                <div>
                    <img width="150" className="img-card" src={data.poster_path} alt="gambar"/>
                </div>
                <div className="d-flex flex-column ml-3 mr-3 mt-4">
                    <span className="d-inline-block text-truncate text-title">
                        <Link className="link-content" to={{
                            pathname: `${data.type}s/detail/${data._id}`,
                            state: {
                                from: data.type,
                            }
                            }}>{data.title}</Link>
                    </span>
                        <span style={{fontSize: `15px`}}><FaStar color="gold"/> {data.popularity}</span>
                    <span className="tagStyle text-center text-light mt-2" style={{fontSize: `14px`, background:'grey', padding: '1px', width: '60%'}}>
                        {data.type}
                    </span>
                    <div className="d-flex flex-column mt-2">
                        {
                            pathname !== "/" && pathname !== '/favorites' && 
                            <Link to={{
                                pathname: `${data.type}s/edit/${data._id}`,
                                state: {
                                    from: data.type,
                                    type: 'edit'
                                }
                                }} className="mt-1" style={{textDecoration: 'none'}}>
                                <Button block color="transparent button-playlist" style={{fontSize: '14px'}}>
                                    <FiEdit className="mr-1" style={{fontSize: '14px'}}/>
                                    <span>Update</span>
                                </Button>
                            </Link> 
                        }
                        {
                            pathname !== '/favorites' && (
                                <Button style={{fontSize: '14px'}} onClick={() => handleFavorites(data._id)} className="button-playlist" color="transparent">
                                    <MdLibraryAdd  style={{fontSize: '14px'}} className="mr-1"/>
                                    <span>Playlist</span>
                                </Button>
                            )
                        }
                    </div>
                </div>
                <div>
                    {
                        pathname !== '/favorites' && <Button onClick={() => handleDelete(data.type)} color="transparent"><FaTimesCircle className="link-content hover-red"/></Button>
                    }
                </div>
            </div>
        </>
  );
}

export default Card;
