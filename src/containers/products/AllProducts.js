import React, { Component } from 'react'
import { Grid, Form, Input } from 'semantic-ui-react';
import UpdateProduct from '../../components/product/UpdateProduct';
import { bodyHeight } from '../../components/function/Utilities';
import { connect } from 'react-redux';
import { fetchAllProducts, sendProductUpdated, sendProductDeleted } from '../../actions';

class AllProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            selectedFile: '',
            price: 0,
            isUpdateFormShown: false,
            productID: '',
            categoryID: '',
            imageName: '',
            searchName: ''
        };
    }

    componentDidMount() {
        this.props.fetchAllProducts();
    }

    showUpdateForm = (bool, product) => {
        if (product !== undefined) {
            this.setState({ productID: product.productID });
            this.setState({ categoryID: product.categoryID });
            this.setState({ productName: product.productName });
            this.setState({ price: product.price });
            this.setState({ imageName: product.productImage });

        }
        this.setState({ isUpdateFormShown: bool });
    }

    handleUpload = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const {
            productsData,
            sendProductUpdated,
            sendProductDeleted
        } = this.props;

        const navigationHeight = 75;
        const style = {
            padding: '5px',
            overflowY: 'scroll',
            maxHeight: bodyHeight(document) - navigationHeight
        };
        let allFilteredProducts = productsData;

        if (this.state.searchName !== "") {
            allFilteredProducts = productsData.filter((value, index, array) => {
                let re = new RegExp(this.state.searchName);
                return re.exec(value.productName) !== null;
            });
        }


        return (
            <Grid style={style} columns={6} >
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Form size={"small"}>
                            <Form.Field>
                                <label>Recherche:</label>
                                <Input name="searchName" value={this.state.searchName} onChange={(e) => this.handleChange(e)} placeholder="Entrer nom produit..." />
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
                {
                    allFilteredProducts.map((product) => (
                        <Grid.Column key={product.productID}>
                            <UpdateProduct
                                state={this.state}
                                updateProduct={sendProductUpdated}
                                productID={this.state.productID}
                                productName={this.state.productName}
                                price={this.state.price}
                                handleChange={this.handleChange}
                                handleUpload={this.handleUpload}
                                showUpdateForm={this.showUpdateForm}
                                sendProductDeleted={sendProductDeleted}
                                isUpdateFormShown={this.state.isUpdateFormShown}
                                product={product}
                            />
                        </Grid.Column>
                    ))
                }
            </Grid>);
    }
}

const mapStateToProps = state => {
    return {
        productsData: state.products.data
    };
};

const mapDispatchToProsp = dispatch => {
    return {
        fetchAllProducts: () => { dispatch(fetchAllProducts()) },
        sendProductUpdated: (product) => { dispatch(sendProductUpdated(product)) },
        sendProductDeleted: (idProduct) => {dispatch(sendProductDeleted(idProduct))}
    };
};

export default connect(mapStateToProps, mapDispatchToProsp)(AllProducts);