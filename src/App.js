import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //function fetchMoviesHandler() {
  // default GET request will be send
  // fetch returns a promise
  // fetch("https://swapi.dev/api/films/") // fetch is used to make an HTTP request to the backend
  //   .then((response) => {
  //     return response.json(); // translate json to js
  //   })
  // .then((data) => {

  // alternative to then call
  //async function fetchMoviesHandler() {
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://reaact-http-87818-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      const loadedMovies = [];

      for (const i in data) {
        loadedMovies.push({
          id: i,
          title: data[i].title,
          openingText: data[i].openingText,
          releaseDate: data[i].releaseDate,
        });
      }

      // either change props name, or map new array to data array by accessing it
      // const transformedMovies = data.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });
      setMovies(loadedMovies); // access results
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  // only executes if dependencies change
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://reaact-http-87818-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
  };

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
