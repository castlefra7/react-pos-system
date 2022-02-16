import React, { Component } from 'react'
import { Button, Table, Form, Input } from 'semantic-ui-react'
import '../../stylesheets/Main.css';
import { dateFormat } from '../function/Utilities';

class UpdateStocks extends Component {



    render() {


        const {
            stocks,
            sendStock,
            handleChange,
            // initialQuantity,
            // realQuantityLeft
        } = this.props;

        const style = {
            fontSize: '1.2em',
            fontWeight: 'bold'
        }
        return (
            <Table compact celled size='small' >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Produit</Table.HeaderCell>
                        <Table.HeaderCell>Quantité initiale</Table.HeaderCell>
                        <Table.HeaderCell>Quantité sortie</Table.HeaderCell>
                        <Table.HeaderCell>Quantité réelle</Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {stocks.map((stock) => (
                        <Table.Row key={stock.stockID}>
                            <Table.Cell>{dateFormat(stock.stockDate)}</Table.Cell>
                            <Table.Cell>{stock.productName}</Table.Cell>
                            <Table.Cell style={style}>
                                {/* <Form size="tiny">
                                    <Form.Field inline> */}
                                        <label>{stock.initialQuantity}</label>
                                        {/* <Input type="number" name="initialQuantity" onChange={(e) => handleChange(e, stock.stockID)} placeholder="Entrer nouvelle valeur" />
                                    </Form.Field> */}
                                {/* </Form> */}
                            </Table.Cell>
                            <Table.Cell style={style}>{stock.quantityLeft}</Table.Cell>
                            <Table.Cell style={style}>
                                {stock.isUpdated === 'n' ? (<Form size="tiny">
                                    <Input name="realQuantityLeft" onChange={(e) => handleChange(e)} type="number" placeholder="Entrer quantité réelle..." />
                                </Form>) : (<p>{stock.realQuantityLeft}</p>)}
                            </Table.Cell>
                            <Table.Cell collapsing>
                                <Button onClick={() => sendStock(stock.stockID, stock.initialQuantity)} size="tiny" color="yellow">Valider</Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>


            </Table>
        );
    }
}

export default UpdateStocks;