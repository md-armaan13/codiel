import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getPosts } from '../api/index.js';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';


const Home = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts(1, 5)
      console.log(response.data.posts)
      if (response.success) {
        setPosts(response.data.posts)
      }

      setIsLoading(false)
    }
    fetchPosts()
  }, [])
  if(isLoading){
    return <Loader />
  }
  return (
    <div className="App">
      {posts.map((post , index) => {
        return <div className="container" style={style.container} key={index}>
        <div class="card text-white bg-secondary mb-3" style={style.maxWidth}>
        <Link class="card-header" to = {`/users/${post.user._id}`} state={{ user: post.user }}>{post.user.name}</Link>
        <div class="card-body">
          <p class="card-text">{post.content}</p>
          <span style={style.span}>Like 0</span>
        <span>Comment 0</span>
        </div>
      <input type="text" class="form-control" placeholder="Write a Comment"/>
      
        {/* comments */}

        {post.comments.map((comment) => {
          return    <div>
          <span style={style.span}>Name</span>
          <span>a minnute ago</span>
          <p>Comment</p>
          </div> 
        })}
   
      
        </div>
        </div>
;      
      })}
    </div>
  );
};

export default Home;

const style = {
maxWidth: {
maxWidth: 18 + 'rem',
display: 'flex',
},
container: {  
display: 'flex',
flexDirection: 'column',
width: '50%',
alignItems: 'center',
},
span: {
paddingRight: 13 + 'px',
}
};
