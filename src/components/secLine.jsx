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

const LineChart_sec = () => {
    const data = {
        labels: ["NOV 15", "NOV 16", "NOV 17", "NOV 18", "NOV 19", "NOV 20", "NOV 21", "NOV 22"],
        datasets: [
            {
                label: 'Dataset 1',
                data: [2000,1500,4000, 3000, 4000,2000,4000],
                fill: false,
                borderColor: 'rgba(0, 102, 204, 0.7)',
                tension: .4,
                borderWidth: 3,
                borderRadius: 10,
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
        maintainAspectRatio: true,
    };


    return (
        <div className='w-[70%] flex flex-col items-start justify-between bg-background-balance shadow-custom-shadow rounded-[10px]'>
            <h2 className='pl-[5%] text-[22px] text-white pt-[0] mb-[15px]'>Market</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart_sec;
