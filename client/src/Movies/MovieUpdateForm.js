import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from './MovieList';

const MovieUpdateForm = props => {

    const [movie, setMovie] = useState(null);
    const params = useParams();

    const fetchMovie = (id) => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) => setMovie(res.data))
          .catch((err) => console.log(err.response));

        console.log(movie);
    };

    useEffect(() => {
        fetchMovie(params.id);
    }, [params.id]);

    const handleChange = event => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        });
    };

    const handleStarsChange = event => {
        console.log(event.target.value);
        setMovie({
            ...movie,
            stars: event.target.value.split(',')
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log("Res ->", res);
                setMovie(res.data);
                // props.history.push(`/movies`);
            })
            .catch(err => console.log("Err ->", err));
    }

    if (!movie) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <label for="title">Title <input 
                type="text"
                name="title"
                value={movie.title}
                onChange={handleChange}
                />
            </label><br />
            <label for="director">Director <input 
                type="text"
                name="director"
                value={movie.director}
                onChange={handleChange}
                />
            </label><br />
            <label for="metascore">Metascore <input 
                type="text"
                name="metascore"
                value={movie.metascore}
                onChange={handleChange}
                />
            </label><br />
            <label for="stars">Stars <input 
                type="text"
                name="stars"
                value={movie.stars}
                size='50'
                onChange={handleStarsChange}
                />
            </label><br />
            <button>Update</button>
        </form>
    );
}

export default MovieUpdateForm;