import React from 'react';
import './App.css';
import axios from 'axios'

import GenreTab from './components/GenreTab'
import Pagination from './components/Pagination'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      genreList: [{"name": "example 1"}, {"name": "example 2" }],
      selectedMovies: [],
      totalResults: 0,
      currentGenreID: null
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
        totalResults: res.data.total_results,
        selectedMovies: res.data.results,
        currentGenreID: id
      })
    }).catch(err =>
      console.log(err)
      )
  }

  flipPage = (pageNumber) => {
    axios
    .get(`https://api.themoviedb.org/3/discover/movie?with_genres=${this.state.currentGenreID}&api_key=694ed5c8eb4a1d99a4a920ee94ca1f5f&page=${pageNumber}`)
    .then(res => {
      console.log(res.data)
      this.setState({
        selectedMovies: res.data.results
      })
    }).catch(err =>
      console.log(err)
      )
  }

  render() {
    const { genreList, selectedMovies, totalResults } = this.state
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
        <Pagination total={totalResults} flipPage={this.flipPage}/>
      </div>
    );
  }
}

export default App;
