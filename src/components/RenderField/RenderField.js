import React, { Component, Fragment, createRef } from 'react';
import ReactPasswordStrength from 'react-password-strength';
import Link from '../UI/Link'
import { colors, helpers } from '../../constants';

class RenderField extends Component {
  static defaultProps = {
      errorMessage: 'required input'
  }
  constructor(props) {
    super(props);
    this.passwordStrengthRef = createRef();
  }

  componentDidMount() {
    if (this.props.hasPasswordStrength) {
      let passwordParent = this.passwordStrengthRef.current.reactPasswordStrengthInput.offsetParent;
      var passwordLabelText = document.createTextNode(`${this.props.label}`);
      var label = document.createElement('label');
      label.appendChild(passwordLabelText);
      passwordParent.insertBefore(label, passwordParent.childNodes[1]);

      var barBg = document.createElement('p');
      passwordParent.insertBefore(barBg, passwordParent.childNodes[3]);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.hasPasswordStrength && prevProps.currentLanguage !== this.props.currentLanguage) {
      let passwordParent = this.passwordStrengthRef.current.reactPasswordStrengthInput.offsetParent;
      passwordParent.childNodes[1].innerText = this.props.label;
    }

  }


  callback = ({ password, score }) => {
    this.props.input.onChange(password);
    this.props.setPasswordScore(score);
  }

  isRequired = () => (
    this.props.meta.touched && this.props.meta.error && !this.props.meta.active
  );

  isWarning = () => (
    this.isRequired() && this.props.hasWarning && !this.props.errorMessage && this.props.meta.dirty
  )

  invalidMessage = () => {
    if (this.isRequired()) {
      return <p className="error-text">{this.props.errorMessage}</p>
    }
  }

  warningMessage = () => {
    if (this.props.hasWarning) {
      if (this.isWarning()) {
        return <Fragment>
          <i className="icon-alert"></i>
          <span className="validate-text">{this.props.warningMessage}</span>
        </Fragment>
      } else if (!this.isRequired() && !this.props.meta.error && !this.props.meta.active) {
        return <i className="icon-checked"></i>
      }
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

  getWarningClass = () => {
    return this.isWarning() ? `${this.props.hasWarning} warning` :
      !this.isRequired() && !this.props.meta.error && !this.props.meta.active ? `${this.props.hasWarning} true` : '';
  }

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

  getErrorClass = () => (
    this.isRequired() && !this.isWarning() ? 'error' : ''
  )

  render() {
    const {
      hasPasswordStrength, setPasswordScore, onTogglePassword, hasFloatLabel, textTransform,
      scoreWords, tooShortWord, title, errorMessage, hasWarning, warningMessage, ...renderFieldProps
    } = this.props;

    const password = (
      this.props.hasPasswordStrength && (
        <Fragment>
          <ReactPasswordStrength
            ref={this.passwordStrengthRef}
            className="has-float-label"
            minLength={5}
            minScore={2}
            changeCallback={this.callback}
            scoreWords={scoreWords}
            tooShortWord={tooShortWord}
            inputProps={{ ...this.props.input, ...renderFieldProps, autoComplete: "off", className: "form-control" }} />
          <Link
            className="toggle-password"
            to="#"
            text={this.props.text}
            icon={this.props.icon}
            isReverseOrder
            onClick={this.props.onTogglePassword}
          />
        </Fragment>
      )
    );
    return (
      this.props.readOnly ?
        <Fragment>
          <span className={this.props.className}>{this.props.input.value}</span>
        </Fragment> :
        <Fragment>
          {password}
          <div
            style={this.props.hasPasswordStrength ? { display: 'none' } : { display: '' }}
            className={`RenderField ${this.getFloatLabelStyle()} ${this.getErrorClass()} ${this.getWarningClass()}`}>
            {
              this.props.hasFloatLabel ?
                <Fragment>
                  <input
                    className="form-control"
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    {...this.props.input}
                    {...renderFieldProps} />
                  <label>{this.props.label}</label>
                  {this.invalidMessage()}
                  {this.warningMessage()}
                </Fragment> :
                <Fragment>
                  <label>{this.props.label}</label>
                  <input
                    className="form-control input"
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    {...this.props.input}
                    {...renderFieldProps} />
                </Fragment>
            }
          </div>
        </Fragment>
    );
  }
}

RenderField.defaultProps = {
  hasPasswordStrength: false
}

export default RenderField;
