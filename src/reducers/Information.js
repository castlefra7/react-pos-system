import { INFORMATION_ERROR, CLEAR_INFORMATION, INFORMATION_SUCCESS } from '../actions'

const information = (state = { isError: false, message: "" }, action) => {
    switch (action.type) {
        case INFORMATION_SUCCESS: 
            return {...state, message: action.successMessage, isError: false};
        case CLEAR_INFORMATION:
            return { ...state, message: "", isError: false };
        case INFORMATION_ERROR:
            return { ...state, message: action.errorMessage, isError: true };
        default:
            return state;
    }
}

export default information;