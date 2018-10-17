import React, { Fragment } from 'react';
import { Rating } from 'primereact/components/rating/Rating';

import './RenderRating.css';

const RenderRating = props => {
  return (
    <Fragment>
      <div className="RenderRating-container RenderRating-required">
        <Rating
          value={props.input.value}
          onChange={(e) => props.input.onChange(e.value)}
          {...props} />
        <Fragment>
          {props.meta.touched &&
            ((props.meta.error && <span><i className="fas fa-exclamation-circle"></i>{props.meta.error}</span>) ||
              (props.meta.warning && <span>{props.meta.warning}</span>))}
        </Fragment>
      </div>
    </Fragment>
  );
}

export default RenderRating;