import React from 'react';
import './App.css';
import axios from 'axios'

import GenreTab from './components/GenreTab'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      genreList: [{"name": "example 1"}, {"name": "example 2" }],
      selectedMovies: []
    }
  }

  componentDidMount() {
    axios
    .get('https://api.themoviedb.org/3/genre/movie/list?api_key=694ed5c8eb4a1d99a4a920ee94ca1f5f')
    .then(res => {
      console.log(res)
      this.setState({
        genreList: res.data.genres
      })
    }
    ).catch(err => {
      console.log(err)
    })
  }

  getMoviesByGenre = (id) => {
    axios
    .get(`https://api.themoviedb.org/3/discover/movie?with_genres=${id}&api_key=694ed5c8eb4a1d99a4a920ee94ca1f5f`)
    .then(res => {
      console.log(res.data)
      this.setState({
        selectedMovies: res.data.results
      })
    }).catch(err =>
      console.log(err)
      )
  }

  flipPage = () => {
    let pageNumber = 5
    axios
    .get(`https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=694ed5c8eb4a1d99a4a920ee94ca1f5f&page=${pageNumber}`)
  }

  render() {
    const { genreList, selectedMovies } = this.state
    return (
      <div className="App">
        <div className="genre-menu">
        {genreList.map(genre => 
          <GenreTab name={genre.name} id={genre.id} getMovieList={this.getMoviesByGenre} key={genre.id}/>
          )}
        </div>
        <div className="movie-list">
          {selectedMovies.map(movie => 
          <>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default App;
