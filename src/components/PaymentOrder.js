import React from 'react'
import { Grid, Modal, Header, Button } from 'semantic-ui-react';
import OrdersList from './orders/OrdersList';
import '../stylesheets/Main.css'

const paymentOrder = (props) => {


    let content = (<Button className={'button-style'} onClick={() => props.sendPaymentToServer(props.location)} color='green'>Valider commande</Button>);

    if (props.isPayment === true) {
        content = (<Button className={'button-style'} onClick={() => props.sendPaymentToServer()} color='green'>Effectuer paiement</Button>);
    }
    const style = {
        backgroundColor: 'white'
    };

    return (
        <Modal style={style} open={props.showOrdersModal} size='large' onClose={props.closePaymentOrder} closeIcon>
            <Header style={style} content={"Table - " + props.textTable} />
            <Modal.Content style={style}>
                <Grid>
                    <Grid.Column width={6}>
                        <OrdersList totalAmount={props.totalAmount} orders={props.orders} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        {content}
                    </Grid.Column>
                </Grid>
            </Modal.Content>
        </Modal>
    )
};

export default paymentOrder;
