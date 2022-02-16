import { STATISTICS_RECEIVED, CLEAR_STATISTICS } from '../actions';

const statistics = (state = {data: {totalOrders:0, totalTurnover: 0, totalProductsSold: 0, lineData: [], label: [], pieData: [], horizontalData: []}}, action) => {
    switch (action.type) {
        case CLEAR_STATISTICS:
            return {...state, data: {totalOrders:0, totalTurnover: 0, totalProductsSold: 0, lineData: [], label: [], pieData: [], horizontalData: []}};
        case STATISTICS_RECEIVED:
            return { ...state, data: action.data };
        default:
            return state;
    }
}

export default statistics;