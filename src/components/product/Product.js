import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import { currencyFormat } from '../function/NumberManipulation';
import '../../stylesheets/Main.css'

const imgStyle = {
    maxWidth: '165px !important',
    maxHeight: '124px !important',
    width: '165px !important',
    height: '124px !important'
}

const pStyle =
{
    fontSize: '16px',
    position: 'absolute',
    bottom: '5px',
    right: '7px',
}

const cardStyle = {


}

const Product = props => {
    if (props.product.productImage === "null" || props.product.productImage === undefined || props.product.productImage === null)
        props.product.productImage = 'default.jpg';

    return (
        <Card onClick={() => props.addNewOrder(props.product.productID)}>
            <Image
                src={process.env.PUBLIC_URL + "/images/" + props.product.productImage}
                alt={props.product.image} wrapped ui={false}
            />
           
            <Card.Content style={cardStyle} >

                <Card.Header style={{ fontSize: '14px', marginBottom: '17px' }}>
                    <strong>{props.product.productName.charAt(0).toUpperCase() + props.product.productName.slice(1)}</strong>
                </Card.Header>
                <p className={'p-style'} style={pStyle}>{currencyFormat(props.product.price)}</p>
            </Card.Content>
        </Card>
    )
};

export default Product;
