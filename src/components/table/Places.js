import React, { Component } from 'react';
import Place from './Place';
import { Grid } from 'semantic-ui-react';
import serverIP from '../function/ServerInfo';

class Places extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allPlaces: []
        };
    }

    componentDidMount() {
        const allUnpaidOrders = `${serverIP}/api/places`;
        fetch(allUnpaidOrders, {mode: 'cors'})
        .then(result => { return result.json(); })
        .then(data => {
            this.setState({allPlaces: data});
        })
        .catch(Error => {
            console.log("PLACES ERROR: " + Error);
        })
    }

    render() {
        const showAll = this.state.allPlaces.map(place => {
            return (<Grid.Column key={place.placeID}><Place place={place} /></Grid.Column>);
        });

        return (
            <Grid columns={5}>
                {showAll}
            </Grid>
        );
    }
}

export default Places;