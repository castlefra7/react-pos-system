import categories from './Categories';
import products from './Products';
import orders from './Orders';
import payment from './Payment';
import user from './User';
import table from './Table';
import information from './Information';
import stocks from './Stocks';
import statistics from './Statistics';

const rootReducer = (state = {}, action) => {
    const allProducts = state.products;
    
    return {
        categories: categories(state.categories, action),
        products: products(state.products, action),
        orders: orders(state.orders, {...action, allProducts}),
        user: user(state.user, action),
        payment: payment(state.payment, action),
        table: table(state.table, action),
        information: information(state.information, action),
        stocks: stocks(state.stocks, action),
        statistics: statistics(state.statistics, action)
    };
};

export default rootReducer;