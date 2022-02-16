import {
    ADD_PRODUCT_TO_ORDER,
    INCREASE_QUANTITY_PRODUCT,
    DECREASE_QUANTITY_PRODUCT,
    CLEAR_ORDERS,
    GET_ALL_UNPAID_ORDERS,
    SET_SELECTED_ORDER,
    UNSET_SELECTED_ORDER,
    PRINT_ORDER,
    UPDATE_ORDER,
    PAY_ORDER,
    PAY_UNPAID_ORDER,
    CLOSE_UNPAID_MODAL,
    ADD_PRODUCT_TO_UNPAID_ORDER,
    INCREASE_UNPAID_QUANTITY,
    DECREASE_UNPAID_QUANTITY
} from '../actions';

const orders = (
    state = {
        currentOrders: [],
        unpaidOrders: [],
        selectedOrder: {},
        showUpdateOrderModal: false,
        showPaymentModal: false
    },
    action) => {

    let newState;
    let newOrder;
    
    let selectedOrder;
    let products;
    let newProducts;
    let newSelectedOrder;
    let newProduct;

    const { allProducts, idProduct } = action;
    switch (action.type) {
        case INCREASE_UNPAID_QUANTITY:
            selectedOrder = state.selectedOrder;
            products = selectedOrder.productOrders;
            newProducts = [];

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
            newSelectedOrder = Object.assign({}, selectedOrder, { productOrders: newProducts });
            return { ...state, selectedOrder: newSelectedOrder };

        case DECREASE_UNPAID_QUANTITY:
            selectedOrder = state.selectedOrder;

            products = selectedOrder.productOrders;
            newProducts = [];

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
            newSelectedOrder = Object.assign({}, selectedOrder, { productOrders: newProducts });
            return {...state, selectedOrder: newSelectedOrder};

        case ADD_PRODUCT_TO_UNPAID_ORDER:
            selectedOrder = state.selectedOrder;
            products = selectedOrder.productOrders;
            newProducts = [...products];
            
            allProducts.dataForCateg.forEach((productsCateg) => {
                productsCateg.products.forEach((product) => {
                    if (product.productID.trim() === idProduct.trim()) {
                        let isThere = false;
                        products.forEach((order) => {
                            if (order.productID.trim() === idProduct.trim()) {
                                isThere = true;
                            }
                        });

                        if (isThere === false) {
                            newProduct = Object.assign({}, product, { quantity: 1 });
                            newProducts.push(newProduct);
                            return;
                        }
                    }
                })
            });

            newSelectedOrder = {...selectedOrder, productOrders: newProducts}
           
            return {...state, selectedOrder: newSelectedOrder};

        case CLOSE_UNPAID_MODAL:
            return { ...state, showPaymentModal: false };

        case PAY_UNPAID_ORDER:
            return { ...state, selectedOrder: {}, showPaymentModal: false };

        case PAY_ORDER:
            return { ...state, selectedOrder: action.selectedOrder, showPaymentModal: true };

        case UPDATE_ORDER:
            return { ...state, selectedOrder: {}, showUpdateOrderModal: false };

        case PRINT_ORDER:
            alert("Addition imprimer avec succès");
            return state;

        case UNSET_SELECTED_ORDER:
            return { ...state, selectedOrder: {}, showUpdateOrderModal: false };

        case SET_SELECTED_ORDER:
            return { ...state, selectedOrder: action.selectedOrder, showUpdateOrderModal: true };

        case GET_ALL_UNPAID_ORDERS:
            return { ...state, unpaidOrders: action.unpaidOrders }

        case CLEAR_ORDERS:
            return { ...state, currentOrders: [] };

        case DECREASE_QUANTITY_PRODUCT:
            newState = [];
            newOrder = null;
            state.currentOrders.forEach((order) => {
                if (order.productID.trim() === idProduct.trim()) {
                    let quantity = order.quantity;
                    if (quantity === undefined) {
                        quantity = 0;
                    } else {
                        quantity--;
                    }
                    if (quantity > 0) {
                        newOrder = Object.assign({}, order, { quantity });
                        newState.push(newOrder);
                    }

                } else {
                    newState.push(order);
                }
            });
            return { ...state, currentOrders: newState };

        case INCREASE_QUANTITY_PRODUCT:
            newState = [];
            state.currentOrders.forEach((order) => {
                if (order.productID.trim() === idProduct.trim()) {
                    let quantity = order.quantity;
                    if (quantity === undefined) {
                        quantity = 1;
                    } else {
                        quantity++;
                    }

                    newOrder = Object.assign({}, order, { quantity });
                    newState.push(newOrder);
                } else {
                    newState.push(order);
                }
            });
            return { ...state, currentOrders: newState };

        case ADD_PRODUCT_TO_ORDER:
            newState = [...state.currentOrders];



            allProducts.dataForCateg.forEach((productsCateg) => {

                productsCateg.products.forEach((product) => {

                    if (product.productID.trim() === idProduct.trim()) {
                        let isThere = false;

                        state.currentOrders.forEach((order) => {
                            if (order.productID.trim() === idProduct.trim()) {
                                isThere = true;
                            }
                        });

                        if (isThere === false) {
                            const newOrder = Object.assign({}, product, { quantity: 1 });
                            newState.push(newOrder);
                        }
                    }

                });

            });
            return { ...state, currentOrders: newState };

        default:
            return state;

    }
};



export default orders;