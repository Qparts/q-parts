import { API_ROOT } from '../config/api';
import { PRODUCT_SERVICE } from '../actions/constants';

import axios from 'axios';

export const getProduct = (props) => {
    const { match: { params: { productId } } } = props;
    return axios.get(`${API_ROOT}${PRODUCT_SERVICE}/product/${productId}`)
}

export const getGeneralSearch = (query) => {    
     return axios.get(`${API_ROOT}${PRODUCT_SERVICE}/search/general${query}`)
}