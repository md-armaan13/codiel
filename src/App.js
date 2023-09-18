import { useEffect, useState } from 'react'
import { getPosts } from './api/index.js'

import{Routes , Route} from 'react-router-dom';

import  Loader  from './components/Loader.js'
import Home from './pages/home.js'
import Login from './pages/login.js';
import Navbar from './components/Navbar.js';
function App() {
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
    <Navbar/>
  

      {/* {posts.map((post) => {
        return <div key={post._id}>{post.content}</div>
      })} */}
    
    <Routes>
      <Route path='/' element={<Home posts = {posts}/>}/>
      <Route path='/login' element={<Login/>}/>
      {/* <Route path='/create-post' element={<CreatePost/>}/> */}
      <Route path='*' element={<h1>Not Found</h1>}/>
   </Routes>
   </div>
  )
}

export default App
