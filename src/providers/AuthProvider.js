import { createContext } from "react";
import { useProvideAuth } from "../hooks/index.js";


const initialState = { // initial state is an object with the following properties
    user: null,
    login: () => {},
    logout: () => {},
    signup: () => {},
    updateUser: () => {},
    updateUserFriends: () => {},
    loading: true,
};


// AuthContext is a React Context that allows us to share the auth state and methods
export const AuthContext = createContext(initialState);


// AuthProvider is a React component that wraps your app and makes auth object
export const AuthProvider = ({ children }) => {
    // children is the entire app
    // useProvideAuth is a custom hook that is used to manage auth state and methods
    const auth = useProvideAuth();
    return (
        // what is value prop?
        // The value prop is what is passed to consuming components that are descendants of this Provider.
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}