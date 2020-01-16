import { initialState } from '../initialState/apiInitialState';

import {
  SET_SELECTED_VEHICLES,
  GET_COUNTRY_SUCCEEDED, GET_COUNTRIES_SUCCEEDED, GET_COUNTRIES_REGIONS_SUCCEEDED, GET_VEHICLE_SUCCEEDED,
  FIND_CITY_SUCCEEDED, GET_REGIONS_SUCCEEDED, GET_RECENTLY_VIEWED, GET_SORTED_PRODUCTS,
  GET_COUNTRIES_ONLY_SUCCEEDED, FLAGE ,IS_VEHICLE_SELECTED, SET_SELECTED_VEHICLE,GET_SELECTED_VEHICLE, SET_SELECTED_VEHICLE_MODEL, SET_SELECTED_VEHICLE_YEAR,
  GET_SELECTED_VEHICLE_YEAR,
  GET_SELECTED_VEHICLE_MODEL,
  GET_SELECTED_VEHICLE_VIN,
  SET_SELECTED_VEHICLE_VIN,
UNSET_SELECTED_VEHICLES, UNSET_VEHICLE_FROM_SELECTED_VEHICLES,
} from '../actions/apiAction';
import  {CLEAR_FORM_DATA_FROM_CACHE } from "../actions/baseFormAction";


export default function reducer(state = initialState, action) {

  switch (action.type) {

    case GET_COUNTRY_SUCCEEDED:
      return { ...state, country: action.payload }

    case GET_COUNTRIES_REGIONS_SUCCEEDED:

      return { ...state, countriesRegions: action.payload }

    case GET_COUNTRIES_SUCCEEDED:

      return { ...state, countries: action.payload }

    case GET_COUNTRIES_ONLY_SUCCEEDED:
      return { ...state, countriesOnly: action.payload.data }

    case GET_VEHICLE_SUCCEEDED:
      return { ...state, vehicles: action.payload }
      
    case FIND_CITY_SUCCEEDED:
      return { ...state, city: action.payload[0] }

    case GET_REGIONS_SUCCEEDED:
      return { ...state, regions: action.payload.sort() }

    case GET_SORTED_PRODUCTS:
      return { ...state }

    case GET_RECENTLY_VIEWED:
      return { ...state, products: action.payload }

    case FLAGE:
    return { ...state, flage: action.payload }

    case IS_VEHICLE_SELECTED:
      return {...state , isVehicleSelected:action.payload}

      case SET_SELECTED_VEHICLES:
        return {
          ...state,
          selectedVehicles: [...state.selectedVehicles, action.payload]
        }


      case SET_SELECTED_VEHICLE:
        return {...state, selectedVehicle: action.payload }
      case SET_SELECTED_VEHICLE_MODEL:
        return {...state, selectedVehicleModel: action.payload }
      case SET_SELECTED_VEHICLE_YEAR:
        return {...state, selectedVehicleYear: action.payload }

        case SET_SELECTED_VEHICLE_VIN:
          return {...state, selectedVehicleVin: action.payload }

        case GET_SELECTED_VEHICLE:
          return state.selectedVehicle;

        case GET_SELECTED_VEHICLE_YEAR:
          return state.selectedVehicleYear;

        case GET_SELECTED_VEHICLE_MODEL:
          return state.selectedVehicleModel;

          case GET_SELECTED_VEHICLE_VIN:
          return state.selectedVehicleVin;

          case UNSET_SELECTED_VEHICLES:
            return {
              ...state, 
              selectedVehicles: [], 
              selectedVehicle: {
                id: null
              }
            }
          
           case UNSET_VEHICLE_FROM_SELECTED_VEHICLES:         
             return {
               ...state,
               selectedVehicles: state.selectedVehicles.filter(vehicle => vehicle.id !== action.payload.id),
               selectedVehicle: {
                 id: null
               }
             }

            case CLEAR_FORM_DATA_FROM_CACHE:
              return{

              }             
    default:
      return state;
  }

}
