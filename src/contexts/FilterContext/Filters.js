import React, {useContext, useEffect, useReducer} from "react";
import {filterInitialState, filterReducer} from "../../reducers/Filters";
import {useProducts} from "../ProductsContext/Products";
import {SET_PRODUCTS_ON_FILTER, SORT_PRODUCTS, SWITCH_VIEW, UPDATE_SORT} from "../../utils/Constants";


const FilterContext = React.createContext()
const FilterProvider = ({children}) => {

    const {products} = useProducts()

    const [state, dispatch] = useReducer(filterReducer, filterInitialState)
    useEffect(() => {
        dispatch({type: SET_PRODUCTS_ON_FILTER, payload: products})
    }, [products]);

    useEffect(()=>{
        dispatch({type: SORT_PRODUCTS})
    }, [state.sort])
    const switchView = (view) => {
        dispatch({type: SWITCH_VIEW, payload: view})
    }


    const updateSort = (e) => {
        dispatch({type: UPDATE_SORT, payload: e.target.value})
    }

    return (
        <FilterContext.Provider value={{...state, switchView, updateSort}}>
            {children}
        </FilterContext.Provider>
    )
}

const useFilters = () => {
    return useContext(FilterContext)
}

export {FilterProvider, useFilters}
