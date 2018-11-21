import React, { Component, Fragment } from 'react';
import ReactPasswordStrength from 'react-password-strength'
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

  render() {
    const styles = {
      border: {
        border: helpers.isSucceed(this.props.meta.error, this.props.meta.touched) ? `4px solid ${colors.success}` :
          helpers.isInvalid(this.props.meta.error, this.props.meta.touched) ? `4px solid ${colors.invalid}` : 
          helpers.isRequired(this.props.meta.error, this.props.meta.touched) ? `4px solid ${colors.error}` : 'none'
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
      }
    }
    return (
      <div className={this.props.className} >
        <label>{this.props.label}</label> <br />
        <sub>{this.props.sub}</sub>
        <div className="RenderField">
          <input
            style={this.props.hasPasswordStrength ? { display: 'none' } : this.props.boxShadow ? styles.shadow : styles.border}
            type={this.props.type}
            placeholder={this.props.placeholder}
            {...this.props.input}
            {...this.props} />
          {this.props.hasPasswordStrength &&
            <ReactPasswordStrength
              style={styles.border}
              minLength={5}
              minScore={2}
              changeCallback={this.callback}
              scoreWords={['too short', 'weak', 'okay', 'good', 'strong']}
              inputProps={{ ...this.props.input, placeholder: this.props.placeholder }}
              {...this.props} />
          }
          <Fragment>
            {this.props.meta.touched &&
              ((this.props.meta.error && this.invalidMessage(styles)) ||
                (this.props.meta.warning && <span>{this.props.meta.warning}</span>))}
          </Fragment>
        </div>
      </div>
    );
  }
}

RenderField.defaultProps = {
  className: "form-control"
}

export default RenderField;