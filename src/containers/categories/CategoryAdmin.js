import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import CreateCategory from '../../components/category/CreateCategory';
import { connect } from 'react-redux';
import { fetchCategories, sendCategoryDeleted } from '../../actions';
import UpdateCategories from '../../components/category/UpdateCategories';


class categoryAdmin extends Component {

    componentDidMount() {
        this.props.getAllCategories();
    }

    render() {
        const {
            allCategories,
            deleteCategory,
            getAllCategories
        } = this.props

        return (
            <Grid style={{padding: '7px'}}>
                <Grid.Column width="4">
                    <CreateCategory getAllCategories={getAllCategories} />
                </Grid.Column>
                <Grid.Column width="12">
                    <UpdateCategories deleteCategory={deleteCategory} allCategories={allCategories} />
                </Grid.Column>
            </Grid>
        );
    }

}

const mapStateToProps = state => {
    return {
        allCategories: state.categories.data
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCategories: () => {dispatch(fetchCategories())},
        deleteCategory: (categoryID)  => {dispatch(sendCategoryDeleted(categoryID))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(categoryAdmin);