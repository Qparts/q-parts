import {
 FETCH_LATEST_POSTS_SUCCEEDED, FETCH_POSTS_IMG_SUCCEEDED
} from '../actions/blogAction';

export default function reducer(state = { posts: [] }, action) {
 switch (action.type) {
  case FETCH_LATEST_POSTS_SUCCEEDED:

   let newPosts = action.payload.map(data => {
    return { ...state.posts, id: data.id, title: data.title.rendered, link: data.link, image: '' };
   });

   return { ...state, posts: newPosts }

  case FETCH_POSTS_IMG_SUCCEEDED:
   const newImages = state.posts.map(post => {
    let findImg = action.payload.find(postId => post.id === postId.post);
    let { source_url } = findImg ? findImg : '';

    return { ...post, image: source_url}
   });

   return { ...state, posts: newImages}

  default:
   return state;
 }
}