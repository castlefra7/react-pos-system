import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import OrderMade from '../orders/OrderMade'
import serverIP from '../function/ServerInfo';
import PaymentOrder from '../PaymentOrder';
import UpdateOrderMade from '../orders/UpdateOrderMade';
import { getValue } from '../function/Utilities';

class PlaceOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            currentPlace: {},

            selectedOrder: {},
            showUpdateModal: false,
            allCategories: [],
            allProducts: [],
            currentProducts: [],
            error: '',
            showPaymentModal: false,
            amountReceived: 0
        };

        this.selectedOrderEvent = this.selectedOrderEvent.bind(this);
        this.closeUpdateOrderModal = this.closeUpdateOrderModal.bind(this);

        this.addNewOrder = this.addNewOrder.bind(this);
        this.increaseQuantity = this.increaseQuantity.bind(this);
        this.decreaseQuantity = this.decreaseQuantity.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.payOrder = this.payOrder.bind(this);
        this.addAmountReceived = this.addAmountReceived.bind(this);
        this.removeAmountReceived = this.removeAmountReceived.bind(this);
        this.sendPaymentoServer = this.sendPaymentoServer.bind(this);
        this.closePaymentModal = this.closePaymentModal.bind(this);
        this.getAllUnpaidOrders = this.getAllUnpaidOrders.bind(this);
        this.printOrder = this.printOrder.bind(this);
        this.makeNewOrder = this.makeNewOrder.bind(this);
        
    }

    componentDidMount() {
        console.log("PLACE ORDERS");
        const allCategoriesURL = `${serverIP}/api/categories`;
        fetch(allCategoriesURL, { mode: 'cors' })
            .then(result => {
                return result.json();
            })
            .then(data => {
                console.log("CMP DID MOUNT 1: ");
                console.log(data);
                let allCategories = data;
                this.setState({ allCategories });


                allCategories.forEach((category) => {
                    let productCategory = { categoryID: category.categoryID };
                    const allProductsCategoryURL = `${serverIP}/api/products/${category.categoryID}`;

                    fetch(allProductsCategoryURL, { mode: 'cors' })
                        .then(result => { return result.json() })
                        .then(data => {
                            console.log("CMP DID MOUNT 2");
                            console.log(data);

                            //TODO: HOW TO CHECK IF OBJECT IS ARRAY
                            productCategory["products"] = data;
                            const { allProducts } = this.state;
                            data.forEach(product => {
                                if (product["productImage"] === undefined || product["productImage"] === null)
                                    product["productImage"] = 'default.jpg';
                            });
                            this.setState({ allProducts: [...allProducts, productCategory] });

                        })
                        .catch(function (error) {
 
                        });
                });


            })
            .catch((error) => {
                this.setState({ error });
            });
            
            
        const placeID = getValue(this.props.location, "placeID");
        const placeName = getValue(this.props.location, "placeName");
        this.setState({currentPlace: {placeID: placeID, placeName}}, () => {
            this.getAllUnpaidOrders();
        });
	
        // GET ALL ORDERS OF THIS PARTICULAR TABLE
        //
        
    }

    getAllUnpaidOrders() {
        const allUnpaidOrders = `${serverIP}/api/unpaidorders/${this.state.currentPlace.placeID}`;
        fetch(allUnpaidOrders, { mode: 'cors' })
            .then(result => { return result.json(); })
            .then(data => {
                console.log("UNPAID ORDERS: ");
                console.log(data);

                this.setState({ orders: data }, () => {
                    if (data.length === 0) {
                        // this.setState({ error: 'pipi' });
                    }
                });
            })
            .catch((error) => {
                // this.setState({ error });
            });
    } 
    
    handleClick(idCategory) {
        const { allProducts } = this.state;

        allProducts.forEach((productsCateg) => {

            if (productsCateg.categoryID.trim() === idCategory.trim()) {

                const currentProducts = productsCateg.products.slice();
                this.setState({ currentProducts }, () => {

                });

            }
        });
    }

    selectedOrderEvent(order) {
        this.setState({ selectedOrder: order, showUpdateModal: true }, () => {
            console.log(this.state.showUpdateModal);
        });
    }

    closeUpdateOrderModal() {
        this.setState({ showUpdateModal: false, selectedOrder: {} }, () => {
            console.log(this.state.showUpdateModal);
        });
    }

    updateOrder() {
        // SEND ORDER TO SERVER WITH PUT METHOD
        const updateURL = `${serverIP}/api/orderOnly/${JSON.stringify(this.state.selectedOrder)}`;
        console.log("updating");
        fetch(updateURL, { method: 'PUT', mode: 'cors' })
            .then(result => { return result.json(); })
            .then(data => {
                // UPDATE WHAT USER SEES
                console.log("UPDATE ORDER: ");
                console.log(data);
                this.getAllUnpaidOrders();
                this.closeUpdateOrderModal();
            })
            .catch(error => {
                this.setState({ error: "Erreur vérifier que le serveur est démarré" });
            });

    }

    addAmountReceived(digit) {

        this.setState((prevState, props) => {
            return {
                amountReceived: prevState.amountReceived + digit
            };
        });
    }

    removeAmountReceived(removeAll) {
        const { amountReceived } = this.state;
        if (removeAll === false) {
            if (amountReceived !== 0) {
                this.setState({ amountReceived: amountReceived.substr(0, amountReceived.length - 1) });
            }
        } else {
            this.setState({ amountReceived: 0 });
        }
    }

    addNewOrder(idProduct) {
        const { selectedOrder } = this.state;
        const { allProducts } = this.state;
        const products = selectedOrder.productOrders;
        console.log("new product: " + idProduct);
        allProducts.forEach((productsCateg) => {
            const allProducts = productsCateg.products;
            allProducts.forEach((product) => {
                if (product.productID.trim() === idProduct.trim()) {
                    let isThere = false;
                    products.forEach((order) => {
                        if (order.productID.trim() === idProduct.trim()) {
                            isThere = true;
                        }
                    });

                    if (isThere === false) {
                        const newProduct = Object.assign({}, product, { quantity: 1 });
                        const newProducts = [...products, newProduct];
                        const newSelectedOrder = Object.assign({}, selectedOrder, { productOrders: newProducts });

                        this.setState({ selectedOrder: newSelectedOrder });
                    }
                }
            })
        });
    }

    increaseQuantity(idProduct) {

        const { selectedOrder } = this.state;
        const products = selectedOrder.productOrders;
        const newProducts = [];

        products.forEach((product) => {
            if (product.productID.trim() === idProduct.trim()) {
                let quantity = product.quantity;
                if (quantity === undefined) {
                    quantity = 1;
                } else {
                    quantity++;
                }

                newProducts.push(Object.assign({}, product, { quantity }));
            } else {
                newProducts.push(product);
            }
        });
        const newSelectedOrder = Object.assign({}, selectedOrder, { productOrders: newProducts });
        this.setState({ selectedOrder: newSelectedOrder });

    }

    decreaseQuantity(idProduct) {
        const { selectedOrder } = this.state;
        const products = selectedOrder.productOrders;
        const newProducts = [];

        products.forEach((product) => {
            if (product.productID.trim() === idProduct.trim()) {
                let quantity = product.quantity;
                if (quantity === undefined) {
                    quantity = 0;
                } else {
                    quantity--;
                }
                if (quantity > 0) {
                    newProducts.push(Object.assign({}, product, { quantity }));
                }
            } else {
                newProducts.push(product);
            }
        });
        const newSelectedOrder = Object.assign({}, selectedOrder, { productOrders: newProducts });
        this.setState({ selectedOrder: newSelectedOrder });

    }

    payOrder(order) {

        this.setState({ selectedOrder: order, showPaymentModal: true })
    }

    printOrder(order) {
        const printURL = `${serverIP}/api/printOnly/${JSON.stringify(order)}`;
        fetch(printURL, { method: 'GET', mode: 'cors' })
            .then(result => { return result.json() })
            .then(data => {
                console.log("ADDITION: ");
                console.log(data);
                alert("Addition imprimer avec succès");
            })
            .catch(error => {
                this.setState({ error: "Erreur vérifier que le serveur est démarré" });
            });
    }

    sendPaymentoServer() {
        const { selectedOrder } = this.state;

        const newSelectedOrder = { ...selectedOrder };
        newSelectedOrder["amountReceived"] = parseFloat(this.state.amountReceived);
        newSelectedOrder["pointOfSaleID"] = "1";
        console.log(newSelectedOrder);
        const payemntURL = `${serverIP}/api/paymentOnly/${JSON.stringify(newSelectedOrder)}`;

        fetch(payemntURL, { method: 'POST', mode: 'cors' })
            .then(result => { return result.json() })
            .then(data => {
                console.log("PAYEMENTS: ");
                console.log(data);
                this.getAllUnpaidOrders();
                alert("Commande payé avec succès");
            })
            .catch(error => {
                this.setState({ error: "Erreur vérifier que le serveur est démarré" });
            });
        console.log("=============");
    }

    closePaymentModal() {
        this.setState({ showPaymentModal: false });
    }

    makeNewOrder() {
        console.log("making new order");
        /// also send the table ID
        document.location.href = `/build?placeID=${this.state.currentPlace.placeID}`;
    }

    render() {
        let content = (<p>PAS DE COMMANDES</p>)
        
        if(Array.isArray(this.state.orders)) {
            if(this.state.orders.length > 0) {
                content = this.state.orders.map(order => {
                    return (
                        <Grid.Column key={order.orderID}>
                            <OrderMade printOrder={this.printOrder} payOrder={this.payOrder} selectedOrderEvent={this.selectedOrderEvent} order={order} />
                        </Grid.Column>);
                });
            }
            
        }
        

        return (
            <div>
                <h1>Table N°: {this.state.currentPlace.placeName}</h1>
                <Button onClick={this.makeNewOrder}>Nouvelle commande</Button>
                <h2>Les commandes non payées</h2>
                <Grid columns='3'>
                    {content}
                </Grid>
                <UpdateOrderMade currentProducts={this.state.currentProducts} handleClick={this.handleClick} allCategories={this.state.allCategories} allProducts={this.state.allProducts}
                    error={this.state.error} addNewOrder={this.addNewOrder} increaseQuantity={this.increaseQuantity} decreaseQuantity={this.decreaseQuantity} updateOrder={this.updateOrder} closeUpdateOrderModal={this.closeUpdateOrderModal} showUpdateModal={this.state.showUpdateModal} selectedOrder={this.state.selectedOrder} />
                <PaymentOrder isPayment={true} totalAmount={this.state.selectedOrder.totalAmount} orders={this.state.selectedOrder.productOrders} amountReceived={this.state.amountReceived} showOrdersModal={this.state.showPaymentModal} closePaymentOrder={this.closePaymentModal} sendPaymentToServer={this.sendPaymentoServer} addAmountReceived={this.addAmountReceived} removeAmountReceived={this.removeAmountReceived} />
            </div>
        );
    }

}

export default PlaceOrders;
