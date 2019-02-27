import React, { Component, Fragment } from 'react';
import ReactPasswordStrength from 'react-password-strength';
import { InputGroup, InputGroupAddon } from 'reactstrap'
import Link from '../UI/Link'
import { colors, helpers } from '../../constants';

class RenderField extends Component {

  callback = ({ password, score }) => {
    this.props.input.onChange(password);
    this.props.setPasswordScore(score);
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
  );

  getIcon = () => {
    return helpers.isSucceed(this.props.meta.error, this.props.meta.touched) ? '#30d576' :
      helpers.isInvalid(this.props.meta.error, this.props.meta.touched) ? '#856404' : 'none';
  }

  getIconClassName = () => {
    return helpers.isSucceed(this.props.meta.error, this.props.meta.touched) ? 'icon-checked' :
      helpers.isInvalid(this.props.meta.error, this.props.meta.touched) ? 'icon-alert' : '';
  }

  displayPasswordLabel = () => {
    return this.props.input.value ? { display: '' } : { display: 'none' };
  }

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
      },
      icon: {
        color: this.getIcon(),
      },
      textTransform: {
        textTransform: this.props.textTransform ?  this.props.textTransform : {}
      }
    }
    const { hasPasswordStrength, setPasswordScore, onTogglePassword, hasFloatLabel, textTransform, scoreWords, title, ...renderFieldProps } = this.props;
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
                <InputGroup>
                  <input
                    className="form-control"
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    {...this.props.input}
                    {...renderFieldProps} />
                  <label>{this.props.label}</label>
                  <InputGroupAddon addonType="append">
                    <i className={`input-icon ${this.getIconClassName()}`} style={styles.icon} />
                  </InputGroupAddon>
                </InputGroup>
              </Fragment> :
              <Fragment>
                <label>{this.props.label}</label>
                <sub>{this.props.sub}</sub>
                <InputGroup style={this.props.hasPasswordStrength ? { display: 'none' } : { display: '' }}>
                  <input
                    className="form-control"
                    style={Object.assign(this.props.hasPasswordStrength ? { display: 'none' } :
                      this.props.boxShadow ? styles.borderShadow : styles.border, styles.textTransform)}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    {...this.props.input}
                    {...renderFieldProps} />
                  <InputGroupAddon addonType="append">
                    <i className={`input-icon ${this.getIconClassName()}`} style={styles.icon} />
                  </InputGroupAddon>
                </InputGroup>
              </Fragment>
          }
          {this.props.hasPasswordStrength &&
            <Fragment>
              <InputGroup>
                <ReactPasswordStrength
                  style={styles.border}
                  minLength={5}
                  minScore={2}
                  changeCallback={this.callback}
                  scoreWords={scoreWords}
                  inputProps={{ ...this.props.input, ...renderFieldProps }} />
                <InputGroupAddon addonType="append">
                  <Link
                    className="input-icon"
                    to="#"
                    text={this.props.text}
                    icon={this.props.icon}
                    isReverseOrder
                    onClick={this.props.onTogglePassword}
                  />
                </InputGroupAddon>
              </InputGroup>
              <label
                style={this.displayPasswordLabel()}
                className="password-label">{title}</label>
            </Fragment>
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
  hasPasswordStrength: false
}

export default RenderField;