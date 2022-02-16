import React from 'react';
import { Image, Card, Button, Form } from 'semantic-ui-react';
import { currencyFormat } from '../function/NumberManipulation';

import '../../stylesheets/Main.css'

const updateProduct = props => {
    const {
        showUpdateForm,
        updateProduct,
        isUpdateFormShown,
        product,
        handleUpload,
        handleChange,
        productName,
        price,
        productID,
        state,
        sendProductDeleted
    } = props;

    if (product.productImage === "null" || product.productImage === undefined || product.productImage === null)
        product.productImage = 'default.jpg';


    let content = (
        <div>
            <Button fluid onClick={() => showUpdateForm(true, product)} color='yellow'>Modifier</Button>
            <Button fluid style={{marginTop:'2px'}} onClick={() => sendProductDeleted(product.productID)} color='red'>Supprimer</Button>
        </div>
    );
    if (isUpdateFormShown && productID === product.productID) {
        content = (
            <Form>
                <Form.Field>
                    <label>Nom produit</label>
                    <input required value={productName} onChange={(e) => handleChange(e)} name="productName" placeholder='Nom du produit...' />
                </Form.Field>
                <Form.Field>
                    <label>Prix produit</label>
                    <input required value={price} onChange={(e) => handleChange(e)} name="price" placeholder='Prix du produit...' />
                </Form.Field>
                <Form.Field>
                    <label>Image du produit</label>
                    <input type="file" onChange={(e) => handleUpload(e)} />
                </Form.Field>
                <Button.Group>
                    <Button className={"button-style"} onClick={() => { showUpdateForm(false); updateProduct(state); }} color='teal'>Valider</Button>
                    <Button.Or />
                    <Button onClick={() => showUpdateForm(false)} color='grey'>Annuler</Button>
                </Button.Group>


            </Form>)
    }

    return (
        <Card >
            <Image
                size='mini' src={process.env.PUBLIC_URL + "/images/" + product.productImage} alt={product.image} wrapped ui={false}
            />
            <Card.Content>

                <Card.Header>
                    {product.productName.charAt(0).toUpperCase() + product.productName.slice(1)}
                </Card.Header>
                <Card.Meta>{currencyFormat(product.price)}</Card.Meta>
            </Card.Content>
            <Card.Content>
                {content}
            </Card.Content>
        </Card>
    )
};

export default updateProduct;
