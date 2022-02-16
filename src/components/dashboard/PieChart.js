import React, { Component } from 'react'
import Chart from "chart.js";
import { addDataChart } from '../function/Utilities';

export default class PieChart extends Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.myChart = null;
    }

    componentDidMount() {
        if (this.chartRef.current !== null) {
            const myChartRef = this.chartRef.current.getContext("2d");

            this.myChart = new Chart(myChartRef, {
                type: "doughnut",
                data: {
                    //Bring in data
                    labels: this.props.labels,
                    datasets: [
                        {
                            label: this.props.title,
                            data: this.props.data,
                            backgroundColor: this.props.backgroundColor
                        }
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        position: 'right'
                    },
                    title: {
                        display: false,
                        text: this.props.title
                    }
                }
            });
        }
    }

    render() {

        const {
            labels,
            data,
            backgroundColor
        } = this.props;

        if (this.myChart) {
           addDataChart(this.myChart, data, labels, backgroundColor);
        }
  
        return (
            <canvas
                ref={this.chartRef}
            />
        )
    }
}