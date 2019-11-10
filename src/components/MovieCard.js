import React from 'react'

export default function MovieCard(props) {
    return (
        <div className="movie-card">
            <img src={props.pic} />
            <div className="movie-card-content">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
        </div>
    )
}
