import React, { Component } from 'react'
import { Button, Select, Form, Input } from 'semantic-ui-react'


class CreateStock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productID: "",
            stockDate: "",
            initialQuantity: ""
        };
    }

    componentDidMount() {
        this.props.getAllProducts();   
    }

    selectOptions = () =>  {
        const options = [];
        this.props.products.forEach((product) => {
            const option = {};
            option["key"] = product.productID;
            option["value"] = product.productID;
            option["text"] = product.productName;
            options.push(option);
        });
        return options;
    }

    changeEvent = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    changeSelect = (e, value) => {  
        this.setState({productID: value.value})
        
    }

    render() {
        const {
            sendCreatedStock,
        } = this.props;
        

        return (
            <Form onSubmit={() => {sendCreatedStock(this.state); this.setState({productID: "", initialQuantity: ""})}}>
                <Form.Field>
                    <label>Date</label>
                    <Input name="stockDate" onChange={(e) => this.changeEvent(e)} type="date" />
                </Form.Field>
                <Form.Field>
                    <label>Choisir produit:</label>
                    <Select value={this.state.productID} name="productID" onChange={(e, value) => this.changeSelect(e, value)}  placeholder='Choisir un produit' options={this.selectOptions()} />
                </Form.Field>
                <Form.Field>
                    <label>Quantité initiale:</label>
                    <Input value={this.state.initialQuantity} name="initialQuantity" onChange={(e) => this.changeEvent(e)}  placeholder="Entrer quantité initiale..." />
                </Form.Field>
                <Button type='submit'>Valider</Button>
            </Form>
        );
    }

};

export default CreateStock;