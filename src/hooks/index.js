
import { useContext, useEffect, useState } from 'react';
import {AuthContext} from '../providers/AuthProvider.js'
import { login as userlogin , signup as userSignup , editUser ,fetchUserFriends} from '../api/index.js';
import { setItemInLocalStorage ,LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage,getItemFromLocalStorage} from '../utils/index.js';
import jwt from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
// custom hook used to consume the AuthContext and access the auth state and methods perfoem login and logout


// Toget the state and methods from the AuthContext, we use the useContext hook
export const useAuth =  () => {
    return useContext(AuthContext);
}

// TO change the state of the AuthContext, we use the useState hook
export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    // call the api to check if the user is logged in or not
    useEffect(() => {
        const getUser = async () => {
            const token = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
            if(token){
                const user = jwt(token);
                let tempUser = {};
                const { friendships, ...newUser } = user;
                tempUser=newUser
                const response = await fetchUserFriends();
                console.log("response" , response)
                if(response.success){
                
                tempUser.friendships = response.data.friends;
                console.log("Hook user" , tempUser)
               
            }else{
                tempUser.friendships = [];
            }
                setUser(tempUser);

        }
        setLoading(false)
    }
        getUser();
      
        //how to wait 5 seconds before setting loading to false  ?? 
        // setTimeout(() => {
        //     setLoading(false);
        // }, 5000);
        
    }, []);


    const login = async (email , password) => {
        const response = await userlogin(email, password);

        if (response.success){
            setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
            return {
                success : true,
            }
        }else{
            return {
                success : false,
                message : response.message,
            }
        }
    }
    const logout = () => {
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        navigate('/');
    }

    const signup = async (name, email, password, confirmPassword) => {
        const response = await userSignup(name, email, password, confirmPassword);
        if (response.success){
            return {
                success : true,
            }
        }else{
            console.log(response.message)
            return {
                success : false,
                message : response.message,
            }
            
        }

    }

    const updateUser = async (userId , name , password, confirmPassword) => {
        
        const response = await editUser(userId , name , password, confirmPassword);
        console.log(response)

        if (response.success){
            setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
            return {
                success : true,
            };
        }else{
            console.log(response.message)
            return {
                success : false,
                message : response.message,
            }
            
        }

        
    }

    const updateUserFriends = async (addFriend , friend) => {
        
        if(addFriend){
            setUser({
                ...user,
                friendships : [...user.friendships , friend]
            })
            console.log("FriendUser" , user)
            return;
        }else{
            const updatedFriendships = user.friendships.filter((friendship) => friendship.to_user._id !== friend.to_user._id)
            console.log("updatedFriendships" , updatedFriendships)
            setUser({
                ...user,
                friendships : updatedFriendships
            })
            console.log("FriendUser" , user)
            return;
        }
    
    }


    return {
        user,
        login,
        logout,
        signup,
        loading,
        updateUser,
        updateUserFriends,
    };

}