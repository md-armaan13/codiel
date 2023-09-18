import PropTypes from 'prop-types';

const Home = ({ posts }) => {
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
