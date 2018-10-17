import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import manualOrder from './manualOrderReducer';
import blog from './blogReducer';
import catalog from './catalogReducer';
import customer from './customerReducer';
import createCommonForm from './hoc/formReducer';
import cart from './cartReducer';
import api from './apiReducer';
import { localizeReducer } from "react-localize-redux";
import networkError from './networkErrorReducer';

const MANUAL_FORM = 'MANUAL_FORM';

export default combineReducers({
 manualOrder,
 blog,
 catalog,
 customer,
 cart,
 api,
 manualForm: createCommonForm(MANUAL_FORM),
 form: formReducer,
 localize: localizeReducer,
 networkError
})