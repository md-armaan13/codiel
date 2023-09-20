
import { useContext, useEffect, useState } from 'react';
import {AuthContext} from '../providers/AuthProvider.js'
import { login as userlogin} from '../api/index.js';
import { setItemInLocalStorage ,LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage,getItemFromLocalStorage} from '../utils/index.js';
import jwt from 'jwt-decode';

// custom hook used to consume the AuthContext and access the auth state and methods perfoem login and logout


// Toget the state and methods from the AuthContext, we use the useContext hook
export const useAuth =  () => {
    return useContext(AuthContext);
}

// TO change the state of the AuthContext, we use the useState hook
export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // call the api to check if the user is logged in or not
    useEffect(() => {
        const token = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        if(token){
            const user = jwt(token);

            setUser(user);
        }
        //how to wait 5 seconds before setting loading to false  ?? 
        // setTimeout(() => {
        //     setLoading(false);
        // }, 5000);
        setLoading(false)
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
    }

    return {
        user,
        login,
        logout,
        loading,
    };

}