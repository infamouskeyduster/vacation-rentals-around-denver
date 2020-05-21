import React from 'react';
import Areas from './Areas';
import './AreasContainer.css';

const AreasContainer = (props) => {
  const currentArea = props.areaData.map(area => {
    return (
      <Areas
        key={area.details.id}
        id={area.details.id}
        shortName={area.area}
        longName={area.details.name}
        description={area.details.about}
      />
    )
  })

  return (
    <section className="areas-container">
      {currentArea}
    </section>
  )
}

export default AreasContainer;
