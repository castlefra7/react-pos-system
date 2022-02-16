import React from 'react';
import { Grid } from 'semantic-ui-react';
import Product from './Product';


const Products = props => {

    return (
        <Grid columns={4}>
            {props.currentProducts.map((product) => (
                <Grid.Column key={product.productID}>
                    <Product addNewOrder={props.addNewOrder} product={product} />
                </Grid.Column>
            ))}
        </Grid>
    );
}

export default Products;