import { initialState, } from '../initialState/cartInitialState';
import {
  ADD_TO_CART, CLEAR_CART, GET_QUOTATION, GET_REPLIED_QUOTATION, INCREMENRT_CART_PRODUCT_QUANTITY,
  DECREMENRT_CART_PRODUCT_QUANTITY, ADD_PAYMENT_METHOD, ADD_DELIVERY_ADDRESS, POST_CREDIT_CARD
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

    case GET_QUOTATION:

      return { ...state, quotationsCart: action.payload }

    case GET_REPLIED_QUOTATION:
      return { ...state, repliedQuotations: action.payload };

    case INCREMENRT_CART_PRODUCT_QUANTITY:
      const { incQuantity } = action.payload;

      const incCartItem = state.purchasedItems.map(oldItem => {
        const newQuantity = oldItem.product.id === action.payload.purchasedItem.id ? incQuantity : oldItem.quantity
        return {
          ...oldItem, quantity: newQuantity
        }
      });

      return { ...state, purchasedItems: incCartItem }

    case DECREMENRT_CART_PRODUCT_QUANTITY:
      const { decQuantity } = action.payload;

      const decCartItem = state.purchasedItems.map(oldItem => {
        const newQuantity = oldItem.product.id === action.payload.purchasedItem.id ? decQuantity : oldItem.quantity
        return {
          ...oldItem, quantity: newQuantity
        }
      });
      return { ...state, purchasedItems: decCartItem }

    case ADD_DELIVERY_ADDRESS:
      const newDeliveryAddress = { ...state.checkout, deliveryAddress: action.payload }
      return { ...state, checkout: newDeliveryAddress }

    case ADD_PAYMENT_METHOD:

      const { type, creditCard } = action.payload;

      let newPaymentMethod = { ...state.checkout, paymentMethod: type }
      if (creditCard) newPaymentMethod = { ...newPaymentMethod, paymentMethod: type, creditCard }
      return { ...state, checkout: newPaymentMethod }

    case POST_CREDIT_CARD:
      return { ...state, ...action.payload }

    default:
      return state;
  }
}