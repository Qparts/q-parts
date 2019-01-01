import React, { Component, Fragment } from 'react';
import ReactPasswordStrength from 'react-password-strength';
import { InputGroup, InputGroupAddon } from 'reactstrap'
import Link from '../UI/Link'
import { colors, helpers } from '../../constants';

class RenderField extends Component {

  callback = ({ password }) => {
    this.props.input.onChange(password);
  }

  invalidMessage = (styles) => {
    if (this.props.meta.error.includes('Invalid')) {
      return <span style={styles.invalidMessage}>{this.props.meta.error}</span>
    }
  }

  getBorder = () => {
    return helpers.isSucceed(this.props.meta.error, this.props.meta.touched) ? `4px solid ${colors.success}` :
      helpers.isInvalid(this.props.meta.error, this.props.meta.touched) ? `4px solid ${colors.invalid}` :
        helpers.isRequired(this.props.meta.error, this.props.meta.touched) ? `4px solid ${colors.error}` : 'none'
  }

  getFloatLabelStyle = () => (
    this.props.hasFloatLabel ? 'has-float-label' : ''
  )

  render() {
    const styles = {
      border: {
        border: this.getBorder()
      },
      invalidMessage: {
        position: 'absolute',
        color: '#856404',
        right: '0',
        paddingTop: '11px',
        paddingRight: '18px',
      },
      borderShadow: {
        boxShadow: '0px 18px 18px 0px rgba(0, 0, 0, 0.07)',
      },
      hasFloatLabel: {
        border: this.getBorder(),
        display: 'block',
        position: 'relative',

      }
    }
    return (
      this.props.readOnly ?
        <Fragment>
          <span className={this.props.className}>{this.props.input.value}</span>
        </Fragment> :
        <div
          className={`RenderField ${this.getFloatLabelStyle()}`}
          style={this.props.hasFloatLabel ? styles.border : {}}>
          {
            this.props.hasFloatLabel ?
              <Fragment>
                <input
                  className="form-control"
                  type={this.props.type}
                  placeholder={this.props.placeholder}
                  {...this.props.input}
                  {...this.props} />
                <label>{this.props.label}</label>
              </Fragment> :
              <Fragment>
                <label>{this.props.label}</label>
                <sub>{this.props.sub}</sub>
                <input
                  className="form-control"
                  style={this.props.hasPasswordStrength ? { display: 'none' } :
                    this.props.boxShadow ? styles.borderShadow : styles.border}
                  type={this.props.type}
                  placeholder={this.props.placeholder}
                  {...this.props.input}
                  {...this.props} />
              </Fragment>
          }
          {this.props.hasPasswordStrength &&
            <InputGroup>
              <ReactPasswordStrength
                style={styles.border}
                minLength={5}
                minScore={2}
                changeCallback={this.callback}
                scoreWords={['too short', 'weak', 'okay', 'good', 'strong']}
                inputProps={{ ...this.props.input, placeholder: this.props.placeholder }}
                {...this.props} />
              <InputGroupAddon addonType="append">
                <Link
                  className="password-visibility"
                  to="#"
                  text="Show"
                  icon="icon-show-password"
                  isReverseOrder />
              </InputGroupAddon>
            </InputGroup>
          }
          <Fragment>
            {this.props.meta.touched &&
              ((this.props.meta.error && this.invalidMessage(styles)) ||
                (this.props.meta.warning && <span>{this.props.meta.warning}</span>))}
          </Fragment>
        </div>
    );
  }
}

RenderField.defaultProps = {
  hasFloatLabel: false,
}

export default RenderField;