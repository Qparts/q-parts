import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/UI/Button';

import { right } from '../../utils';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

class ResultNotFound extends Component {
  render () {

    return(
      <Fragment>
      <div id="result-not-found">
        <div className="no-result">
          <img alt="No Result" src="/img/no-result.svg" />
            <header className="sec-header">
                <h1>
                    <p>{this.props.translate("no-result.no")}</p>
                    {this.props.translate("no-result.result")}
                </h1>
                <span>{this.props.translate("no-result.sorry")} <span>:(</span></span>
            </header>
            <Button className="btn btn-primary" icon={`icon-arrow-${right(this.props.direction)}`} text="Make a Custom Order"/>
        </div>
      </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    direction: state.customer.direction,
    translate: getTranslate(state.localize)
  }
}

export default connect(mapStateToProps, null)(ResultNotFound);
