import React from 'react';
import axios from 'axios';

const initialState = {
    title: "",
    director: "",
    metascore: "",
    stars: ["", "", ""],
}

const UpdateMovie = (props) => {
    const [move, setMovie] = useState(initialState);

    return (
        <div>
            Update Movie Component here
        </div>
    )
};

export default UpdateMovie;