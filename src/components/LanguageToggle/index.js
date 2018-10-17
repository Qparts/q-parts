import React from "react";
import { withRouter } from 'react-router-dom';
import { withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux';
import { changeDefaultLanguage } from "../../actions/customerAction";

const LanguageToggle = ({ localize, setActiveLanguage, changeDefaultLanguage }) => {
 const handleLanguage = (lang) => {
  setActiveLanguage(lang.code)

  changeDefaultLanguage(lang.code);
 }
 return localize.languages.map(lang => (
  !lang.active && (
   <button key={lang.code} onClick={handleLanguage.bind(this, lang)}>
    {lang.name}
   </button>
  )
 ))
}

const mapDispatchToProps = dispatch => {
 return {
  changeDefaultLanguage: (defaultLanguage) => dispatch(changeDefaultLanguage(defaultLanguage))
 }
}

const WithLanguageToggle = withLocalize(withRouter(LanguageToggle));

export default connect(null, mapDispatchToProps)(WithLanguageToggle);