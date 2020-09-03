import React from 'react';

const Filter = ({ newSearch, onChange }) => {
    return (
        <div>
            Search: <input value={newSearch} onChange={onChange} />
        </div>
    );
};

export default Filter;