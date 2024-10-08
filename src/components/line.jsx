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

const LineChart = () => {
    const data = {
        labels: [2, 4, 6, 8, 10, 12],
        datasets: [
            {
                label: 'Dataset 1',
                data: [650, 590, 800, 810, 560, 550, 400],
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
                display: false,
            }
        },
        maintainAspectRatio: true,
    };


    return (
        <div className='w-[25%] flex flex-col items-start justify-between bg-background-balance shadow-custom-shadow rounded-[10px]'>
            <h2 className='pl-[5%] lg:text-[16px] xl:text-[22px] text-white pt-[0] mb-[15px]'>Spending</h2>
            <div className="flex flex-col gap-[0px] pl-[5%]">
                <p className='lg:text-[30px] xl:text-[35px] text-white'>$ {data.datasets[0].data.reduce((a,b) => a+b ,0)}</p>
                <span className='lg:text-[13px] xl:text-[15px] text-gray-600 mb-[15px]'>total spending</span>
            </div>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
