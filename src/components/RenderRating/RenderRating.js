import React, { Fragment } from 'react';
import Stars from 'react-stars';
import { StyleSheet, css } from 'aphrodite';

import { starsRating } from '../../constants';


const RenderRating = props => {
  return (
    <Fragment>
      <div className="RenderRating-container RenderRating-required">
        <Stars
          className={css(styles.rating)}
          {...starsRating}
          half={false}
          edit={true}
          value={props.input.value || 0}
          onChange={(newRating) => props.input.onChange(newRating)}
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

const styles = StyleSheet.create({
  rating: {
    display: 'flex'
  }
});

export default RenderRating;