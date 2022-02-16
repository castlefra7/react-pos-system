import React from 'react'
import { Grid } from 'semantic-ui-react';
import UpdateCategory from './UpdateCategory';


const updateCategories = (props) => {
    const {
        allCategories,
        deleteCategory
    } = props;

    return (
        <Grid columns="4">
            {allCategories.map((category) =>(
                <Grid.Column key={category.categoryID}>
                    <UpdateCategory deleteCategory={deleteCategory} category={category} />

                </Grid.Column>
            ))}
        </Grid>
    );
}

export default updateCategories;