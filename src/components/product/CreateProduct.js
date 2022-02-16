import React, { Component } from 'react'
import { Form, Select, Grid, Button } from 'semantic-ui-react';
import serverIP from '../function/ServerInfo';
import { randomName } from '../function/Utilities';

import '../../stylesheets/Main.css'

class CreateProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            price: '',
            allCategories: [],
            categoryID: '',
            selectedFile: ''
        };
    }

    componentDidMount() {
        const allCategoriesURL = serverIP + "/api/categories";
        fetch(allCategoriesURL)
            .then(result => {
                return result.json();
            })
            .then(data => {
                const allCategories = data;
                const newAll = [];
                allCategories.forEach(category => {
                    const newCategory = {};
                    newCategory['key'] = category.categoryID;
                    newCategory['value'] = category.categoryID;
                    newCategory['text'] = category.categoryName + " " + category.categoryTaste;
                    newAll.push(newCategory);
                });
                this.setState({ allCategories: newAll });

            });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChangeSelect = (value) => {
        this.setState({ categoryID: value });
    }

    addNewProduct = (e) => {
        e.preventDefault();
        const newProduct = {};
        newProduct["productName"] = this.state.productName;
        newProduct["categoryID"] = this.state.categoryID;
        newProduct["price"] = this.state.price;

        const productName = randomName(this.state.selectedFile.name);
        newProduct["productImage"] = productName;

        console.log(newProduct);

        const addProductURL = `${serverIP}/api/products/${JSON.stringify(newProduct)}`;
        fetch(addProductURL, { method: 'POST'})
            .then(result => { return result.json() })
            .then(data => {
                const fileURL = `${serverIP}/api/imageUpload/${JSON.stringify(newProduct["productImage"])}`;
                const formData = new FormData();
                formData.append('product_file', this.state.selectedFile);
                const options = {
                    method: 'POST',
                    body: formData
                };
                fetch(fileURL, options)
                    .then(result => { return result.json() })
                    .then(data => {
                        this.setState({
                            productName: '',
                            price: ''
                        });
                        alert("Ajouter avec success");
                    })
                    .catch(data => {

                    })
            })
            .catch(erreur => {
                alert("Erreur: vérifier que le serveur est démarré");
            });




    }

    handleUpload = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    }

    render() {
       
        return (
            <Grid centered columns={4}>
                <Grid.Column>
                    <Form onSubmit={this.addNewProduct}>
                        <Form.Field>
                            <label>Catégorie</label>
                            <Select required name="categoryID" onChange={(e, { value }) => this.handleChangeSelect(value)} placeholder='Choisir catégorie' options={this.state.allCategories} />
                        </Form.Field>
                        <Form.Field>
                            <label>Nom produit</label>
                            <input required value={this.state.productName} onChange={(e) => this.handleChange(e)} name="productName" placeholder='Nom du produit...' />
                        </Form.Field>
                        <Form.Field>
                            <label>Prix produit</label>
                            <input required value={this.state.price} onChange={(e) => this.handleChange(e)} name="price" placeholder='Prix du produit...' />
                        </Form.Field>
                        <Form.Field>
                            <input required type="file" onChange={this.handleUpload} />
                        </Form.Field>
                        <Button fluid className={"button-style"}>Valider</Button>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}


export default CreateProduct;
