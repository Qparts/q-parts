// import axios from 'axios';
//TODO: Replace these with the real api call from the server
import { data as groupData } from '../mockData/catalog/5/vin/1/groupData';
import { data as subgroupData } from '../mockData/catalog/5/car/1/group/1/subgroup';
import { data as partsData } from '../mockData/catalog/5/car/1/group/1/parts';
import { data as makerData } from '../mockData/makerMock';

export const FETCH_GROUP_SUCCEEDED = 'FETCH_GROUP_SUCCEEDED';
export const FETCH_SUBGROUP_SUCCEEDED = 'FETCH_SUBGROUP_SUCCEEDED';
export const FETCH_PARTS_SUCCEEDED = 'FETCH_PARTS_SUCCEEDED';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const FETCH_MAKER_DATA_SUCCEEDED = 'FETCH_MAKER_DATA_SUCCEEDED';
export const FIND_SELECTED_PART = 'FIND_SELECTED_PART';
export const CLEAN_SELECTED_PART = 'CLEAN_SELECTED_PART';

export const fetchUserSearch = (makerId, vinId) => {
  // return (dispatch) => {
  //   axios.get(`http://localhost:8080/mockData/catalog/${makerId}/vin/${vinId}/groupData.json`)
  //     .then(res => {
  //       dispatch({ type: FETCH_GROUP_SUCCEEDED, payload: res.data })
  //     })
  //     .catch(error => {
  //       dispatch({ type: REQUEST_FAILED, payload: error })
  //     })
  // }
  return {
    type: FETCH_GROUP_SUCCEEDED,
    payload: groupData
  }
}

export const fetchSubgroupSearch = (makerId, carId, groupId) => {
  // return (dispatch) => {
  //   axios.get(`http://localhost:8080/mockData/catalog/${makerId}/car/${carId}/group/${groupId}/subgroup.json`)
  //     .then(res => {
  //       dispatch({ type: FETCH_SUBGROUP_SUCCEEDED, payload: res.data })
  //     })
  //     .catch(error => {
  //       dispatch({ type: REQUEST_FAILED, payload: error })
  //     })
  // }
  return {
    type: FETCH_SUBGROUP_SUCCEEDED,
    payload: subgroupData
  }
}

export const fetchPartsSearch = (makerId, carId, groupId) => {
  // return (dispatch) => {
  //   axios.get(`http://localhost:8080/mockData/catalog/${makerId}/car/${carId}/group/${groupId}/parts.json`)
  //     .then(res => {
  //       dispatch({ type: FETCH_PARTS_SUCCEEDED, payload: res.data })
  //     })
  //     .catch(error => {
  //       dispatch({ type: REQUEST_FAILED, payload: error })
  //     })
  // }
  return {
    type: FETCH_PARTS_SUCCEEDED,
    payload: partsData
  }
}

export const fetchMakerData = () => {
  // return (dispatch) => {
  //   axios.get('http://localhost:8080/mockData/makerMock.json')
  //     .then(res => {
  //       dispatch({ type: FETCH_MAKER_DATA_SUCCEEDED, payload: res.data })
  //     })
  //     .catch(error => {
  //       dispatch({ type: REQUEST_FAILED, payload: error })
  //     })
  // }
  return {
    type: FETCH_MAKER_DATA_SUCCEEDED, 
    payload: makerData
  }
}

export const findSelectedPart = (partNumber) => {
  return {
    type: FIND_SELECTED_PART,
    payload: partNumber
  }
}

export const cleanSelectedPart = () => {
  return {
    type: CLEAN_SELECTED_PART,
  }
}