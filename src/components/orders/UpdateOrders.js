import React, { Component } from 'react';
import { List, Button, Divider } from 'semantic-ui-react';
import Order from './Order';
import './Orders.css';
import { currencyFormat } from '../function/NumberManipulation';
import { bodyHeight } from '../function/Utilities';

import '../../stylesheets/Main.css'

class UpdateOrders extends Component {

    style = {};
    ordersStyle = {};

    constructor(props) {
        super(props);
        const navigationHeight = 75;
        const ordersHeight = bodyHeight(document) - navigationHeight;
        const ordersListHeight = ordersHeight - 200;
        this.style = {
            display: 'flex',
            flexDirection: 'column',
            height: ordersHeight,
            minHeight: ordersHeight,
            border: '1px solid black',
            padding: '5px'
        };
        this.ordersStyle = {
            height: ordersListHeight,
            minHeight: ordersListHeight,
            maxHeight: ordersListHeight,
            overflowY: 'scroll',
            paddingBottom: '17px'
        };
    }

    render() {
        let totalAmount = 0;
        const allOrders = this.props.selectedOrder.productOrders.map((product) => {
            totalAmount += (parseFloat(product.price) * parseInt(product.quantity));
            return (<Order decreaseQuantity={this.props.decreaseQuantity} increaseQuantity={this.props.increaseQuantity} key={product.productID} order={product} />);
        });
        totalAmount.toPrecision(2);
        const buttonStyle = {
            margin: '5px 0 0 0',
        };

        return (
            <div style={this.style}>
                <div style={this.ordersStyle}>
                    <h3>Commande en cours</h3>
                    <List size='tiny' divided verticalAlign='middle'>
                        {allOrders}
                    </List>
                </div>
                <div>
                    <Divider horizontal>Montant:</Divider>
                    <p style={{ textAlign: 'right', fontSize: '16px' }}>{currencyFormat(totalAmount)}</p>
                    <Button style={buttonStyle} fluid className={"button-style"} onClick={(e) => this.props.updateOrder()} color='blue'>Valider</Button>
                    <Button style={buttonStyle} fluid onClick={(e) => this.props.closeUpdateOrderModal()} color='grey'>Annuler</Button>
                </div>
            </div>
        );
    }
}

export default UpdateOrders;
