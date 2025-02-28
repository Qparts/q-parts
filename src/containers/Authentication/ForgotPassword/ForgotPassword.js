import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { SmallScreen, MediumScreen } from '../../../components/Device/index.js'
import RenderField from '../../../components/RenderField/RenderField';
import { connect } from 'react-redux';
import * as validations from '../../../utils';
import { right } from '../../../utils';
import { getQuery } from '../../../utils';
//Router
import PrivateRoute from '../../../components/PrivateRoute/index.js'
import { Switch, Route } from 'react-router-dom';

import ConfirmSignUp from './ConfirmSignUp/ConfirmSignUp'
import { resetPassword, updatePassword } from '../../../actions/customerAction.js';
import Title from '../../../components/UI/Title/index.js';

const forgotPasswordUrl = '/password/forgot-password';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    }
  }
  componentDidMount = () => {
    this.setState({
      auth: !this.state.auth
    })
  }
  confirmPass = values => {
    const { match: { url } } = this.props;

    if (url === forgotPasswordUrl) {
      this.props.resetPassword(values)
        .then(() => {
          this.props.history.push('/');
        });
    } else {
      const data = { ...values, query: getQuery(this.props.location) }
      this.props.updatePassword(data)
        .then(() => {
          this.props.history.push('/');
        })
    }
  }

  getLabel = (forgotLabel, updateLabel) => {
    const { match: { url } } = this.props;
    return url === forgotPasswordUrl ? forgotLabel : updateLabel
  }

  renderPageContent = () => {
    const { translate } = this.props
    return (
          <section className="forgot-password">
            <div className="container-fluid">
              <aside>
                <img src="/img/password-recovery.svg" alt="upload-img" />
              </aside>
              <Title header={translate("forgotPassword.title")} />
              <p>
                <span>{translate("forgotPassword.textOne")}</span>
                 {translate("forgotPassword.textTwo")}</p>
              <form onSubmit={this.props.handleSubmit(this.confirmPass)}>
                <div className="form-row">
                  <div className="col">
                    <Field
                      label={this.getLabel(translate("forgotPassword.labels.email"), translate("forgotPassword.labels.password"))}
                      name={this.getLabel(translate("forgotPassword.labels.email"), translate("forgotPassword.labels.password"))}
                      component={RenderField}
                      type={this.getLabel('text', translate("forgotPassword.labels.password"))}
                      placeholder={this.getLabel('mail@user.com', translate("forgotPassword.placeholders.password"))}
                      validate={[validations.required]} />
                  </div>
                  <div className="col-md-auto">
                    <button type="submit" className="btn btn-primary">{translate("general.buttons.send")}<i className={`icon-arrow-${right(this.props.direction)}`} /></button>

                  </div>
                </div>
              </form>
            </div>
          </section>
    )
  }
  render() {
    return (
      <Switch>
        <Route path={'/password/forgot-password'} >
          {this.renderPageContent()}
        </Route>
        <Route path={'/password/reset-password'} >
          {this.renderPageContent()}
        </Route>
        <PrivateRoute
          path={'/password/forgot-password/confirm'}
          component={ConfirmSignUp}
          exact
          fakeAuth={this.state.auth}
          redirectTo="/" />
      </Switch>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: (email) => dispatch(resetPassword(email)),
    updatePassword: (data) => dispatch(updatePassword(data)),
  }
}

ForgotPassword = reduxForm({
  form: 'ForgotPassword',
  enableReinitialize: true
})(ForgotPassword)

export default connect(null, mapDispatchToProps)(withRouter(ForgotPassword));
