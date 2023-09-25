
import '../styles/login.css'
import { useState } from 'react';
import {useNavigate ,Navigate} from 'react-router-dom'
import { useAuth } from '../hooks/index.js';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLogging , setLogging] = useState(false)
    const auth = useAuth()
    const navigate = useNavigate()
    if(auth.user){
      return  <Navigate to = '/' replace /> 
    }

    async function handleSubmit (e){
    e.preventDefault()
    console.log("values",email , password)
    setLogging(true)
    // Apply chechks here t
    if(password !== confirmPassword){
        alert("Password and Confirm Password do not match")
        setLogging(false)
        return
    }

    
      const response =  await auth.signup(name, email, password, confirmPassword)
      console.log(response)
      if(response.success){
        setLogging(false)
        console.log("success")
        navigate('/login')
      }else{
        console.log("failed")

      }
    setLogging(false)
  
}
  return (  
    <div className='cont' id='dddd'>
          <div className="create-post" id ="deded">
            <form onSubmit={handleSubmit}>
              <div className="container">
                <h1>Login In</h1>
                <hr/>

                <label for="title"><b>Email</b></label>
                <input type="text" onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Email" name="title" id="title" required/>

                <label for="name"><b>Name:</b></label>
                <input type="text" onChange={(e)=> setName(e.target.value)} placeholder="Enter Name" name="name" id="sub" required/>
                
                <label for="pass"><b>Password</b></label>
                <input type="text" onChange={(e)=> setPassword(e.target.value)} placeholder="Enter Password" name="pass" id="title" required/>

                <label for="conf"><b>Confirm Password:</b></label>
                <input type="text" onChange={(e)=> setConfirmPassword(e.target.value)} placeholder="Enter Confirm Password" name="conf" id="sub" required/>

                  <button type="submit" className="submitbtn" id = 'jj' disabled ={isLogging}> {isLogging ? 'Signing Up..': 'Sign Up'}</button>
              </div>
            </form> 
          </div>
     </div>
  )
}
