import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const initialState = {
    title: "",
    director: "",
    metascore: "",
    // stars: ["", "", ""],
}

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialState)
    const params = useParams()
    const history = useHistory()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${params.id}`)
            .then(res => {
                console.log(res.data)
                setMovie(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [params.id])

    const handleChange = e => {
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
         axios
            .put(`http://localhost:5000/api/movies/${params.id}`, movie)
            .then(res => {
                console.log(res)
                const newMovieList = props.movieList.map(item => {
                    if(item.id === movie.id){
                        return res.data
                    } else {
                        return item
                    }
                })
                props.setMovieList(newMovieList)
                history.push(`/movies/${params.id}`)
            })
            .catch(err => {
                console.log(err)
            })
    };



    return (
        <div>  
        <form onSubmit={handleSubmit}>
            <h2> Update Movie:</h2>
            <input 
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                value={movie.title}
            />
            <input
                type="text"
                name="director"
                placeholder="Director"
                onChange={handleChange}
                value={movie.director}
            />
            <input
                type="text"
                name="metascore"
                placeholder="Metascore"
                onChange={handleChange}
                value={movie.metascore}
            />
            <button>Update Movie</button>
        </form>
        </div>
    );
};  //closes UpdateMovie component

export default UpdateMovie;