import {
    SET_PRODUCT_DETAILS_ERROR, SET_PRODUCT_DETAILS_LOADING,
    SET_PRODUCTS_ERROR,
    SET_PRODUCTS_LOADING,
    STORE_PRODUCT_DETAILS,
    STORE_PRODUCTS
} from "../utils/Constants";

const productsInitialState = {
    loadingProducts: false,
    errorProducts: false,
    products: [],

    loadingProductDetail: false,
    errorProductDetail: false,
    productDetails: {}
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

        case STORE_PRODUCT_DETAILS:
            return  {...state, productDetails: action.payload, loadingProductDetail: false}

        case SET_PRODUCT_DETAILS_ERROR:
            return  {...state, errorProductDetail: true, loadingProductDetail: false}
        case SET_PRODUCT_DETAILS_LOADING:
            return  {...state, loadingProductDetail: true, errorProductDetail: false}
        default:
            return state
    }


}

export  {productsReducer, productsInitialState}