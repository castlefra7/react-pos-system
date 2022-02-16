import React, { Component } from 'react';
import { List, Button, Divider, Form, Select } from 'semantic-ui-react';
import Order from './Order';
import './Orders.css';
import { currencyFormat } from '../function/NumberManipulation';
import { bodyHeight } from '../function/Utilities';
import PaymentOrder from '../PaymentOrder';
import '../../stylesheets/Main.css'

class Orders extends Component {

    style = {};
    ordersStyle = {};


    componentDidMount() {
        const navigationHeight = 125;
        const ordersHeight = bodyHeight(document) - navigationHeight;
        const ordersListHeight = ordersHeight - 175;
        this.allStyle = {
            display: 'flex',
            flexDirection: 'column',
            height: ordersHeight,
            minHeight: ordersHeight,
            maxHeight: ordersHeight,
            border: '1px solid white',
            padding: '5px'
        };
        this.ordersStyle = {
            height: ordersListHeight,
            minHeight: ordersListHeight,
            maxHeight: ordersListHeight,
            overflowY: 'scroll',
        };
        this.buttonStyle = {
            margin: '5px 0 0 0',
        }
    }


    render() {

        const {
            orders,
            decreaseQuantity,
            increaseQuantity,
            changeTable,
            idTable,
            textTable,
            openPaymentOrder,
            showOrdersModal,
            isPayment,
            closePaymentOrder,
            sendPaymentToServer,
            removeAmountReceived,
            addAmountReceived,
            amountReceived,
            tables
        } = this.props;

        let totalAmount = 0;
        const allOrders = orders.map((order) => {
            totalAmount += (parseFloat(order.price) * parseInt(order.quantity));
            return (<Order decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} key={order.productID} order={order} />);
        });
        totalAmount.toPrecision(2);
        return (
            <div>
                <div>
                    <Form>
                        <Form.Field inline>
                            <Select onChange={(event, value) => changeTable({id: value.value, text: event.target.innerText})} placeholder='Choisir une table' options={tables} />
                        </Form.Field>
                    </Form>
                </div>
                <div style={this.allStyle}>
                    <div style={this.ordersStyle}>
                        <p style={{ fontSize: '16px', borderBottom: '1px solid white', padding: '7px' }}><strong>Table - {textTable}</strong></p>
                        <List size='tiny' divided verticalAlign='middle'>
                            {allOrders}
                        </List>
                    </div>

                    <div>
                        <Divider horizontal>Montant:</Divider>
                        <p style={{ textAlign: 'right', fontSize: '16px' }}>{currencyFormat(totalAmount)}</p>
                        <Button className={'button-style'} style={this.buttonStyle} size='small' fluid onClick={(e) => openPaymentOrder(false, orders, idTable)}>Commande</Button>
                        <Button className={'button-style'} style={this.buttonStyle} size='small' fluid onClick={(e) => openPaymentOrder(true, orders, idTable)}>Paiement</Button>
                        <PaymentOrder
                            idTable={idTable}
                            textTable={textTable}
                            showOrdersModal={showOrdersModal}
                            isPayment={isPayment}
                            closePaymentOrder={closePaymentOrder}
                            sendPaymentToServer={sendPaymentToServer}
                            removeAmountReceived={removeAmountReceived}
                            addAmountReceived={addAmountReceived}
                            orders={orders}
                            amountReceived={amountReceived}
                            totalAmount={totalAmount}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Orders;
