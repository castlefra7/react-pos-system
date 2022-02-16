import React from 'react';
import SpecialInput from '../SpecialInput';
import { List } from 'semantic-ui-react';

const style = {
    display: 'flex',
    justifyContent: 'space-between'
}

const Order = props => (
    <List.Item>
        <div style={style}>
            <p style={{ fontSize: '14px', maxWidth: '150px' }}>{props.order.productName.charAt(0).toUpperCase() + props.order.productName.slice(1)}</p>

            <div>
                <SpecialInput price={props.order.price} decreaseQuantity={props.decreaseQuantity} productID={props.order.productID} increaseQuantity={props.increaseQuantity} quantity={props.order.quantity} />
            </div>
        </div>
    </List.Item>
);

export default Order;