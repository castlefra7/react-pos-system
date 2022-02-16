import React from 'react';
import { Icon } from 'semantic-ui-react';

const style = {
    maxWidth: '25px'
};

const buttonSytle = {
    fontSize: '15px'
};

const SpecialInput = props => (
    <div>
        {/* <span><strong>{currencyFormat(props.price)}</strong> </span> */}
        <button style={buttonSytle} onClick={() => props.increaseQuantity(props.productID)}><Icon name='plus' /></button>
        <input readOnly style={style} value={props.quantity} />
        <button style={buttonSytle} onClick={() => props.decreaseQuantity(props.productID)}><Icon name='minus' /></button>
    </div>
);

export default SpecialInput;