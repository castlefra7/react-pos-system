import React, { Component } from 'react';
import { colors } from '../../components/dashboard/DataTest';
import LineChart from '../../components/dashboard/LineChart';
import { Grid, Card, Button } from 'semantic-ui-react';
import PieChart from '../../components/dashboard/PieChart';
import HorizontalBar from '../../components/dashboard/HorizontalBar';
import '../../stylesheets/Graph.css';
import '../../stylesheets/Main.css';
import { connect } from 'react-redux';
import { fetchStatistics } from '../../actions';
import { currencyFormat } from '../../components/function/NumberManipulation';
import { months } from '../../components/function/Utilities';

class Graph extends Component {

    style = {
        textAlign: 'center'
    };

    constructor(props) {
        super(props);
        let today = new Date();

        this.state = {
            month: today.getMonth(),
            year: today.getFullYear()
        }
    }

    componentWillMount() {
        this.props.getStatistics(this.state.month + 1, this.state.year);
    }

    dateChanged = (isNext) => {
        if (isNext) {
            let newToday = new Date(this.state.year, this.state.month + 1);
            this.setState({ month: newToday.getMonth(), year: newToday.getFullYear() }, () => {
                this.props.getStatistics(this.state.month + 1, this.state.year);
            })
        } else {
            let newToday = new Date(this.state.year, this.state.month - 1);
            this.setState({ month: newToday.getMonth(), year: newToday.getFullYear() }, () => {
                this.props.getStatistics(this.state.month + 1, this.state.year);
            })
        }


    }

    render() {

        const {
            statistics
        } = this.props;
        
        const data = [];
        const labels = [];

        if(statistics.lineData) {
            statistics.lineData.forEach(sale => {
                data.push(parseFloat(sale.data));
            });
        }
        
        if(statistics.label) {
            statistics.label.forEach(lab => {
                labels.push(lab.data);
            });
        }
   

        const data1 = [];
        const labels1 = [];
        const background = [];
        let total = 0;
        if(statistics.pieData) {
            statistics.pieData.forEach(category => {
                const amount = parseFloat(category.data);
                total += parseFloat(amount);
            });
            
            statistics.pieData.forEach((category, id) => {
                const amount = parseFloat(category.data);
                data1.push(amount);
                labels1.push(((amount / total).toFixed(2) * 100).toFixed(0) + "% " + category.info);
                background.push(colors[id]);
            });
        }
        


        const data2 = [];
        const labels2 = [];
        if(statistics.horizontalData) {
            statistics.horizontalData.forEach(product => {
                data2.push(product.data);
                labels2.push(product.info);
            });
    
        }
        

        const gridStyle = {
            padding: '17px'
        }
        return (
            <Grid columns="equal" style={gridStyle} padded stackable>
                <Grid.Row>
                    <Grid.Column style={{ padding: '0px' }}>
                        <Button
                            className={"button-style"}
                            size={"mini"}
                            icon='left arrow'
                            onClick={() => this.dateChanged(false)}
                        />
                        <strong>{months[this.state.month]} {this.state.year}</strong>
                        <Button
                            className={"button-style"}
                            size={"mini"}
                            icon='right arrow'
                            onClick={() => this.dateChanged(true)}
                        />
                    </Grid.Column>
                </Grid.Row>

                <Card.Group style={{ padding: '0px' }}>
                    <Card>
                        <Card.Content >
                            <Card.Header>{statistics.totalOrders}</Card.Header>
                            <Card.Description>
                                Nombre de commandes
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content >
                            <Card.Header>{currencyFormat(statistics.totalTurnover)}</Card.Header>
                            <Card.Description>
                                Chiffre d'affaires
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content >
                            <Card.Header>{statistics.totalProductsSold}</Card.Header>
                            <Card.Description>
                                Produits vendus
                                    </Card.Description>
                        </Card.Content>
                    </Card>
                </Card.Group>

                <Grid.Row columns="2">
                    <Grid.Column width="8" style={{ marginRight: '17px' }} className={"box"}>
                        <h4>Top 5 des produits les plus vendus</h4>
                        <HorizontalBar
                            title={"Produits"}
                            data={data2}
                            labels={labels2}
                        />
                    </Grid.Column>
                    <Grid.Column width="7" className={"box"}>
                        <h4>Répartition des ventes par catégorie</h4>
                        <PieChart
                            title={"Catégorie de produits"}
                            data={data1}
                            labels={labels1}
                            backgroundColor={background}
                        />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width="12" className={"box"}>

                        <h4>Montant des ventes journalières. Mois de {months[this.state.month]}.</h4>

                        <LineChart
                            color={"#14EAF5"}
                            title={"Ventes"}
                            labels={labels} data={data} />
                    </Grid.Column>
                </Grid.Row>

            </Grid>);
    }
}

const mapStateToprops = state => {
    return {
        statistics: state.statistics.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getStatistics: (month, year) => { dispatch(fetchStatistics(month, year)) }
    }
};

export default connect(mapStateToprops, mapDispatchToProps)(Graph);
