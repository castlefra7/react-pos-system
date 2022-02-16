import React, { Component } from 'react'
import { Form, Grid, Button, Select } from 'semantic-ui-react';
import serverIP from '../function/ServerInfo';
import '../../stylesheets/Main.css'

class CreateCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: "",
            categoryTaste: "",
            categoryImage: ""
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChangeSelect = (value) => {
        this.setState({ categoryTaste: value });
    }

    addNewCategory = (e) => {
        e.preventDefault();
        const newCateg = {};

        newCateg["categoryName"] = this.state.categoryName;
        newCateg["categoryTaste"] = this.state.categoryTaste;
        newCateg["categoryImage"] = this.state.categoryImage.name;


        const urlAddCateg = `${serverIP}/api/categories/${JSON.stringify(newCateg)}`;
        fetch(urlAddCateg, { method: 'POST'})
            .then(result => {
                return result.json();
            })
            .then(data => {
                const fileURL = `${serverIP}/api/imageUpload/${JSON.stringify(this.state.categoryImage.name)}`;
                const formData = new FormData();
                formData.append('product_file', this.state.categoryImage);
                const options = {
                    method: 'POST',
                    body: formData
                };
                fetch(fileURL, options)
                    .then(result => { return result.json() })
                    .then(data => {
                        alert("Catégorie ajouter avec succès");
                        this.setState({
                            categoryName: ""
                        });
                        this.props.getAllCategories();
                    });
            })
            .catch(error => {
                alert("Vérifier que le serveur est démarré");
            })
    }

    handleUpload = (e) => {
        this.setState({ categoryImage: e.target.files[0] });
    }

    render() {
        const options = [{ key: 'SAL', value: 'SAL', text: 'Salé' }, { key: 'SUC', value: 'SUC', text: 'Sucré' }];
        return (
            <Grid >
                <Grid.Column>
                    <h1>Catégorie du produit</h1>
                    <Form onSubmit={this.addNewCategory} size="small">
                        <Form.Field>
                            <label>Catégorie</label>
                            <input required name="categoryName" value={this.state.categoryName} onChange={(e) => this.handleChange(e)} placeholder='Categorie...' />
                        </Form.Field>
                        <Form.Field>
                            <Select required name="categoryTaste" onChange={(e, { value }) => this.handleChangeSelect(value)} placeholder='Choisir catégorie' options={options} />
                        </Form.Field>
                        <Form.Field>
                            <input required type="file" onChange={this.handleUpload} />
                        </Form.Field>
                        <Button fluid className={"button-style"}>Valider</Button>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}

export default CreateCategory;
