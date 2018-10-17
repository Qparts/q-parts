import React from 'react';

import './Subgroup.css';

let Subgroup = props => {
 const { handleSubgroupSubmit, vehicleSubgroups } = props;
 return (
  <div>
   {vehicleSubgroups.map((vehicleSubgroup, key) => {
    return (
     <div key={key}>
      <label htmlFor={vehicleSubgroup.name}>{vehicleSubgroup.name}</label>
      <img className="Subgroup-img" src={vehicleSubgroup.img} alt="" onClick={(event) => handleSubgroupSubmit(vehicleSubgroup.parentId)} />
     </div>
    )
   })}
  </div>
 );
}

export default Subgroup;