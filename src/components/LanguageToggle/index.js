import React from "react";
import { withRouter } from 'react-router-dom';
import { withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux';
import { changeDefaultLanguage } from "../../actions/customerAction";

const LanguageToggle = ({ localize, setActiveLanguage, changeDefaultLanguage, translate, changeDefaultDirection, getCountriesOnly, width, closeNav }) => {
    const handleLanguage = (lang) => {
        setActiveLanguage(lang.code)

        changeDefaultLanguage(lang.code);
        getCountriesOnly(lang.code);
        changeDefaultDirection(lang.code);
        if (closeNav) closeNav();
    }
    return localize.languages.map(lang => (
        !lang.active && (
            <button style={{ width }} className="btn-link lang" key={lang.code} onClick={handleLanguage.bind(this, lang)}>
                {translate(`general.${lang.name}`)}
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
