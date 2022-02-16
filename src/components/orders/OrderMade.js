import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import OrdersList from './OrdersList';

import '../../stylesheets/Main.css';

const orderMade = (props) => {
    const style = {
        display: 'flex',
        justifyContent: 'space-between'
    };

    return (
        <Card fluid>
            <Card.Content >
                <p><strong>Table - {props.order.place.placeName}</strong></p>
                <div style={style}>
                    <strong>
                        Date: {props.order.orderDate}
                    </strong>
                    <strong>
                        Ticket numéro: {props.order.ticketNumber}
                    </strong>

                </div>

            </Card.Content>


            <Card.Content>
                <OrdersList isForOrderMade={true} totalAmount={props.order.totalAmount} orders={props.order.productOrders} />
            </Card.Content>
            <Card.Content extra>
                <div className='ui three buttons'>
                <Button className={"button-style"} onClick={() => props.payOrder(props.order)}>
                    Payer
                </Button>
                <Button className={"button-style-1"} onClick={() => props.printOrder(props.order)}>
                    Addition
                </Button>
                <Button onClick={() => props.selectedOrderEvent(props.order)} color='yellow'>
                    Modifier
                </Button>
                </div>
            </Card.Content>
        </Card>
    );
};

export default orderMade;
