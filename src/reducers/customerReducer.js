import { initialState } from '../initialState/customerInitialState';
import { SubmissionError } from 'redux-form';
import update from 'immutability-helper';
import {
  REQUEST_FAILED, LOAD_CURRENT_USER_DEATILS_SUCCEEDED, EDIT_USER_NAME_SUCCEDED, EDIT_USER_PHONE_NO_SUCCEDED, EDIT_USER_PASSWORD_SUCCEDED,
  EDIT_USER_EMAIL_SUCCEDED, REQUEST_VERIFICATION_NO, CONFIRM_USER_ADDRESS, LOGIN_SUCCEEDED, LOGOUT, SOCIAL_MEDIA_SIGNUP, EMAIL_SIGNUP, ADD_VEHICLE_SUCCEEDED, REGISTER_CUSTOMER_SUCCEEDED,
  VERIFY_CODE_NO_SUCCEEDED, SELECT_VEHICLE_FROM_GARAGE, VERIFY_MOBILE_NO_SUCCEEDED, LINK_SOCIAL_MEDIA_SUCCEEDED, ADD_ADDRESS_SUCCEEDED, ACCOUNT_VERIFIED_SUCCEDED, CLEAR_ADDRESS,
  COMPLETE_ORDER, DELETE_VEHICLE, ADD_WISHLIST, DELETE_WISHLIST, ADD_RECENT_VIEWED_PRODUCTS, CHANGE_DEFAULT_DIRECTION, REGISTERED, SELECT_COUNTRY,
  RESET_PASSWORD_SUCCEEDED, RESET_PASSWORD_TOKEN_SUCCEEDED, UPDATE_PASSWORD, COMPLETE_SHIPPING, COMPLETE_PAYMENT, GET_PENDING_REQUESTS, GET_COMPLETED_REQUESTS, SET_PASSWORD_SCORE, MODAL_ADD_TO_CART, SET_QUOTATION_ORDER,
  CHANGE_DEFAULT_ADDRESS, CHANGE_DEFAULT_VEHICLE, INCREMENRT_QUOTATION_PRODUCT_QUANTITY, DECREMENRT_QUOTATION_PRODUCT_QUANTITY, SET_LOADING, IS_VALID_CREDIT_CARD
} from '../actions/customerAction';
import { SET_DEFAULT_LANG } from '../actions/apiAction';
import { AR, quotations } from '../constants';
import _ from 'lodash';

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case LOAD_CURRENT_USER_DEATILS_SUCCEEDED:
      const detail = action.payload;
      return { ...state, detail }

    case EDIT_USER_NAME_SUCCEDED:
      const newFirstName = action.payload.name.firstName;
      const newLastName = action.payload.name.lastName;
      return { ...state, detail: { ...state.detail, firstName: newFirstName, lastName: newLastName } }

    case EDIT_USER_PHONE_NO_SUCCEDED:
      return { ...state, detail: { ...state.detail, mobile: action.payload } }

    case EDIT_USER_EMAIL_SUCCEDED:
      return state;

    case EDIT_USER_PASSWORD_SUCCEDED:
      return state;

    case REQUEST_VERIFICATION_NO:
      return { ...state }

    case ACCOUNT_VERIFIED_SUCCEDED:
      return getLoginObject(state, action);

    case CONFIRM_USER_ADDRESS:
      const newAddressGMap = {
        title: '',
        line1: action.payload.line1,
        line2: '',
        country: action.payload.country,
        city: action.payload.city,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      }
      return {
        ...state, address: newAddressGMap
      }

    case ADD_ADDRESS_SUCCEEDED:
      const newAddress = { ...state.detail, addresses: [...state.detail.addresses, action.payload] };
      return { ...state, detail: newAddress, address: initialState.address }

    case CLEAR_ADDRESS:
      return { ...state, address: initialState.address }

    case CHANGE_DEFAULT_ADDRESS:

      let cloneAddresses = [...state.detail.addresses];

      cloneAddresses.forEach((address, index) => {
        if (address.defaultAddress) cloneAddresses[index].defaultAddress = false;
      });

      const newDefaultAddress = update(cloneAddresses, {
        [action.payload]: { defaultAddress: { $set: true } }
      })

      return { ...state, detail: { ...state.detail, addresses: newDefaultAddress } }

    case CHANGE_DEFAULT_VEHICLE:

      let cloneVehicles = [...state.detail.vehicles];

      cloneVehicles.forEach((vehicle, index) => {
        if (vehicle.defaultVehicle) cloneVehicles[index].defaultVehicle = false;
      });

      const newDefaultVehicle = update(cloneVehicles, {
        [action.payload]: { defaultVehicle: { $set: true } }
      })

      return { ...state, detail: { ...state.detail, vehicles: newDefaultVehicle } }

    case LOGIN_SUCCEEDED:
      return getLoginObject(state, action);

    case LOGOUT:
      return {
        ...state,
        address: initialState.address,
        detail: initialState.detail,
        token: null,
        tokenExpire: null,

        selectedVehicle: initialState.selectedVehicle,
        registered: initialState.registered
      }

    case REQUEST_FAILED:
      const { field, error, currentLanguage } = action.payload;
      throw new SubmissionError({ [field]: translate(error, currentLanguage, state.detail.defaultLang) })

    case SOCIAL_MEDIA_SIGNUP:
      const newSocialMediaSignup = {
        ...state.detail,
        socialMediaId: action.payload.socialMediaId,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        platform: action.payload.platform
      }
      return { ...state, detail: newSocialMediaSignup };

    case EMAIL_SIGNUP:
      return { ...state, detail: initialState.detail };

    case ADD_VEHICLE_SUCCEEDED:
      const newVehicle = { ...state.detail, vehicles: [...state.detail.vehicles, action.payload] };
      return { ...state, detail: newVehicle }

    case REGISTER_CUSTOMER_SUCCEEDED:
      return getLoginObject(state, action);

    case VERIFY_CODE_NO_SUCCEEDED:
      return { ...state, detail: action.payload.customer, token: action.payload.token };

    case SELECT_VEHICLE_FROM_GARAGE:
      return { ...state, selectedVehicle: action.payload };

    case SELECT_COUNTRY:
      return { ...state, selectedCountry: action.payload };

    case VERIFY_MOBILE_NO_SUCCEEDED:
      return { ...state }

    case LINK_SOCIAL_MEDIA_SUCCEEDED:
      return state


    case COMPLETE_ORDER:
      return { ...state, isOrderCompleted: action.payload }

    case DELETE_VEHICLE:
      const removedVehicle = state.detail.vehicles.filter(vehicle => vehicle.id !== action.payload.id)

      return { ...state, detail: { ...state.detail, vehicles: removedVehicle } };

    case ADD_RECENT_VIEWED_PRODUCTS:
      let found = false;

      state.recentViewedProducts.forEach((product, index) => {
        if (product.id === action.payload.id) {
          found = true;
          state.recentViewedProducts.splice(index, 1);
          state.recentViewedProducts.unshift(product);
        }
      });

      if (!found) {
        const recentViewedProducts = getRecentProduct(state, action.payload);
        return { ...state, recentViewedProducts }
      } else {
        return { ...state }
      }

    case ADD_WISHLIST:
      const product = action.payload;
      let wishListfound = false;

      state.wishlist.forEach((wishlistItem, index) => {
        console.log(wishlistItem)
        if (product.id === wishlistItem.id) {
          wishListfound = true;
          return state.wishlist[index] = { ...wishlistItem, quantity: product.quantity + wishlistItem.quantity };
        }
      });

      if (!wishListfound) {

        return { ...state, wishlist: [...state.wishlist, { ...product, quantity: product.quantity }] };
      } else {
        return { ...state, wishlist: state.wishlist };
      }

    case DELETE_WISHLIST:
      const removedWishlist = state.wishlist.filter(wishlist => wishlist.id !== action.payload.id)

      return { ...state, wishlist: removedWishlist };

    case CHANGE_DEFAULT_DIRECTION:
      const newDirection = action.payload === AR ? 'rtl' : 'ltr';

      return { ...state, direction: newDirection }

    case REGISTERED:
      return { ...state, registered: true }

    case RESET_PASSWORD_SUCCEEDED:
      return { ...state }

    case RESET_PASSWORD_TOKEN_SUCCEEDED:
      return { ...state }

    case UPDATE_PASSWORD:
      return getLoginObject(state, action);

    case COMPLETE_SHIPPING:
      return { ...state, isShippingCompleted: action.payload }

    case COMPLETE_PAYMENT:
      return { ...state, isPaymentCompleted: action.payload }

    case SET_DEFAULT_LANG:
      return { ...state, defaultLang: action.payload }

    case GET_PENDING_REQUESTS:
      const pending = { ...state.quotations, pending: action.payload };

      return { ...state, quotations: pending }

    case GET_COMPLETED_REQUESTS:
      const completed = { ...state.quotations, completed: action.payload };

      return { ...state, quotations: completed }

    case SET_PASSWORD_SCORE:
      return { ...state, passwordScore: action.payload }

    case MODAL_ADD_TO_CART:
      return { ...state, isModalAddToCart: action.payload }

    case SET_QUOTATION_ORDER:
      return { ...state, isQuotationorderCompleted: action.payload }

    case INCREMENRT_QUOTATION_PRODUCT_QUANTITY:
      const { incQuantity } = action.payload;
      let newCompletedQuotationItemsInc = [];
      state.quotations.completed.forEach(quotations => {
        quotations.quotationItems.forEach(oldQuotationItem => {
          const { quotationItem } = action.payload;
          const newQuantityInc = oldQuotationItem.id === quotationItem.id ? incQuantity : oldQuotationItem.quantity
          newCompletedQuotationItemsInc.push({
            ...oldQuotationItem, quantity: newQuantityInc
          })
        })
      });

      const newQuotations = state.quotations.completed.map(item => {
        const { requestNumber } = action.payload;
        return {
          ...item, quotationItems: requestNumber === item.id ? newCompletedQuotationItemsInc : item.quotationItems
        }
      });

      return { ...state, quotations: { ...state.quotations, completed: newQuotations } }

    case DECREMENRT_QUOTATION_PRODUCT_QUANTITY:
      const { decQuantity } = action.payload;

      let newCompletedQuotationItemsDec = [];
      state.quotations.completed.forEach(quotations => {
        quotations.quotationItems.forEach(oldQuotationItem => {
          const { quotationItem } = action.payload;
          const newQuantity = oldQuotationItem.id === quotationItem.id ? decQuantity : oldQuotationItem.quantity
          newCompletedQuotationItemsDec.push({
            ...oldQuotationItem, quantity: newQuantity
          })
        })
      });

      const newQuotationsDec = state.quotations.completed.map(item => {
        const { requestNumber } = action.payload;
        return {
          ...item, quotationItems: requestNumber === item.id ? newCompletedQuotationItemsDec : item.quotationItems
        }
      });

      return { ...state, quotations: { ...state.quotations, completed: newQuotationsDec } }

     case SET_LOADING:
      return {
        ...state, isLoading: action.payload
      }

      case IS_VALID_CREDIT_CARD:
       return {
         ...state, isValidcreditCard: action.payload
       }

    default:
      return state;
  }
}

const getLoginObject = (state, action) => {
  const { customer, token, tokenExpire } = action.payload;
  return { ...state, detail: customer, token, tokenExpire }
}

const translate = (error, currentLanguage, defaultLang) => {
  const language = currentLanguage || defaultLang;
  if (language === AR) {
    return error[0];
  } else {
    return error[1];
  }
}

const getRecentProduct = (state, product) => {
  const reachedMax = 11;
  const cloneProduct = [...state.recentViewedProducts];
  cloneProduct.unshift(product);
  if (cloneProduct.length === reachedMax) {
    const deleteIndex = 10;
    cloneProduct.splice(deleteIndex, 1);
    return cloneProduct;
  } else {
    return cloneProduct;
  }
}
