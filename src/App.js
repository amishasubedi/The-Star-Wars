import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //function fetchMoviesHandler() {
  // default GET request will be send
  // fetch returns a promise
  // fetch("https://swapi.dev/api/films/") // fetch is used to make an HTTP request to the backend
  //   .then((response) => {
  //     return response.json(); // translate json to js
  //   })
  // .then((data) => {

  // alternative to then call
  async function fetchMoviesHandler() {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    // either change props name, or map new array to data array by accessing it
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies); // access results
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies</p>}
        {isLoading && <p>Loading.....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
