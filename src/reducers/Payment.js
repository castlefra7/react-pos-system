import { ADD_AMOUNT_RECEIVED, REMOVE_AMOUNT_RECEIVED, MAKE_PAYMENT, TOGGLE_PAYMENT, PAYMENT_SENT, OPEN_PAYMENT, CLOSE_PAYMENT } from '../actions';

const payment = (state = { amountReceived: "", isPayment: false, paymentSent: false, showOrdersModal: false}, action) => {
    let newState;
    switch (action.type) {
        case CLOSE_PAYMENT:
            return {...state, showOrdersModal: false};
        case OPEN_PAYMENT:
            newState = {...state};
            
            
            const {orders, idTable } = action;

            if(orders.length === 0 || idTable === "") {
                return state;
            } else {

                newState["isPayment"] = action.isPayment;
                newState["showOrdersModal"] = true;
                return newState;
            }
            

        case PAYMENT_SENT:
            return {...state, paymentSent: true, showOrdersModal: false};
        case MAKE_PAYMENT:
            // NOTHING YET
            return state;
        case TOGGLE_PAYMENT:
            newState = {...state};
            newState['isPayment'] = action.value;
            action.callBack();
            return newState;
        case REMOVE_AMOUNT_RECEIVED:
            if (action.removeAll === false) {
                if (state.amountReceived !== 0) {
                    return { ...state, amountReceived: state.amountReceived.substr(0, state.amountReceived.length - 1) }
                }
                break;
            } else {
                return { ...state, amountReceived: 0 };
            }
        case ADD_AMOUNT_RECEIVED:
            return { ...state, amountReceived: state.amountReceived + action.digit };
        default:
            return state;
    }
};

export default payment;