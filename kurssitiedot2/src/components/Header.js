import React from 'react';

const Header = ({ name }) => {
    // console.log('header props', name)
    return (
    <div>
        <h1>{name}</h1>
    </div>
    )
}

export default Header