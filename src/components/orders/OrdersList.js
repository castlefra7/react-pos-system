import React from 'react'
import { Table } from 'semantic-ui-react'
import { currencyFormat } from '../function/NumberManipulation';

const ordersList = props => {

    let orders = [];
    if(Array.isArray(props.orders))  {
	orders = props.orders;
    }		
    return (
        <div>
            <h1>Total à payer: {currencyFormat(props.totalAmount)}</h1>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Produit</Table.HeaderCell>
                        <Table.HeaderCell>Prix unitaire</Table.HeaderCell>
                        <Table.HeaderCell>Total Prix</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {orders.map((order) => {
                        let amount = parseFloat(order.price) * parseInt(order.quantity);
                        if(props.isForOrderMade === true) {
							amount = order.totalAmount;
						}
                        return (
                            <Table.Row key={order.productID}>
                                <Table.Cell>{order.quantity + " * " + order.productName}</Table.Cell>
                                <Table.Cell>{currencyFormat(order.price)}</Table.Cell>
                                <Table.Cell>{currencyFormat(amount)}</Table.Cell>
                            </Table.Row>
                        );
                    })}

                </Table.Body>
            </Table>
        </div>
    )
};

export default ordersList;
