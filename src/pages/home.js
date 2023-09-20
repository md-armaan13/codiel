import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getPosts } from '../api/index.js';
import Loader from '../components/Loader';


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
      {posts.map((post) => {
        return <div key={post._id}>{post.content}</div>;
      })}
    </div>
  );
};

export default Home;

Home.propTypes = {
  posts: PropTypes.array.isRequired
};
