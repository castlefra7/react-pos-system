import serverIP from '../components/function/ServerInfo';
import { randomName } from '../components/function/Utilities';
import { validateOrderPayment } from '../components/function/Validate';

export const LOADING_CATEGORIES = 'LOADING_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const SHOW_PRODUCTS_CATEGORY = 'SHOW_PRODUCTS_CATEGORY';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';
export const RECEIVE_ALL_PRODUCTS = 'RECEIVE_ALL_PRODUCTS';
export const PRODUCT_DELETED = 'PRODUCT_DELETED';

export const ADD_PRODUCT_TO_ORDER = 'ADD_PRODUCT_TO_ORDER';
export const INCREASE_QUANTITY_PRODUCT = 'INCREASE_QUANTITY_PRODUCT';
export const DECREASE_QUANTITY_PRODUCT = 'DECREASE_QUANTITY_PRODUCT';
export const CLEAR_ORDERS = 'CLEAR_ORDERS';
export const GET_ALL_UNPAID_ORDERS = 'GET_ALL_UNPAID_ORDERS';
export const SET_SELECTED_ORDER = 'SET_SELECTED_ORDER';
export const UNSET_SELECTED_ORDER = 'UNSET_SELECTED_ORDER';
export const PRINT_ORDER = 'PRINT_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const PAY_ORDER = 'PAY_ORDER';
export const PAY_UNPAID_ORDER = 'PAY_UNPAID_ORDER';
export const CLOSE_UNPAID_MODAL = 'CLOSE_UNPAID_MODAL';
export const ADD_PRODUCT_TO_UNPAID_ORDER = 'ADD_PRODUCT_TO_UNPAID_ORDER';
export const INCREASE_UNPAID_QUANTITY = 'INCREASE_UNPAID_QUANTITY';
export const DECREASE_UNPAID_QUANTITY = 'DECREASE_UNPAID_QUANTITY';

export const ADD_AMOUNT_RECEIVED = 'ADD_AMOUNT_RECEIVED';
export const REMOVE_AMOUNT_RECEIVED = 'REMOVE_AMOUNT_RECEIVED';
export const TOGGLE_PAYMENT = 'TOGGLE_PAYMENT';
export const MAKE_PAYMENT = 'MAKE_PAYMENT';
export const PAYMENT_SENT = 'PAYMENT_SENT';
export const PAYMENT_ERROR = 'PAYMENT_ERROR';
export const OPEN_PAYMENT = 'OPEN_PAYMENT';
export const CLOSE_PAYMENT = 'CLOSE_PAYMENT';

export const CHANGE_TABLE = 'CHANGE_TABLE';
export const GET_ALL_TABLES = 'GET_ALL_TABLES';

export const INFORMATION_ERROR = 'INFORMATION_ERROR';
export const CLEAR_INFORMATION = 'CLEAR_INFORMATION';
export const INFORMATION_SUCCESS = 'INFORMATION_SUCCESS';

export const CREATE_STOCK = 'CREATE_STOCK';
export const UPDATE_STOCK = 'UPDATE_STOCK';
export const STOCKS_RECEIVED = 'STOCKS_RECEIVED';

export const STATISTICS_RECEIVED = 'STATISTICS_RECEIVED';
export const CLEAR_STATISTICS = 'CLEAR_STATISTICS';

/* STATISTICS */
export function clearStatistics() {
    return {
        type: CLEAR_STATISTICS
    }
}

export function statReceived(data) {
    return {
        type: STATISTICS_RECEIVED,
        data
    }
}


/* STOCKS */
export function stocksReceived(data) {
    return {
        type: STOCKS_RECEIVED,
        data
    }
}

/* INFORMATION */
export function clearInformation() {
    return {
        type: CLEAR_INFORMATION
    }
}

export function informationSuccess(successMessage) {
    return {
        type: INFORMATION_SUCCESS,
        successMessage
    }
}

export function informationError(errorMessage) {
    return {
        type: INFORMATION_ERROR,
        errorMessage
    }
}

/* TABLE */
export function getAllTables(data) {
    return {
        type: GET_ALL_TABLES,
        data
    }
}

export function changeTable(idTable) {
    return {
        type: CHANGE_TABLE,
        idTable
    }
}

/* PAYMENT */
export function closePayment() {
    return {
        type: CLOSE_PAYMENT
    }
}

export const openPayment = (isPayment, orders, idTable) => dispatch => {
    if (validateOrderPayment(orders, idTable) === false) {
        return dispatch(informationError("Veuiller choisir un numéro de table et ajouter au moins un produit"));
    } else {
        dispatch({
            type: OPEN_PAYMENT,
            isPayment,
            orders,
            idTable
        });
    }

}

export function paymentSent() {
    return {
        type: PAYMENT_SENT
    }
}

export function makePayment() {
    return {
        type: MAKE_PAYMENT
    }
}

export function togglePayment(value, callback) {
    return {
        type: TOGGLE_PAYMENT,
        value,
        callback
    }
}

export function removeAmountReceived(removeAll) {
    return {
        type: REMOVE_AMOUNT_RECEIVED,
        removeAll
    }
}

export function addAmountReceived(digit) {
    return {
        type: ADD_AMOUNT_RECEIVED,
        digit
    }
}

/* ORDERS */
export function increaseUnpaidQuantity(idProduct) {
    return {
        type: INCREASE_UNPAID_QUANTITY,
        idProduct
    }
}

export function decreaseUnpaidQuantity(idProduct) {
    return {
        type: DECREASE_UNPAID_QUANTITY,
        idProduct
    }
}

export function addProductToUnpaidOrder(idProduct) {
    return {
        type: ADD_PRODUCT_TO_UNPAID_ORDER,
        idProduct
    }
}

export function closeUnpaidModal() {
    return {
        type: CLOSE_UNPAID_MODAL
    }
}

export function payUnpaidOrder() {
    return {
        type: PAY_UNPAID_ORDER
    }
}

export function payOrder(selectedOrder) {
    return {
        type: PAY_ORDER,
        selectedOrder
    }
}

export function udpateOrder() {
    return {
        type: UPDATE_ORDER
    }
}
export function printOrder() {
    return {
        type: PRINT_ORDER,
    }
}

export function unSetSelectedOrder() {
    return {
        type: UNSET_SELECTED_ORDER,
    }
}

export function setSelectedOrder(selectedOrder) {
    return {
        type: SET_SELECTED_ORDER,
        selectedOrder
    }
}

export function getAllUnpaidOrders(unpaidOrders) {
    return {
        type: GET_ALL_UNPAID_ORDERS,
        unpaidOrders
    }
}
export function clearOrders() {
    return {
        type: CLEAR_ORDERS
    };
}
export function decreaseQuantityProduct(idProduct) {
    return {
        type: DECREASE_QUANTITY_PRODUCT,
        idProduct
    }
}

export function increaseQuantityProduct(idProduct) {
    return {
        type: INCREASE_QUANTITY_PRODUCT,
        idProduct
    }
}

export function addProductToOrder(idProduct) {
    return {
        type: ADD_PRODUCT_TO_ORDER,
        idProduct
    }
};

/* CATEGORIES */
export function getCategories() {
    return {
        type: LOADING_CATEGORIES
    }
};

export function receiveCategories(data) {
    return {
        type: RECEIVE_CATEGORIES,
        data
    }
};

/* PRODUCTS */

export function productDeleted() {
    return {
        type: PRODUCT_DELETED
    }
}

export function receiveAllProducts(data) {
    return {
        type: RECEIVE_ALL_PRODUCTS,
        data
    }
}

export function clearProducts() {
    return {
        type: CLEAR_PRODUCTS
    }
};

export function showProductsCategory(categoryId) {
    return {
        type: SHOW_PRODUCTS_CATEGORY,
        categoryId
    }
}

export function receiveProducts(data) {
    return {
        type: RECEIVE_PRODUCTS,
        data
    }
}

/* ACTION ERRORS */

export function paymentError(error) {
    return {
        type: PAYMENT_ERROR,
        error
    }
}

/* FETCHING DATA FROM DB */
export const fetchStatistics = (month, year) => (dispatch) => {
    const statURL = `${serverIP}/api/statistics/${month}/${year}`;
    fetch(statURL)
    .then(result => result.json())
    .then((data) => {
        if(data.success === false ){
            dispatch(clearStatistics());
        } else {
            dispatch(statReceived(data));
        }
    })
    .catch((error) => {
        dispatch(informationError("Vérifier que le serveur est bien démarré"));
    });
}

export const sendUpdatedStock = (updatedStock) => (dispatch) => {
    const stockURL =  `${serverIP}/api/stocks/${JSON.stringify(updatedStock)}`;
    fetch(stockURL, {method: 'put'})
    .then(result => result.json())
    .then((data) => {
        dispatch(fetchAllStocks());
    })
    .catch((error) =>
    {  dispatch(informationError("Vérifier que le serveur est bien démarré"))});
}

export const fetchAllStocks = () => dispatch => {
    const stockURL =  `${serverIP}/api/stocks`;
    fetch(stockURL)
    .then(result => result.json())
    .then((data) => {
        dispatch(stocksReceived(data));
    })
    .catch((error) =>
    {  dispatch(informationError("Vérifier que le serveur est bien démarré"))});
}

export const sendCreatedStock = (newStock) => dispatch => {
    const stockURL =  `${serverIP}/api/stocks/${JSON.stringify(newStock)}`;
    fetch(stockURL, {method: 'post'})
    .then((result) => result.json())
    .then((data) => {
        console.log(data)
        if(data.success) {
            dispatch(informationSuccess(data.text));
            dispatch(fetchAllStocks());
        }
    })
    .catch((error) =>
    { console.log("rror"); dispatch(informationError("Vérifier que le serveur est bien démarré"))});
}

export const fetchAllPlaces = () => (dispatch) => {
    const placeURL = `${serverIP}/api/places`;
    fetch(placeURL)
        .then(result => result.json())
        .then((data) => {
            dispatch(getAllTables(data));
        })
        .catch((error) => dispatch(informationError("Vérifier que le serveur est bien démarré")));
}

export const sendUnpaidOrderPayment = () => (dispatch, getState) => {
    const { orders, user } = getState();
    const selectedOrder = orders.selectedOrder;
    const newSelectedOrder = { ...selectedOrder };
    newSelectedOrder["amountReceived"] = "-1";
    newSelectedOrder["pointOfSaleID"] = user.pointOfSaleID;
    const payemntURL = `${serverIP}/api/paymentOnly/${JSON.stringify(newSelectedOrder)}`;

    fetch(payemntURL, { method: 'POST' })
        .then(result => { return result.json() })
        .then(data => {
            alert("Commande payé avec succès");
            dispatch(payUnpaidOrder());
            return dispatch(fetchUnpaidOrders());
        })
        .catch(error => {
            console.log(error);
            return "error send unpaid order payment";
        });
}

export const sendUpdatedOrder = () => (dispatch, getState) => {
    const { orders } = getState();

    if (orders.selectedOrder.productOrders.length <= 0) {
        return dispatch(udpateOrder());
    }
    const updateURL = `${serverIP}/api/orderOnly/${JSON.stringify(orders.selectedOrder)}`;

    fetch(updateURL, { method: 'PUT' })
        .then(result => { return result.json(); })
        .then(data => {
            dispatch(fetchUnpaidOrders());
            return dispatch(udpateOrder());
        })
        .catch((error) => dispatch(informationError("Vérifier que le serveur est bien démarré")));
}

export const sendPrintOrder = (order) => (dispatch) => {
    const printURL = `${serverIP}/api/printOnly/${JSON.stringify(order)}`;
    fetch(printURL, { method: 'GET' })
        .then(result => { return result.json() })
        .then(data => {
            return dispatch(printOrder());
        })
        .catch((error) => dispatch(informationError("Vérifier que le serveur est bien démarré")));
}

export const fetchUnpaidOrders = () => (dispatch) => {
    const allUnpaidOrders = `${serverIP}/api/unpaidorders`;

    fetch(allUnpaidOrders)
        .then(result => { return result.json(); })
        .then(data => {
            return dispatch(getAllUnpaidOrders(data));
        })
        .catch((error) => dispatch(informationError("Vérifier que le serveur est bien démarré")));
}

export const sendPaymentToServer = (url) => (dispatch, getState) => {
    const { user, orders, payment, table } = getState();
    let order = {};
    order["orders"] = orders.currentOrders;
    order["amountReceived"] = payment.amountReceived;
    order["isPayment"] = payment.isPayment;
    order["customerID"] = user.customerID;
    order["userID"] = user.userID;
    order["pointOfSaleID"] = user.pointOfSaleID;
    order["placeID"] = table.idCurrentTable;

    const paymentURL = `${serverIP}/api/payment/${JSON.stringify(order)}`;
    fetch(paymentURL)
        .then(response => response.json())
        .then(data => {
            if (data.success === false) {
                alert("Erreur: " + data.text);
                return dispatch(paymentError("Erreur: " + data.text));
            } else {
                alert("Commande enregistrer\nCommande suivante");
                dispatch(clearOrders());
                return dispatch(paymentSent());
            }
        })
        .catch((error) => dispatch(informationError("Vérifier que le serveur est bien démarré")));
}

export const fetchCategories = () => dispatch => {
    dispatch(getCategories());
    const allCategoriesURL = `${serverIP}/api/categories`;
    fetch(allCategoriesURL)
        .then(result => result.json())
        .then(json => {
            dispatch(receiveCategories(json))

        })
        .catch((error) => dispatch(informationError("Vérifier que le serveur est bien démarré")));
};

export const sendCategoryDeleted = (categoryID) => dispatch => {
    const deleteURL = `${serverIP}/api/categories/${categoryID}`;
    fetch(deleteURL, { method: 'delete' })
        .then(result => result.json())
        .then(data => {
            console.log(data);
            dispatch(fetchCategories());
        })
        .catch(error => dispatch(informationError("Vérifier que le serveur est bien démarré")))
}

export const sendProductDeleted = (idProduct) => dispatch => {
    const deleteURL = `${serverIP}/api/products/${idProduct}`;
    fetch(deleteURL, { method: 'delete' })
        .then(result => result.json())
        .then(data => {
            console.log(data);
            dispatch(fetchAllProducts());
        })
        .catch(error => dispatch(informationError("Vérifier que le serveur est bien démarré")))

}

export const sendProductUpdated = (updatedProduct) => dispatch => {
    const newProduct = {};
    newProduct["productID"] = updatedProduct.productID;
    newProduct["productName"] = updatedProduct.productName;
    newProduct["categoryID"] = updatedProduct.categoryID;
    newProduct["price"] = updatedProduct.price;
    newProduct["productImage"] = updatedProduct.imageName;
    if (updatedProduct.selectedFile !== '') {
        const imageName = randomName(updatedProduct.selectedFile.name);
        newProduct["productImage"] = imageName;
    }

    const updateURL = `${serverIP}/api/products/${JSON.stringify(newProduct)}`;
    fetch(updateURL, { method: 'PUT' })
        .then(result => { return result.json() })
        .then(data => {

            if (updatedProduct.selectedFile !== '') {
                const fileURL = `${serverIP}/api/imageUpload/${JSON.stringify(newProduct["productImage"])}`;
                const formData = new FormData();
                formData.append('product_file', updatedProduct.selectedFile);
                const options = {
                    method: 'POST',
                    body: formData
                };
                fetch(fileURL, options)
                    .then(result => { return result.json() })
                    .then(data => {
                        console.log("FILE UPLOADED TO THE SERVER");


                    })
                    .catch((error) => dispatch(informationError("Vérifier que le serveur est bien démarré")));
            }
            alert("Produit mise à jour avec succés");
            dispatch(fetchAllProducts());
        })
        .catch((error) => dispatch(informationError("Vérifier que le serveur est bien démarré")));
}

export const fetchAllProducts = () => dispatch => {
    dispatch(clearProducts());
    const allProductsURL = `${serverIP}/api/products`;
    fetch(allProductsURL)
        .then(response => response.json())
        .then(data => {
            console.log("VOARAY");
            dispatch(receiveAllProducts(data));
        })
        .catch((error) => dispatch(informationError("Vérifier que le serveur est bien démarré")));
}

export const fetchProducts = () => dispatch => {
    dispatch(clearProducts());
    const allCategoriesURL = `${serverIP}/api/categories`;
    fetch(allCategoriesURL)
        .then(result => result.json())
        .then((json) => {
            json.forEach((category) => {
                let productsCategory = { categoryID: category.categoryID };
                const allProductsCategoryURL = `${serverIP}/api/products/${category.categoryID}`;

                fetch(allProductsCategoryURL)
                    .then(result => { return result.json() })
                    .then(json => {
                        productsCategory["products"] = json;
                        json.forEach(product => {
                            if (product["productImage"] === undefined || product["productImage"] === null)
                                product["productImage"] = 'default.jpg';
                        });
                        dispatch(receiveProducts(productsCategory));
                    })
                    .catch((error) => dispatch(informationError("Vérifier que le serveur est bien démarré")));
            });
        })
        .catch((error) => dispatch(informationError("Vérifier que le serveur est bien démarré")));
};
