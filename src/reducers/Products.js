import {RECEIVE_PRODUCTS, SHOW_PRODUCTS_CATEGORY, CLEAR_PRODUCTS, RECEIVE_ALL_PRODUCTS} from '../actions';

const products = (state = {data: [], dataForCateg: [], currentProducts: [], isFetching:false}, action) => {
    switch(action.type) {
        case RECEIVE_ALL_PRODUCTS:
            return {...state, data: action.data}
        case CLEAR_PRODUCTS:
            return {data:[], currentProducts: [], dataForCateg:[], isFetching: false};
        case SHOW_PRODUCTS_CATEGORY:
            let currentProducts = [];
            state.dataForCateg.forEach((productsCateg) => {
                if (productsCateg.categoryID.trim() === action.categoryId.trim()) {
                    currentProducts = productsCateg.products;
                }
            });
            return {...state, currentProducts}
        case RECEIVE_PRODUCTS:
            const newData = [...state.dataForCateg];
            newData.push(action.data);
            return {...state, dataForCateg: newData}
        default:
            return state;
    }
};

export default products;