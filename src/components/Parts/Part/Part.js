import React from 'react';
import Select from 'react-select';

import './Part.css';

import { generateQuantity } from '../../../utils';

let Part = ({ selectedPart, handleAddToCart, selectedPartQuantity, handleSelectedPartQuantity }) => {
  if (selectedPart.length === 0) return null;

  const quantity = generateQuantity(20);
  const data = quantity.map(data => {
    return {
      value: data,
      label: data
    }
  });
  const addToCart = selectedPart.price ? 'Add' : 'Get Quote';

  const handleClick = (event) => {
    event.preventDefault();

    handleAddToCart({ selectedPart, selectedPartQuantity, addToCart });
  }

  return (
    <div>
      <figure className="snip1249">
        <figcaption>
          <h3>{selectedPart.number}</h3>
          <div>
            <p>{selectedPart.name}</p>
          </div>
          <div className="price">
            {selectedPart.price || '(price not available)'}
          </div>
          <div>
            <p>{selectedPart.description}</p>
          </div>
        </figcaption>
      </figure>
      <Select
        placeholder="please select a quantity"
        value={selectedPartQuantity}
        options={data}
        onChange={handleSelectedPartQuantity} />
      <button disabled={!selectedPartQuantity} type="submit" className="add-to-cart" onClick={handleClick}>{addToCart}</button>
    </div>
  );
}

export default Part;