import React, { Component } from 'react'
import Chart from "chart.js";
import { addDataChart } from '../function/Utilities';

export default class HorizontalBar extends Component {



    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.myChart = null;
    }

    componentDidMount() {

        const {
            labels,
            title,
            data,
        } = this.props;


        if (this.chartRef.current !== null) {
            console.log(data);
            console.log(labels);

            const myChartRef = this.chartRef.current.getContext("2d");
            var horizontalBarChartData = {
                labels: labels,
                datasets: [{
                    label: title,
                    backgroundColor: "#53CAA6",
                    borderColor: "#53CAA6",
                    borderWidth: 1,
                    data: data
                }]
            };

            this.myChart = new Chart(myChartRef, {
                type: "horizontalBar",
                data: horizontalBarChartData,
                options: {
                    elements: {
                        rectangle: {
                            borderWidth: 2,
                        }
                    },
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false,
                        text: title
                    }
                }
            });
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