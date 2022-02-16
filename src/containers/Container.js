import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import MainContents from '../components/MainContents';
import { bodyHeight } from '../components/function/Utilities';
import { connect } from 'react-redux';
import Orders from '../components/orders/Orders'

import {
    fetchCategories,
    fetchProducts,
    showProductsCategory,
    addProductToOrder,
    increaseQuantityProduct,
    decreaseQuantityProduct,
    addAmountReceived,
    removeAmountReceived,
    togglePayment,
    sendPaymentToServer,
    openPayment,
    closePayment,
    changeTable,
    fetchAllPlaces
} from '../actions';

class Container extends Component {
    height = 0;

    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }

    componentDidMount() {
        this.props.getAllCategories();
        this.props.getAllProducts();
        this.props.fetchAllPlaces();
    }

    render() {
        const {
            categoriesData,
            showProducts,
            currentProducts,
            addNewOrder,
            increaseQuantity,
            decreaseQuantity,
            amountReceived,
            addAmountReceived,
            removeAmountReceived,
            isPayment,
            toggleIsPayment,
            orders,
            sendPaymentToServer,
            openPaymentOrder,
            closePaymentOrder,
            showOrdersModal,
            changeTable,
            idTable,
            tables,
            textTable
        } = this.props;

        const navigationHeight = 75;
        const height = bodyHeight(document) - navigationHeight;
        const style = {
            overflowY: 'scroll',
            height: height,
            minHeight: height,
            maxHeight: height,
        };


        return (
            <Grid stackable>

                <Grid.Column style={style} key={0} width={12}>
                    <MainContents
                        addNewOrder={addNewOrder}
                        showProducts={showProducts}
                        allCategories={categoriesData}
                        currentProducts={currentProducts}
                    />
                </Grid.Column>
                <Grid.Column key={1} width={4}>
                    <Orders
                        tables={tables}
                        idTable={idTable}
                        textTable={textTable}
                        changeTable={changeTable}
                        isPayment={isPayment}
                        orders={orders}
                        amountReceived={amountReceived}
                        showOrdersModal={showOrdersModal}

                        closePaymentOrder={closePaymentOrder}
                        sendPaymentToServer={sendPaymentToServer}
                        openPaymentOrder={openPaymentOrder}
                        toggleIsPayment={toggleIsPayment}
                        removeAmountReceived={removeAmountReceived}
                        addAmountReceived={addAmountReceived}
                        decreaseQuantity={decreaseQuantity}
                        increaseQuantity={increaseQuantity}
                    />
                </Grid.Column>
            </Grid>
        );
    }

}

const mapStateToProps = state => {
    return {
        categoriesData: state.categories.data,
        isFetchingCategories: state.categories.isFetching,
        currentProducts: state.products.currentProducts,
        amountReceived: state.payment.amountReceived,
        isPayment: state.payment.isPayment,
        orders: state.orders.currentOrders,
        showOrdersModal: state.payment.showOrdersModal,
        idTable: state.table.idCurrentTable,
        textTable: state.table.textCurrentTable,
        tables: state.table.data
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCategories: () => { dispatch(fetchCategories()) },
        getAllProducts: () => { dispatch(fetchProducts()) },
        showProducts: (categoryId) => { dispatch(showProductsCategory(categoryId)) },
        addNewOrder: (productId) => { dispatch(addProductToOrder(productId)) },
        increaseQuantity: (productId) => { dispatch(increaseQuantityProduct(productId)) },
        decreaseQuantity: (productId) => { dispatch(decreaseQuantityProduct(productId)) },
        addAmountReceived: (digit) => { dispatch(addAmountReceived(digit)) },
        removeAmountReceived: (removeAll) => { dispatch(removeAmountReceived(removeAll)) },
        toggleIsPayment: (value, callback) => { dispatch(togglePayment(value, callback)) },
        sendPaymentToServer: () => { dispatch(sendPaymentToServer()) },
        openPaymentOrder: (isPayment, orders, idTable) => { dispatch(openPayment(isPayment, orders, idTable)) },
        closePaymentOrder: () => { dispatch(closePayment()) },
        changeTable: (idTable) => { dispatch(changeTable(idTable)) },
        fetchAllPlaces: () => {dispatch(fetchAllPlaces())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
