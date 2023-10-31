import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

//bb7c4cca

const API_URL ='http://www.omdbapi.com?apikey=bb7c4cca';

const movie1 = {
    "Title": "Miles Morales Ultimate Spiderman",
    "Year": "2021",
    "imdbID": "tt14311386",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNmMzODkwNDktMTkyMy00MmU5LWE4MGMtYzIzZjdjNmJiZDRiXkEyXkFqcGdeQXVyNDU1NDQ0NzE@._V1_SX300.jpg"
}

const App = () => {
    const [movies,setMovies] = useState([]);
    const [searchTerm, setSerachTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('Spiderman')
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input placeholder="Search for movies..." value={searchTerm}
                onChange = {(e) => {setSerachTerm(e.target.value)}}
                />
                <img src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {movies?.length > 0 
                ? (
                    <div className="container">
                       {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                       ))}
                    </div>
                ) :
                (
                    <div className="empty">
                        <h2>No Movies Found.</h2>
                    </div>
                )}            
        </div>
    );
}

export default App;