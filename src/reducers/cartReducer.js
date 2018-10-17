import { initialState, } from '../initialState/cartInitialState';
import {
  ADD_TO_CART, CLEAR_CART, ADD_QUOTATION_TO_CART, GET_QUOTATION, GET_REPLIED_QUOTATION
} from '../actions/cartAction';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.payload;
      let found = false;

      state.purchasedItems.forEach((cartItem, index) => {
        if (product.id === cartItem.product.id) {
          found = true;
          return state.purchasedItems[index] = { ...cartItem, quantity: product.quantity + cartItem.quantity };
        }
      });

      if (!found) {
        const hasNoId = -1
        const generateId = Math.random().toString(36).substr(2, 9);
        const newId = product.id === hasNoId ? generateId : product.id;
        const newProduct = { ...product, id: newId }
        const quantity = newProduct.quantity;

        return { ...state, purchasedItems: [...state.purchasedItems, { product: newProduct, quantity }] };
      } else {
        return { ...state, purchasedItems: state.purchasedItems };
      }

    case CLEAR_CART:
      return { ...state, purchasedItems: initialState.purchasedItems }

    case ADD_QUOTATION_TO_CART:
      return { ...state, cartId: action.payload.cartId }

    case GET_QUOTATION:

      return { ...state, quotationsCart: action.payload }

    case GET_REPLIED_QUOTATION:
      return { ...state, repliedQuotations: action.payload };

    default:
      return state;
  }
}