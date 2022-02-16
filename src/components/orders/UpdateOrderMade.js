import React, { Component } from 'react';
import { Grid, Modal, Header } from 'semantic-ui-react';
import MainContents from '../MainContents';
import UpdateOrders from './UpdateOrders';

class UpdateOrderMade extends Component {
    render() {

        const {
            showUpdateModal,
            closeUpdateOrderModal,
            selectedOrder,
            addNewOrder,
            showProducts,
            allCategories,
            currentProducts,
            updateOrder,
            increaseQuantity,
            decreaseQuantity,
        } = this.props;

        return (
            <Modal size='fullscreen' open={showUpdateModal} onClose={closeUpdateOrderModal} closeIcon>
                <Header content={selectedOrder.orderDate} />
                <Modal.Content >
                    <Grid stackable>
                        <Grid.Column style={{
                            padding: '5px',
                            overflowY: 'scroll',
                            maxHeight: '650px'
                        }} key={0} width={12}>

                            <MainContents
                                leftCategoryPosition='61.5em'
                                addNewOrder={addNewOrder}
                                showProducts={showProducts}
                                allCategories={allCategories}
                                currentProducts={currentProducts}
                            />

                        </Grid.Column>
                        <Grid.Column key={1} width={4}>
                            <UpdateOrders
                                closeUpdateOrderModal={closeUpdateOrderModal}
                                updateOrder={updateOrder}
                                decreaseQuantity={decreaseQuantity}
                                increaseQuantity={increaseQuantity}
                                selectedOrder={selectedOrder}
                            />
                        </Grid.Column>
                    </Grid>
                </Modal.Content>
            </Modal>
        );
    }

}

export default UpdateOrderMade;
