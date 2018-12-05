import React, { Fragment } from 'react';
import { styles } from '../../constants';

import './index.css';

const renderProductImages = ({ products, goToProduct}) => {
 return <div className="RenderImages-container">
  {
   products.map((product, idx) => {
    return <Fragment key={idx}>
     <div>
      <img style={styles.cursor} src={product.image} alt="" onClick={goToProduct.bind(this, product)} />
      <p>{product.desc}</p>
     </div>
    </Fragment>
   })
  }
 </div>
}

export default renderProductImages;