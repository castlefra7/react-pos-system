import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import Category from './Category';


class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: ''
        };
    }

    changeActive = (categoryID) => {
        this.setState({ active: categoryID });
    }

    render() {
        return (
            <Menu inverted icon='labeled' vertical>
                {this.props.allCategories.map((category) => (
                    <Category idColumn={this.props.idColumn} activeCategories={this.props.activeCategories} changeActiveCategories={this.props.changeActiveCategories} active={this.state.active} changeActive={this.changeActive} key={category.categoryID} showProducts={this.props.showProducts} category={category} />
                ))}
            </Menu>);
    }

};

export default Categories;