
import '../styles/login.css'
import { useState } from 'react';
import { useAuth } from '../hooks/index.js';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogging , setLogging] = useState(false)
    const auth = useAuth()
    console.log(auth)

    async function handleSubmit (e){
    e.preventDefault()
    console.log("values",email , password)
    setLogging(true)
    const response =  auth.login(email, password)
    if(response.success){
        console.log("success")

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

                <label for="sub"><b>Password:</b></label>
                <input type="text" onChange={(e)=> setPassword(e.target.value)} placeholder="Enter Password" name="sub" id="sub" required/>

                  <button type="submit" className="submitbtn" id = 'jj' disabled ={isLogging}> {isLogging ? 'Logging In..': 'Log In'}</button>
              </div>
            </form> 
          </div>
     </div>
  )
}
