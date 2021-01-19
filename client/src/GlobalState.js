import React, {createContext, useState, useEffect} from "react";
import ProductsAPI from "./api/ProductsAPI";
import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false);

    const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token')

        setToken(res.data.accesstoken)
    }

    useEffect(() => {
        const firestLogin = localStorage.getItem('firstLogin')
        if (firestLogin) {
            refreshToken()
        }
    }, [])

    const state = {
        token: [token, setToken],
        ProductsAPI: ProductsAPI()
    }
    ProductsAPI();

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};
