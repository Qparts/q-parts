import axios from 'axios';
import { WORDPRESS_API_ROOT } from '../actions/constants';

export const FETCH_LATEST_POSTS_SUCCEEDED = 'FETCH_LATEST_POSTS_SUCCEEDED';
export const FETCH_POSTS_IMG_SUCCEEDED = 'FETCH_POSTS_IMG_SUCCEEDED';


export const fetchLatestPosts = () => {
  return (dispatch) => {

    axios.get(`${WORDPRESS_API_ROOT}/posts`, {
    })
      .then(res => {
        dispatch({ type: FETCH_LATEST_POSTS_SUCCEEDED, payload: res.data })
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(`${WORDPRESS_API_ROOT}/media`, {
    })
      .then(res => {
        dispatch({ type: FETCH_POSTS_IMG_SUCCEEDED, payload: res.data })
      })
      .catch(error => {
        console.log(error);
      });
  }
}