import React from 'react';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Button } from 'primereact/components/button/Button';
import { Column } from 'primereact/components/column/Column';

import './Parts.css';

import Part from './Part/Part';

let Parts = ({ parts, onPartClick, selectedPart, selectedPartQuantity,
  handleSelectedPartQuantity, handleAddToCart }) => {

  const handleClick = (positionId, event) => {
    event.preventDefault();

    onPartClick(positionId);
  }

  if (parts.positions === undefined) return null;
  const partsData = parts.partGroups[0].parts.map(part => {
    return {
      id: part.id,
      name: part.name,
      price: part.price || 'Unknow price',
      quantity: part.quantity,
      positionNumber: part.positionNumber
    }
  });

  const partButton = (rowData, column) => {
    return <Button label="Item" onClick={handleClick.bind(this, rowData.positionNumber)}/>
  }

  return (
    <div className="Parts">
      <div>
        <img src={parts.img} alt="" useMap="#partsmap" />
        <map name="partsmap">
          {parts.positions.map((coords, key) => {
            return <area alt="" key={key} shape="rect" coords={coords.coordinates.toString()}
              onClick={handleClick.bind(this, coords.number)} />
          })}
        </map>
        <DataTable value={partsData} className="Parts-table">
          <Column field="id" header="Id" />
          <Column field="name" header="Name" />
          <Column field="price" header="Price" />
          <Column field="quantity" header="Quantity" />
          <Column field="positionNumber" header="PositionNumber" />
          <Column header="Item" body={partButton}></Column>
        </DataTable>

      </div>
      <Part
        selectedPart={selectedPart}
        selectedPartQuantity={selectedPartQuantity}
        handleSelectedPartQuantity={handleSelectedPartQuantity}
        handleAddToCart={handleAddToCart} />
    </div>
  );
}

export default Parts;