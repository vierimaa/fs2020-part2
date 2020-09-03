import React from 'react';

const Person = ({ name, number, id, handleDeletePerson }) => {
    return (
        <div>
            {name} {number} <button key={id} onClick={() => handleDeletePerson(id, name)}>Delete</button>
        </div>
    )
}

const PersonList = ({ personsToShow, handleDeletePerson }) => {
    return (
        <div>
            {personsToShow.map((person) => {
                return(
                    <Person key={person.id} name={person.name} number={person.number} id={person.id} handleDeletePerson={handleDeletePerson}/>
                )
            }
            )}
        </div>
    )
}


export default PersonList;