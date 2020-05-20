import React from 'react';
import {Link} from 'react-router-dom';
import './Areas.css';

const Areas = (props) => {
  let areaID = props.id;
    return (
     <article className='area-card'>
            <h1>{props.shortName}</h1>
            <hr />
            <h2>{props.longName}</h2>
            <p>{props.description}</p>
            <Link to={`/areas/${areaID}/listings`}>
              <button>View Listings</button>
            </Link>
        </article>
    )}


export default Areas;


// key={area.details.id} shortName={area.area} longName={area.details.name} description={area.details.about}
