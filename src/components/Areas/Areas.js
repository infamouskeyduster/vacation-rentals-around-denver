import React from 'react';
import './Areas.css';



const Areas = (props) => {
    return (
     <article className='area-card'>
            <h1>{props.shortName}</h1>
            <hr />
            <h2>{props.longName}</h2>
            <p>{props.description}</p>
            <button>View Listings</button>
        </article>
    )}


export default Areas;


// key={area.details.id} shortName={area.area} longName={area.details.name} description={area.details.about}