import React from 'react';
import {  Button } from 'semantic-ui-react';
import './Keypad.css';


const Keypad = (props) => (
    <div className="keypad">
        <div className="inline-style">
            <Button className="button" onClick={() => { props.sendPaymentToServer() }} size='big' color='green'>Valider</Button>
        </div>

    </div>
);

export default Keypad;
