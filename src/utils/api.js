import { API_ROOT } from '../config/api';
import { PRODUCT_SERVICE, CART_SERVICE, QUOTATION_SERVICE } from '../actions/constants';

import axios from 'axios';

export const getProduct = (props) => {
    const { match: { params: { productId } } } = props;
    return axios.get(`${API_ROOT}${PRODUCT_SERVICE}/product/${productId}`)
}

export const getGeneralSearch = (query) => {
    return axios.get(`${API_ROOT}${PRODUCT_SERVICE}/search/general${query}`)
}

export const getBestSeller = () => {
    return axios.get(`${API_ROOT}${PRODUCT_SERVICE}/products/best-sellers`)
}

export const getOffers = () => {
    return axios.get(`${API_ROOT}${PRODUCT_SERVICE}/products/offers`)
}

export const postCreditCard = (data) => {
    return axios.post(`${API_ROOT}${CART_SERVICE}/cart/credit-card`, data)
}

export const postWireTransfer = (data) => {
    return axios.post(`${API_ROOT}${CART_SERVICE}/cart/wire-transfer`, data)
}

export const paymentResponse = (query) => {
    return axios.get(`${API_ROOT}${CART_SERVICE}/payment/3dsecure-response${query}`)
}

export const postQuotation = (data) => {
    return axios.post(`${API_ROOT}${QUOTATION_SERVICE}`, data);
}