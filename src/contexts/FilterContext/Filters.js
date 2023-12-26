import React, {useContext, useEffect, useReducer} from "react";
import {filterInitialState, filterReducer} from "../../reducers/Filters";
import {useProducts} from "../ProductsContext/Products";
import {
    SET_PRODUCTS_ON_FILTER,
    SORT_PRODUCTS,
    SWITCH_VIEW,
    UPDATE_SORT,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    RESET_FILTERS
} from "../../utils/Constants";


const FilterContext = React.createContext()
const FilterProvider = ({children}) => {

    const {products} = useProducts()

    const [state, dispatch] = useReducer(filterReducer, filterInitialState)
    useEffect(() => {
        dispatch({type: SET_PRODUCTS_ON_FILTER, payload: products})
    }, [products]);

    useEffect(() => {

        dispatch({type: FILTER_PRODUCTS})
        dispatch({type: SORT_PRODUCTS})
    }, [state.sort, state.filters])
    const switchView = (view) => {
        dispatch({type: SWITCH_VIEW, payload: view})
    }


    const updateSort = (e) => {
        dispatch({type: UPDATE_SORT, payload: e.target.value})
    }

    const updateFilters = (e) => {

        const name = e.target.name
        let value = e.target.value

        if(name === 'category' || name === 'company'){
            value = e.target.textContent
        }
        if(name === 'color') {
            value = e.target.dataset.color
        }
        if(name === "free_shipping") {
            value = e.target.checked
        }

        dispatch({type: UPDATE_FILTERS, payload: {name, value}})
    }

    const resetFilters = () => {

        dispatch({type: RESET_FILTERS})

    }

    return (
        <FilterContext.Provider value={{...state,
            switchView,
            updateSort,
            updateFilters,
            resetFilters
        }}>
            {children}
        </FilterContext.Provider>
    )
}

const useFilters = () => {
    return useContext(FilterContext)
}

export {FilterProvider, useFilters}
