import {STOCKS_RECEIVED} from '../actions'

const stocks = (state = {data: []}, action) => {
    switch(action.type) {
        case STOCKS_RECEIVED:
            return {...state, data: action.data};
        default:
            return state;
    }
}

export default stocks;