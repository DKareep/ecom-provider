import {SET_PRODUCTS_ERROR, SET_PRODUCTS_LOADING, STORE_PRODUCTS} from "../utils/Constants";
import products from "../pages/Products/Products";

const productsInitialState = {
    loadingProducts: false,
    errorProducts: false,
    products: []
}
const productsReducer  = (state, action) => {
    switch (action.type) {
        case STORE_PRODUCTS:
           const products = action.payload
            return { ...state, products: products, loadingProducts: false}

        case SET_PRODUCTS_ERROR:
            return {...state, errorProducts: true, loadingProducts: false }

        case SET_PRODUCTS_LOADING:
            return {...state, errorProducts: false, loadingProducts: true }
        default:
            return state
    }


}

export  {productsReducer, productsInitialState}