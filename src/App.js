// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4fe033884dmsh7d3876c7bbb96e4p173a15jsn580d1853ea4c',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};


function App() {

  const [isLoaded, setIsloaded] = useState(false)
  const [searchTitle, setSearchTitle] = useState('Inception')
  const [movies, setMovies] = useState([])


  const searchMovies = async(title) => {

    try {
      const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/%22${title}%22?exact=false?limit=2`, options)

      const data = await response.json()
      setIsloaded(true)
      console.log(data.results[1])
      setMovies(data.results)

        

    } catch (error) {
      setIsloaded(true)
      console.log(error);
      
    }


  }

  //searchMovies('Inception')

  useEffect( () => {
   searchMovies(searchTitle)
  }, [searchTitle])


  const handleInput = (e) => {
    const inputext = e.target.value
    //console.log(inputext);
    setSearchTitle(inputext)
    //searchMovies(searchTitle)
  }


  return (
    <div className="App">
      <h1>{ !isLoaded && "Loading..."}</h1>

      <h1>Movies</h1>
      <input placeholder='Search...' value={searchTitle} onChange={handleInput}></input>


     
   
    {
      movies.length > 0 && (movies.map( movie => (
          <div>
            <p key={movie.id}>Movie Title: {movie.titleText.text}</p>
            <p>Movie ID: {movie.id}</p>
          </div>
      )))
    } 
    

    </div>
  );
}

export default App;
