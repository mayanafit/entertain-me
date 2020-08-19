import React from 'react';
import './App.css';
import { Home, Favorites,
  Movies, 
  MovieDetail, 
  SerieDetail, 
  Series, FormPageMovie, FormPageSerie } from './pages';
import { RiMovie2Line } from 'react-icons/ri';
import { MdLocalMovies } from 'react-icons/md';
import { FiMonitor } from 'react-icons/fi';
import { BsCollectionPlayFill } from 'react-icons/bs';
import {
BrowserRouter as Router,
Route,
Link,
Switch,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo-config';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div id="body">
          <header className="d-flex fixed-top justify-content-around align-items-center px-5 py-4 navbar">
            <div>
              <Link to={{
                pathname: "/",
                state: {
                  from: 'home'
                } 
              }} id="navLogo"><RiMovie2Line />EntertainMe</Link>
            </div>
            <div>
              <Link to={{
                pathname: "/movies",
                state: {
                  from: 'movies'
                }
              }} className="mr-5 menu"><MdLocalMovies /> Movies</Link>
              <Link className="menu" to={{
                pathname: "/series",
                state: {
                  from: 'series'
                }
                }}><FiMonitor /> Series</Link>
            </div>
            <div>
              <Link className="menu" to="/favorites"><BsCollectionPlayFill /> My Playlist</Link>
            </div>
          </header>
          <div className="body-content">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/movies" component={Movies}/>
              <Route exact path="/series" component={Series}/>
              <Route exact path="/favorites" component={Favorites}/>
              <Route exact path="/movies/detail/:id" component={MovieDetail}/>
              <Route exact path="/series/detail/:id" component={SerieDetail}/>
              <Route exact path="/movies/add" component={FormPageMovie} />
              <Route exact path="/series/add" component={FormPageSerie} />
              <Route exact path="/movies/edit/:id" component={FormPageMovie} />
              <Route exact path="/series/edit/:id" component={FormPageSerie} />
            </Switch>  
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
