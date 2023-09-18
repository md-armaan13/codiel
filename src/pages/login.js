
import '../styles/login.css'
import { useState } from 'react';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogging , setLogging] = useState(false)
    async function handleSubmit (e){
    e.preventDefault()
    setLogging(true)
 
  
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
