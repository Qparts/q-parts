import { getVehicles, updateAppVersion } from './actions/apiAction';
import { renderToStaticMarkup } from "react-dom/server";
import { initialize } from 'react-localize-redux';
import globalTranslations from "./translations/translations.json";
import { LOCAL_LANGUAGES } from './constants';
import axios from 'axios';
import { API_ROOT } from './config/api';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (error) {

    }
}

export const clearState = (store) => {
    try {
        const serializedState = localStorage.getItem('state');
        const appVersion = JSON.parse(serializedState).api.appVersion;
        if (serializedState === null) {
            return undefined;
        }

        axios.get(`${API_ROOT}/app-version`)
            .then(res => {
                if (res.data !== appVersion) {
                    store.dispatch(updateAppVersion());
                    return localStorage.clear();
                }

            }, error => {

            })
    } catch (error) {

    }
}

export const initialStoreLoad = (store) => {
    const defaultLanguage = store.getState().localize.options.defaultLanguage || LOCAL_LANGUAGES[0].code;

    store.dispatch(initialize({
        languages: LOCAL_LANGUAGES,
        translation: globalTranslations,
        options: { renderToStaticMarkup, defaultLanguage }
    }));

    store.dispatch(getVehicles());
}