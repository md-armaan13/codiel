
import{Routes , Route ,Navigate} from 'react-router-dom';

import  Loader  from './components/Loader.js'
import Home from './pages/home.js'
import Login from './pages/login.js';
import Navbar from './components/Navbar.js';
import { useAuth } from './hooks/index.js';
import Signup from './pages/signup.js';
import Setting from './pages/setting.js';
import UserProfile from './pages/userProfile.js';

function PrivateRoute({children ,...rest}){
  const auth = useAuth()
      if(auth.user){
        return children
      }else{
        return <Navigate to = '/login' replace />
      }
}



function App() {
  const auth = useAuth()
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts(1, 5)
  //     console.log(response.data.posts)
  //     if (response.success) {
  //       setPosts(response.data.posts)
  //     }

  //     setIsLoading(false)
  //   }
  //   fetchPosts()
  // }, [])

  if(auth.loading){
    return <Loader />
  }
  return (
    <div className="App">
    <Navbar/>
  

      {/* {posts.map((post) => {
        return <div key={post._id}>{post.content}</div>
      })} */}
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      {/* <Route path='/create-post' element={<CreatePost/>}/> */}
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/setting' element={<PrivateRoute RouteKey="hello">{<Setting/>}</PrivateRoute>}/>
      <Route path='/users/:userId' element={<PrivateRoute RouteKey="hello">{<UserProfile/>}</PrivateRoute>}/>
      <Route path='*' element={<h1>Not Found</h1>}/>
   </Routes>
   </div>
  )
}

export default App
