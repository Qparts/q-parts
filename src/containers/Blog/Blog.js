import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchLatestPosts } from '../../actions/blogAction';
import './Blog.css';

class Blog extends Component {
 constructor(props) {
  super(props);

  this.props.fetchLatestPosts();
 }

 render() {
  let { posts } = this.props;
  
  if (posts.length <= 0) {
   return (
    <div>Loading...</div>
   );
  }
 
  return (
   <div id="Blog_menu-outer">
    <div className="Blog_table">
     <ul id="Blog_horizontal-list">
      {posts.map((post, id) => {
       return (
        <div className="Blog_list" key={id}>
         <li><a href={post.link}>{post.title}</a></li>
         <li><img className="Blog_img" src={post.image} alt="" /></li>
        </div>
       );
      })}
     </ul>
    </div>
   </div>
  );
 }
}

const mapStateToProps = state => {
 return {
  posts: state.blog.posts
 }
}

const mapDispatchToToprops = (dispatch) => {
 return bindActionCreators({
  fetchLatestPosts,
 }, dispatch)
}

export default connect(
 mapStateToProps,
 mapDispatchToToprops,
)(Blog)