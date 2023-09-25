
import '../styles/userprofile.css'
import { useAuth } from '../hooks/index.js'
import { useEffect, useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import { addFriend, fetchUserFriends, fetchUserprofile, removeFriend } from '../api';
import Loader from '../components/Loader';

export default function UserProfile() {
    
    const [user , setUser] = useState({});
    const [loading , setLoading] = useState(true);
    const {userId} = useParams()
    const [requestInProgress , setRequestInProgress] = useState(false)
    const navigate = useNavigate()
    const auth = useAuth()
    console.log("Authuser" , auth.user)
    useEffect(() => {
        const getUser = async () => {
            if(userId){
                const response = await fetchUserprofile(userId)
                console.log("Profile response" , response)
                if(response.success){
                    setUser(response.data.user)
                }else{
                    alert("Error in fetching user")
                    return navigate('/')
                }
            }
           
           setLoading(false)
        }
        getUser()
    }, [userId])
    if(loading){
        return <Loader />
    }
    const checkIfUserIsAFriend = () => {
        // check if the user is a friend or not
        // if yes then show remove friend button
        // else show add friend button
        const friend = auth.user.friendships;
        console.log("friend" , friend)
        const friendIds = friend.map((friend) => friend.to_user._id)
        const index = friendIds.indexOf(userId)
        if(index !== -1){
            return true
         } else{
            return false   
        }

    }

    const showAddBtn = checkIfUserIsAFriend()

    const handleAddFriend = async () => {
        setRequestInProgress(true)

        const response = await addFriend(userId)
        console.log("response profile" , response)
        if(response.success){
            const {friendship} = response.data
            console.log("friendship" , friendship)
            auth.updateUserFriends(true , friendship)
        
        }else{
            alert("Error in adding friend")
        }
        setRequestInProgress(false)

    }
   const handleRemoveFriend = async () => {
    setRequestInProgress(true)
    const response = await removeFriend(userId)
    const friend = auth.user.friendships.find((friend) => {
       return friend.to_user._id===userId});
        console.log("Remove friend" , friend)
    if(response.success){
        auth.updateUserFriends(false , friend)
       
   }
    setRequestInProgress(false)
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
                  <input type="email" id="email" tabIndex="6" value={user.email} disabled/>
                </div>
              </fieldset>
            <fieldset>
                <div className="grid-35">
                  <label for="email">Name</label>
                </div>
                <div className="grid-65">
                  <input type="" id="email" tabIndex="6" value ={user.name}  disabled />
                </div>
               
              </fieldset>
             
             
              <fieldset>
                {showAddBtn ? <input type="button" className="Btn cancel" value= {requestInProgress ? "Removing Friend.." : "Remove Friend"} disabled={requestInProgress} onClick={handleRemoveFriend}/> : <input type="submit" className="Btn" value= {requestInProgress ? "Adding Friend.." : "Add Friend"} disabled={requestInProgress} onClick={handleAddFriend} />}
              </fieldset>  
          
          </div>
        </div>
      </div>
      
      
    
    )


}