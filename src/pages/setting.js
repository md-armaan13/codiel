
import '../styles/setting.css'
import { useAuth } from '../hooks/index.js'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function Setting() {
    const auth = useAuth()
    const [editMode , setEditMode] = useState(false)
    const [name , setName] = useState(auth.user ? auth.user.name : " ")
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [savingForm , setSavingForm] = useState(false)

    console.log(password , confirmPassword ,name)
    const clearForm = () => {
      setPassword('')
      setConfirmPassword('')
    }

    // if(!auth.user){
    //   return  <Navigate to = '/' replace /> 
    // }

    const updateProfile = async (e) => {
      console.log("update profile")
      setSavingForm(true)
      if(!name || !password || !confirmPassword){
        alert("Please fill all the fields")
        setSavingForm(false)
        return
      }
      if(password !== confirmPassword){
        alert("Password and Confirm Password do not match")
        setSavingForm(false)
        return
      }
      const response = await auth.updateUser(auth.user._id , name , password , confirmPassword)
      if(response.success){
        alert("Profile Updated Successfully")
        setEditMode(false)
        setSavingForm(false)
        clearForm()
      }else{
        alert("Error in updating profile")
      }
      setSavingForm(false)
  }

   
    return (
      <div className="wrapper">
        <div className="profile">
          <div className="content">
            <h1>Profile</h1>
            <fieldset>
                <div className="grid-35">
                  <label for="email">Email Address</label>
                </div>
                <div className="grid-65">
                  <input type="email" id="email" tabIndex="6" value={auth.user ? auth.user.email : " "} disabled/>
                </div>
              </fieldset>
            <fieldset>
                <div className="grid-35">
                  <label for="email">Name</label>
                </div>
                <div className="grid-65">
                  <input type="" id="email" tabIndex="6" value ={name} onChange={(e)=> {setName(e.target.value)}} disabled={savingForm || !editMode} />
                </div>
               
              </fieldset>
             {editMode ? 
             <>
              <fieldset>
                <div className="grid-35">
                  <label for="email">Password</label>
                </div>
                <div className="grid-65">
                  <input type="Password" id="email" tabIndex="6" onChange={(e)=>{setPassword(e.target.value)}} disabled={savingForm} />
                </div>
              </fieldset>
              <fieldset>
                <div className="grid-35">
                  <label for="email">Confirm Password</label>
                </div>
                <div className="grid-65" >
                  <input type="password" id="email" tabIndex="6"  onChange={(e)=> {setConfirmPassword(e.target.value)}} disabled={savingForm}/>
                </div>
              </fieldset>
              
              </>
              : <div></div>
              }
              {editMode ?
              <fieldset>
                <input type="submit" className="Btn" value={savingForm ? "Saving data .." : "Save"} onClick={updateProfile} disabled={savingForm}/>
                <input type="button" className="Btn cancel" value="Back" onClick={(e)=>{setEditMode(false)}} />
              </fieldset>
              :
              <fieldset>
             
              <input type="submit" className="Btn" value="Edit Profile" onClick={(e)=>{setEditMode(true)}} />
              </fieldset>
               }
             
      
          
          </div>
        </div>
      </div>
      
      
    
    )


}