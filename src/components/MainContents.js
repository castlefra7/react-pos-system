import React, { Component } from 'react';
import { Grid, } from 'semantic-ui-react';
import Categories from './category/Categories';
import Products from './product/Products';


class MainContents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeCategories: ""
        };

    }

    changeActiveCategories = (idCategory) => {
        this.setState({ activeCategories: idCategory });
    }


    render() {

        const {
            allCategories,
            showProducts,
            addNewOrder,
            currentProducts,
            leftCategoryPosition
        } = this.props;

        let leftCategory = [];
        let rightCategory = [];

        if (allCategories.length <= 7) {
            leftCategory = allCategories;
        } else {

            for (let i = 0; i < 7; i++) {
                leftCategory.push(allCategories[i])
            }

            for (let i = 7; i < allCategories.length; i++) {
                rightCategory.push(allCategories[i]);
            }
        }

        const leftStyle =
        {
            position: 'fixed',
            left: leftCategoryPosition === undefined ? '64.25em' : leftCategoryPosition
        };

        return (
            <Grid>
                <Grid.Column style={{ position: 'fixed', left: '0' }} key={0} width={2}>
                    <Categories
                        changeActiveCategories={this.changeActiveCategories} 
                        showProducts={showProducts} 
                        allCategories={leftCategory} 
                        activeCategories={this.state.activeCategories}
                        idColumn={"1"}
                    />
                </Grid.Column>

                <Grid.Column style={{ marginLeft: '9.7rem' }} key={1} width={12}>
                    <Products addNewOrder={addNewOrder} currentProducts={currentProducts} />
                </Grid.Column>

                <Grid.Column style={leftStyle} key={2} width={2}>
                    <Categories
                        changeActiveCategories={this.changeActiveCategories} 
                        showProducts={showProducts} 
                        allCategories={rightCategory} 
                        activeCategories={this.state.activeCategories}
                        idColumn={"2"}
                    />
                </Grid.Column>
            </Grid>
        );
    }

}

export default MainContents;