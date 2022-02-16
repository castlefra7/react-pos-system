import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import CreateStock from '../../components/stocks/CreateStock';
import { sendCreatedStock, fetchAllProducts, fetchAllStocks, sendUpdatedStock } from '../../actions';
import { connect } from 'react-redux';
import UpdateStocks from '../../components/stocks/UpdateStocks';



class StockAdmin extends Component {


    constructor(props) {
        super(props);
        this.state = {
            initialQuantity: "",
            realQuantityLeft: "",
            stockIDU: ""
        }
    }

    componentWillMount() {
        this.props.getAllStocks();
    }

    handleChange = (e, stockIDU) => {
        this.setState({[e.target.name]: e.target.value});
        this.setState({stockIDU});
    }

    sendStock = (stockID, initialQuantity) => {
        // console.log(this.state);

        // console.log(stockID);
        // console.log(this.state.stockIDU);
        // console.log(initialQuantity);

        // if(stockID === this.state.stockIDU) {

        // }



        const updatedStock = {
            stockID,
            realQuantityLeft: this.state.realQuantityLeft
        }


        this.props.sendUpdatedStock(updatedStock);
    
    }

    render() {
        const {
            getAllProducts,
            sendCreatedStock,
            products,
            stocks
        } = this.props;

        return (
            <div style={{padding: '7px'}}>
                <Grid stackable>
                    <Grid.Column width="4">
                        <CreateStock products={products} getAllProducts={getAllProducts} sendCreatedStock={sendCreatedStock} />
                    </Grid.Column>
                    <Grid.Column width="12">
                        <UpdateStocks
                        handleChange={this.handleChange}
                        sendStock={this.sendStock}
                        stocks={stocks} 
                        initialQuantity={this.state.initialQuantity}
                        realQuantityLeft={this.state.realQuantityLeft}
                        />
                    </Grid.Column>
                </Grid>
            </div>
        )

    }
}


const mapStateToProps = state => {
    return {
        products: state.products.data,
        stocks:state.stocks.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendCreatedStock: (newStock) => { dispatch(sendCreatedStock(newStock)) },
        getAllProducts: () => { dispatch(fetchAllProducts()) },
        getAllStocks: () => {dispatch(fetchAllStocks())},
        sendUpdatedStock: (newStock) => {dispatch(sendUpdatedStock(newStock))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(StockAdmin);