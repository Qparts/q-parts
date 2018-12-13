import React, { Fragment } from 'react';
import Stars from 'react-stars'

import './RenderRating.css';
import { starsRating } from '../../constants';


const RenderRating = props => {
  return (
    <Fragment>
      <div className="RenderRating-container RenderRating-required">
        <Stars
          {...starsRating}
          half={false}
          edit={true}
          value={props.input.value || 0}
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