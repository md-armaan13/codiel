import {LOCALSTORAGE_TOKEN_KEY,API_URLS} from '../utils/index.js';

const customFetch = async (url, { body , ...customConfig}) => {

    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
        config.body = JSON.stringify(body);
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