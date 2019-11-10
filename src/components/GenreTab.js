import React from 'react'

export default function GenreTab(props) {
    return (
        <button onClick={()=> props.getMovieList(props.id)}>
            {props.name}
        </button>
    )
}
