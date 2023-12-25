import React, {useCallback, useContext, useEffect, useReducer} from "react";
import {productsReducer, productsInitialState} from "../../reducers/Products";
import axios from "axios";
import {
    PRODUCTSURL,
    STORE_PRODUCTS,
    SET_PRODUCTS_LOADING,
    SET_PRODUCTS_ERROR,
    SET_PRODUCT_DETAILS_ERROR, SET_PRODUCT_DETAILS_LOADING, STORE_PRODUCT_DETAILS
} from "../../utils/Constants";


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

    const fetchSingleProduct = useCallback(async (id) => {
        dispatch({type: SET_PRODUCT_DETAILS_LOADING})
        try {
            const response = await axios.get(`${PRODUCTSURL}/${id}`)
            dispatch({type: STORE_PRODUCT_DETAILS, payload: response.data})
        } catch (e) {
            console.log(e)
            dispatch({type: SET_PRODUCT_DETAILS_ERROR})
        }
    }, [])

    useEffect(() => {
        fetchProducts()
    }, []);

    return (
        <ProductsContext.Provider value={{...state, fetchSingleProduct}}>
            {children}
        </ProductsContext.Provider>
    )
}

const useProducts = () => {
    return useContext(ProductsContext)
}

export {ProductsProvider, useProducts}