import React from "react";
import { withRouter } from 'react-router-dom';
import { withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux';
import { changeDefaultLanguage } from "../../actions/customerAction";

const LanguageToggle = ({ localize, setActiveLanguage, changeDefaultLanguage, translate, changeDefaultDirection }) => {
    const handleLanguage = (lang) => {
        setActiveLanguage(lang.code)

        changeDefaultLanguage(lang.code);
        changeDefaultDirection(lang.code);
    }
    return localize.languages.map(lang => (
        !lang.active && (
            <a className="lang link" key={lang.code} onClick={handleLanguage.bind(this, lang)}>
                {translate(`general.${lang.name}`)}
            </a>
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