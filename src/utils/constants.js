export const getFormBody = (params)=>{
    let formBody = [];

    for(let property in params){
        let encodedKey = encodeURIComponent(property); // user name => user%20name
        let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%20123

        formBody.push(encodedKey + '=' + encodedValue);
    }

    return formBody.join('&'); // 'username=aakash&password=123'
}

export const setItemInLocalStorage = (key, value) => {

    if(!key || !value){
        console.error("key or value is missing");
        return;
    }

    const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);

    localStorage.setItem(key, valueToStore);
}

export const getItemFromLocalStorage = (key) => {

    if(!key){
        console.error("key is missing");
        return;
    }

    return localStorage.getItem(key);
}

export const removeItemFromLocalStorage = (key) => {
    
        if(!key){
            console.error("key is missing");
            return;
        }
    
        localStorage.removeItem(key);
}