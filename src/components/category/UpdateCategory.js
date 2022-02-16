
import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react';


const updateCategory = (props) => {

    const {
        category, 
        deleteCategory
    } = props;
    console.log(category.categoryID)

    return (
        <Card >
            <Image
                size='mini' src={process.env.PUBLIC_URL + "/images/" + category.categoryImage} wrapped ui={false}
            />
            <Card.Content>
                <Card.Header>
                    {category.categoryName.charAt(0).toUpperCase() + category.categoryName.slice(1)}
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <Button fluid style={{ marginTop: '2px' }} onClick={() => deleteCategory(category.categoryID)}  color='red'>Supprimer</Button>
            </Card.Content>
        </Card>);
}

export default   updateCategory;