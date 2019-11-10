import React from 'react';
import './App.css';
import axios from 'axios'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      genreList: [{"name": "example 1"}, {"name": "example 2" }],
      selectedMovies: null
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

  render() {
    const { genreList } = this.state
    return (
      <div className="App">
        {genreList.map(genre => 
          <h2>{genre.name}</h2>
          )}
      </div>
    );
  }
}

export default App;
