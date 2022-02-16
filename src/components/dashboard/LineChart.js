import React, { Component } from 'react'
import Chart from "chart.js";
import { addDataChart } from '../function/Utilities';

export default class LineChart extends Component {
    
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.myChart = null;
        this.myChartRef = null;
    }

    componentDidUpdate() {

    }

    componentDidMount() {
        const { labels, title, color, data } = this.props;
        if (this.chartRef.current !== null) {
            this.myChartRef = this.chartRef.current.getContext("2d");
            const config = {
                type: "line",
                data: {
                    //Bring in data
                    labels: labels,
                    datasets: [
                        {
                            label: title,
                            backgroundColor: color,
                            borderColor: color,
                            data: data,
                            fill: false
                        }
                    ]
                },
                options: {
                    //Customize chart options
                    responsive: true,
                }
            };
            this.myChart = new Chart(this.myChartRef, config);
        }
    }

    render() {

        const {
            labels,
            data,
        } = this.props;

        if (this.myChart) {
            addDataChart(this.myChart, data, labels);
        }

        return (
            <canvas
                ref={this.chartRef}
            />
        )
    }
}