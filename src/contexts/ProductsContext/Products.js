import React, {useContext, useEffect, useReducer} from "react";
import {productsReducer, productsInitialState} from "../../reducers/Products";
import axios from "axios";
import {PRODUCTSURL, STORE_PRODUCTS, SET_PRODUCTS_LOADING, SET_PRODUCTS_ERROR} from "../../utils/Constants";


const ProductsContext = React.createContext(null)




const ProductsProvider = ({children}) => {
    const [state, dispatch] = useReducer(productsReducer, productsInitialState)

    const fetchProducts = async () => {
        dispatch({type: SET_PRODUCTS_LOADING})
        try {
            const response = await axios.get(PRODUCTSURL)
            dispatch({type: STORE_PRODUCTS, payload: response.data})
        } catch (e) {
            dispatch({type: SET_PRODUCTS_ERROR})
        }


    }

    useEffect(() => {
        fetchProducts()
    }, []);

    return (
        <ProductsContext.Provider value={{...state}}>
            {children}
        </ProductsContext.Provider>
    )
}

const useProducts = () => {
    return useContext(ProductsContext)
}

export {ProductsProvider, useProducts}