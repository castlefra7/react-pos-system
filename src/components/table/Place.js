import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Place = (props) => {
    const style = {
        width: '25px',
        margin: '0 auto',
        lineHeight: '100px'
    };
    const contentStyle = {
        minHeight: '100px'
    };

    return (
        <Link to={`/place-order?placeID=${props.place.placeID}&placeName=${props.place.placeName}`}>
            <Card style={contentStyle}>
                <Card.Content>
                    <div style={style}>{props.place.placeName}</div>
                </Card.Content>
            </Card>
        </Link>
    )
};

export default Place;