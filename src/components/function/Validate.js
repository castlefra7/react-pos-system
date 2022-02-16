export function validateOrderPayment(orders, idTable) {
    if (orders.length === 0 || idTable === "") {
        return false;
    }
    return true;
}