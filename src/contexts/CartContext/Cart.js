import React, {useContext, useEffect, useReducer} from "react";
import {cartInitialState, cartReducer} from "../../reducers/Cart";
import {ADD_TO_CART, CLEAR_CART, REMOVE_ITEM, TOGGLE_ITEM_AMOUNT, CALCULATE_TOTAL} from "../../utils/Constants";


const CartContext = React.createContext()
const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    useEffect(() => {
        dispatch({type: CALCULATE_TOTAL})
        localStorage.setItem("cart", JSON.stringify(state.cart))
    }, [state.cart]);
    const addToCart = ({id, productDetails, amount, defaultColor}) => {
        dispatch({type: ADD_TO_CART, payload: {id, productDetails, amount, defaultColor} })
    }

    const clearCart = () => {
        dispatch({type: CLEAR_CART})
    }

    const removeCartItem = (id) => {
        dispatch({type: REMOVE_ITEM, payload: id})
    }

    const toggleAmount = (id, amount) => {
        dispatch({type: TOGGLE_ITEM_AMOUNT, payload: {id, amount}})
    }

    return (
        <CartContext.Provider value={{...state, addToCart, clearCart,removeCartItem, toggleAmount}}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => {
    return useContext(CartContext)
}

export {CartProvider, useCart}