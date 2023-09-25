import {LOCALSTORAGE_TOKEN_KEY,API_URLS} from '../utils/index.js';
import { getFormBody } from '../utils/index.js';

//doc url - https://www.notion.so/aakashcn/Codeial-API-docs-3a4d0b5a42c54f0a94d951a42aabc13f
const customFetch = async (url, { body , ...customConfig}) => {

    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    // FOR ADDING AUTHORIZATION HEADER

    if(token){
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        ...customConfig, // method, headers, etc.
        headers: {
            ...headers,
            ...customConfig.headers, // if we want to add extra headera from customConfig
        },

    };

    if(body){
        config.body = getFormBody(body);
    }

    try{
        const response = await fetch(url, config);
        const data = await response.json();

        if(data.success){
            return {
                data : data.data,
                success : true,
            };
        }

        throw new Error(data.message);
    }
    catch(err){
        console.error(err);
        return {
            success : false,
            message : err.message,
        };
    }

}



export const getPosts = (page, limit) => {
    return customFetch(API_URLS.posts(page, limit),{
        method : 'GET',
    });

}

export const login = (email, password) => {
    return customFetch(API_URLS.login(),{
        body : {
            email,
            password,
        },
        method : 'POST',
    });
}

export const signup = (name, email, password, confirmPassword) => {
    return customFetch(API_URLS.signup(),{
        body : {
            name,
            email,
            password,
            confirm_password : confirmPassword,
        },
        method : 'POST',
    });
}

export const editUser = (userId ,name, password, confirmPassword) => {
    return customFetch(API_URLS.editUser(userId),{
        method : 'POST',
        body : {
            id : userId,
            name,
            password,
            confirm_password : confirmPassword,
        }
        
    });
}
    
export const fetchUserprofile = (userId) => {
    return customFetch(API_URLS.userInfo(userId),{
        method : 'GET',
    });
}

export const fetchUserFriends = () => {
    return customFetch(API_URLS.friends(),{
        method : 'GET',
    });
}

export const addFriend = (userId) => {
    return customFetch(API_URLS.createFriendship(userId),{
        method : 'POST',
    });
}

export const removeFriend = (userId) => {
    return customFetch(API_URLS.removeFriend(userId),{
        method : 'POST',
    });
}