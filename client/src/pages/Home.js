import React from 'react';
import { Card, Loading } from '../components';
import { useQuery, gql } from '@apollo/client';

export const FETCH_ENTERTAINME = gql`
  query EntertainMe {
    movies {
      _id
      title
      poster_path
      popularity
      overview
      tags
      type
    }
    series {
      _id
      title
      overview
      poster_path
      popularity
      type
    }
  }

`


function Home() {
  const {loading, error, data} = useQuery(FETCH_ENTERTAINME)
  return (
    <>
      {loading ? <Loading />
        : error ? <h1 className="text-center text-light">Error 404 Not Found</h1> : (
          <div className="mx-5">
            <div className="mx-4 mt-5">
              <h2 className="text-center text-light">Movies</h2>
              <div className="row-overflow">
                {data.movies.map(movie => <Card key={movie._id} data={movie} />)}
              </div>
            </div>
            <div className="mx-4 mt-5">
              <h2 className="text-center text-light">Series</h2>
              <div className="row-overflow">
                {data.series.map(serie => <Card key={serie._id} data={serie} />)}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default Home;
