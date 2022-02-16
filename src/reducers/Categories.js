import {LOADING_CATEGORIES, RECEIVE_CATEGORIES, SHOW_PRODUCTS_CATEGORY} from '../actions'

const categories = (state = {data: [], isFetching: false}, action) => {
    switch(action.type) {
        case LOADING_CATEGORIES:
            return {...state, isFetching: true};
        case RECEIVE_CATEGORIES:
            const newState =  {...state, data: action.data, isFetching: false}
            console.log(newState); 
            return newState;
        case SHOW_PRODUCTS_CATEGORY:
            return {...state, isFetching: false}
        default:
            return state;
    }
}

export default categories;