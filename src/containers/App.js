import React, { Component } from 'react';
import './App.css';
import Container from './Container';
import { Switch, Route } from 'react-router-dom';
import { bodyHeight } from '../components/function/Utilities';
import CreateProduct from '../components/product/CreateProduct'
import AllProducts from './products/AllProducts'
import AllOrders from './orders/AllOrders';
import Header from '../components/Header';
import Graph from './stats/Graphs'
import Fade from '../components/message/Fade';
import { connect } from 'react-redux';
import { clearInformation } from '../actions';

import { ProtectedRoute } from '../services/protected.route';
import auth from '../services/auth';
import categoryAdmin from './categories/CategoryAdmin';
import StockAdmin from './stocks/StockAdmin';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: ''
        }
    }

    logout = () => {
        auth.logout(() => {
            alert("DECONNECTER AVEC SUCCESS");
            this.setState({password: ''});
        });
    }

    login = () => {
        auth.login(this.state.password, (status) => {
            if (status.loggedIn) {
                alert("CONNECTER AVEC SUCCESS");
                this.setState({password: ''})
            } else {
                alert("MAUVAIS MOT DE PASSE");
            }
        });
    }

    handleChange = (event) => {
        this.setState({ password: event.target.value });
    }


    render() {
        const {
            message,
            isError,
            clearInformation
        } = this.props;

        const style = {
            overflowY: 'scroll',
            height: bodyHeight(document),
            minHeight: bodyHeight(document),
            maxHeight: bodyHeight(document),
        };

        if (message !== "") {
            setTimeout(() => {
                clearInformation();
            }, 3000);
        }


        return (
            <div className="app" style={style}>
                <Header password={this.state.password} isAuthenticated={auth.isAuthenticated()} handleChange={this.handleChange} logout={this.logout} login={this.login} />
      
                <Switch>
                    <Route exact path='/' component={Container} />
                    <Route exact path='/all-orders' component={AllOrders} />
                    <ProtectedRoute exact path='/category-admin' component={categoryAdmin} />
                    <ProtectedRoute exact path='/create-product' component={CreateProduct} />
                    <ProtectedRoute exact path='/all-products' component={AllProducts} />
                    <ProtectedRoute exact path='/all-graphs' component={Graph} />
                    <ProtectedRoute exact path='/all-stocks' component={StockAdmin} />
                </Switch>
                <Fade
                    isError={isError}
                    message={message}
                />


            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isError: state.information.isError,
        message: state.information.message
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearInformation: () => { dispatch(clearInformation()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
