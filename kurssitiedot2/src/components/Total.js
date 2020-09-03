import React from 'react';

const Total = ({ parts }) => {
    // console.log('parts', parts);
    const exercises = parts.map(part => part.exercises).reduce( (s, p) => s + p)
    // console.log('exercises', exercises);
    return (
        <div>
            <p>Number of exercises {exercises}</p>
        </div>
    )
}

export default Total;