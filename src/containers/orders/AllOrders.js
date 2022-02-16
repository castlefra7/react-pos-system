import React, { Component } from 'react'
import { Grid, Form, Select, Checkbox } from 'semantic-ui-react';
import OrderMade from '../../components/orders/OrderMade';
import UpdateOrderMade from '../../components/orders/UpdateOrderMade';
import { bodyHeight } from '../../components/function/Utilities';
import PaymentOrder from '../../components/PaymentOrder';

import {
    fetchCategories,
    fetchProducts,
    showProductsCategory,
    fetchUnpaidOrders,
    setSelectedOrder,
    unSetSelectedOrder,
    sendPrintOrder,
    sendUpdatedOrder,
    payOrder,
    addProductToUnpaidOrder,
    increaseUnpaidQuantity,
    decreaseUnpaidQuantity,
    sendUnpaidOrderPayment,
    closeUnpaidModal,
    changeTable,
    fetchAllPlaces
} from '../../actions';

import { connect } from 'react-redux';

class AllOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            showAllTables: true
        };
    }

    componentDidMount() {
        this.props.getAllCategories();
        this.props.getAllProducts();
        this.props.getAllUnpaidOrders();
        this.props.getAllTables();
    }

    toggleShow = () => {
        this.setState({ showAllTables: !this.state.showAllTables });
    }

    render() {
        const {
            categoriesData,
            showProducts,
            currentProducts,
            unpaidOrders,
            allProducts,
            setSelectedOrder,
            selectedOrder,
            showUpdateOrderModal,
            unsetSelectedOrder,
            sendPrintOrder,
            sendUpdatedOrder,
            payOrder,
            showPaymentModal,
            sendUnpaidOrderPayment,
            closeUnpaidModal,
            addProductToUnpaidOrder,
            increaseUnpaidQuantity,
            decreaseUnpaidQuantity,
            tables,
            changeTable,
            idTable,
            textTable
        } = this.props;

        let filteredUnpaidOrders = unpaidOrders;
        if (idTable !== "") {


            filteredUnpaidOrders = unpaidOrders.filter((value, index, array) => {
                return value.placeId === idTable;
            });
        }
        if (this.state.showAllTables)
            filteredUnpaidOrders = unpaidOrders;

        let content = (<p>Pas de commandes non payées</p>);
        if (Array.isArray(filteredUnpaidOrders)) {
            content = filteredUnpaidOrders.map(order => {
                return (
                    <Grid.Column key={order.orderID}>
                        <OrderMade
                            printOrder={sendPrintOrder}
                            payOrder={payOrder}
                            selectedOrderEvent={setSelectedOrder}
                            order={order}
                        />
                    </Grid.Column>);
            });
        };
        const navigationHeight = 75;
        const style = {
            padding: '5px',
            overflowY: 'scroll',
            maxHeight: bodyHeight(document) - navigationHeight
        };

        return (<div  style={style}>



            <Grid column={1} key={0}>
                <Grid.Column width={12}>
                    <h2>Commandes non payées. {this.state.showAllTables ? "Toutes les tables" : `Table - ${textTable}`}</h2>
                    <Form>
                        <Form.Field inline>
                            <label>Choisir une table:</label>
                            <Select onChange={(event, value) => changeTable({ id: value.value, text: event.target.innerText })} placeholder='Choisir une table' options={tables} />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox checked={this.state.showAllTables} onChange={() => this.toggleShow()} label='Afficher toutes les tables' />
                        </Form.Field>
                    </Form>
                </Grid.Column>

            </Grid>
            <Grid key={1} columns='3'>

                {content}

                <UpdateOrderMade
                    currentProducts={currentProducts}
                    showProducts={showProducts}
                    allCategories={categoriesData}
                    allProducts={allProducts}
                    selectedOrder={selectedOrder}
                    error={this.state.error}

                    closeUpdateOrderModal={unsetSelectedOrder}
                    showUpdateModal={showUpdateOrderModal}
                    addNewOrder={addProductToUnpaidOrder}
                    increaseQuantity={increaseUnpaidQuantity}
                    decreaseQuantity={decreaseUnpaidQuantity}
                    updateOrder={sendUpdatedOrder}
                />

                <PaymentOrder
                    idTable={selectedOrder.placeId}
                    textTable={selectedOrder.place === undefined ? "" : selectedOrder.place.placeName}
                    isPayment={true}
                    totalAmount={selectedOrder.totalAmount}
                    orders={selectedOrder.productOrders}
                    showOrdersModal={showPaymentModal}
                    closePaymentOrder={closeUnpaidModal}
                    sendPaymentToServer={sendUnpaidOrderPayment}
                />
            </Grid></div>);
    }
}

const mapStateToProps = state => {
    return {
        categoriesData: state.categories.data,
        currentProducts: state.products.currentProducts,
        unpaidOrders: state.orders.unpaidOrders,
        allProducts: state.products.data,
        selectedOrder: state.orders.selectedOrder,
        showUpdateOrderModal: state.orders.showUpdateOrderModal,
        showPaymentModal: state.orders.showPaymentModal,
        tables: state.table.data,
        idTable: state.table.idCurrentTable,
        textTable: state.table.textCurrentTable
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCategories: () => { dispatch(fetchCategories()) },
        getAllProducts: () => { dispatch(fetchProducts()) },
        showProducts: (categoryId) => { dispatch(showProductsCategory(categoryId)) },
        getAllUnpaidOrders: () => { dispatch(fetchUnpaidOrders()) },
        setSelectedOrder: (order) => { dispatch(setSelectedOrder(order)) },
        unsetSelectedOrder: () => { dispatch(unSetSelectedOrder()) },
        sendPrintOrder: (order) => { dispatch(sendPrintOrder(order)) },
        sendUpdatedOrder: () => { dispatch(sendUpdatedOrder()) },
        payOrder: (order) => { dispatch(payOrder(order)) },
        sendUnpaidOrderPayment: () => { dispatch(sendUnpaidOrderPayment()) },
        closeUnpaidModal: () => { dispatch(closeUnpaidModal()) },
        addProductToUnpaidOrder: (idProduct) => { dispatch(addProductToUnpaidOrder(idProduct)) },
        increaseUnpaidQuantity: (idProduct) => { dispatch(increaseUnpaidQuantity(idProduct)) },
        decreaseUnpaidQuantity: (idProduct) => { dispatch(decreaseUnpaidQuantity(idProduct)) },
        changeTable: (idTable) => { dispatch(changeTable(idTable)) },
        getAllTables: () => { dispatch(fetchAllPlaces()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
