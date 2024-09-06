import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend,
);

const LineChart_sec = (w) => {
    const data = {
        labels: ["NOV 15", "NOV 16", "NOV 17", "NOV 18", "NOV 19", "NOV 20", "NOV 21", "NOV 22"],
        datasets: [
            {
                label: 'Dataset 1',
                data:[1000,2000,1000, 2000, 2500,2000,2000, 2500],
                fill: false,
                borderColor: 'rgba(0, 102, 204, 0.7)',
                tension: .4,
                borderWidth: 3,
            },

        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
        },
        scales: {
            x: {
                display: true,
            },
            y: {
                display: true,
            }
        },
        maintainAspectRatio: false, //
    };


    return (
        <>
            <Line data={data} options={options} />
        </>
    );
};

export default LineChart_sec;
