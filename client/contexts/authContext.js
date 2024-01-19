import { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': return {
            user: action.payload
        }
        case 'LOGOUT': return {
            user: null
        }
        default: return {
            user: state
        }
    } 
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    }); 

    useEffect(() => {
        const fetchLocalUser = async() => {
            const user = await JSON.parse(AsyncStorage.getItem('user'));            
            if (user) {
                dispatch({type: "LOGIN", payload: user});
            }
        };
        fetchLocalUser();
    }, []);

    // console.log('AuthContext State: ', state);
    
    return <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
    </AuthContext.Provider>
}