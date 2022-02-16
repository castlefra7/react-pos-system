import React from 'react';
import { Menu } from 'semantic-ui-react';

const style = {
    textAlign: 'Left',
    minHeight: '75px',
    height: '75px',
    maxHeight: '75px',
    maxWidth: '100px',
    wordWrap: 'break-word',
}

const pStyle = {
    margin: '0',
    position: 'relative',
    top: '50%',
    transform: 'translate(-5%, -50%)'
}

const Category = props => (
    
    <Menu.Item
        color={"brown"}
        active={props.category.categoryID === props.active && props.idColumn === props.activeCategories  }
        name={props.category.categoryName}
        onClick={() => { props.changeActiveCategories(props.idColumn); props.changeActive(props.category.categoryID); props.showProducts(props.category.categoryID);}}
        style={style}
    >
        <p style={pStyle}>{props.category.categoryName} <small>({props.category.categoryTaste})</small></p>

    </Menu.Item>
);

export default Category;

// <Image avatar alt={props.category.image} src={process.env.PUBLIC_URL + "/images/" +props.category.categoryImage} />
