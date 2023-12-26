import {SET_PRODUCTS_ON_FILTER, SWITCH_VIEW, UPDATE_SORT, SORT_PRODUCTS} from "../utils/Constants";

const filterInitialState = {
    filtered_products: [],
    all_products: [],
    grid_view: false,
    sort: 'price-lowest'
}

const filterReducer = (state, action) => {
    switch (action.type) {
        case SET_PRODUCTS_ON_FILTER:
            return {
                ...state,
                all_products: [...action.payload],
                filtered_products: [...action.payload]

            }
        case SWITCH_VIEW:
            if (action.payload === 'grid') {
                return {...state, grid_view: true}
            } else {
                return {...state, grid_view: false}
            }
        case UPDATE_SORT:

            return {...state, sort: action.payload}
        case SORT_PRODUCTS:
            let tempFilteredProducts = []
            switch (state.sort) {
                case "price-lowest":
                    tempFilteredProducts = state.filtered_products.sort((a, b) => a.price - b.price)
                    return {...state, filtered_products: tempFilteredProducts}
                case "price-highest":
                    tempFilteredProducts = state.filtered_products.sort((a, b) => b.price - a.price)
                    return {...state, filtered_products: tempFilteredProducts}
                case "name-az":
                    tempFilteredProducts = state.filtered_products.sort((a, b) => a.name.localeCompare(b.name))
                    return {...state, filtered_products: tempFilteredProducts}
                case "name-za":
                    tempFilteredProducts = state.filtered_products.sort((a, b) => b.name.localeCompare(a.name))
                    return {...state, filtered_products: tempFilteredProducts}
                default:
                    return {...state, filtered_products: tempFilteredProducts}
            }


        default:
            return state
    }
}

export {filterReducer, filterInitialState}