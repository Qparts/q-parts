import React from 'react';

import './Group.css';

let Group = props => {
 const { handleGroupSubmit, vehicleGroups } = props;
 return (
  <div>
   {vehicleGroups.map((vinGroup, key) => {
    return (
     <div key={key}>
      <label htmlFor={vinGroup.name}>{vinGroup.name}</label>
      <img className="Group-img" src={vinGroup.img} alt="" onClick={(event) => handleGroupSubmit(vinGroup.id, event)} />
     </div>
    )
   })}
  </div>
 );
}

export default Group;