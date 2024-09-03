import React, { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// Регистрация компонентов

const home = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



    const [label, setLabels] = useState([])
    const chartRef = useRef();

    const date = new Date
    const month = date.getMonth()
    const day = date.getDay()
    const count = date.getDate()

    const day_word = daysOfWeek[day]
    const month_word = months[month]

    console.log(day_word, month_word, count);

    const data = {
        labels: ['Ethereum', 'Bitcoin', 'Dash'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [1750, 1950, 4500],
                backgroundColor: [
                    'rgba(250, 214, 121, 1',
                    'rgba(245, 251, 254, 1)',
                    'rgba(1, 143, 255, 1)',
                ],
                hoverOffset: 4,
                borderWidth: 0,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false, // Отображать легенду
                position: 'bottom', // Позиция легенды
                labels: {
                    font: {
                        size: 14, // Размер шрифта меток
                    },
                    color: '#fff', // Цвет текста меток
                },
            },
            tooltip: {
                enabled: true, // Включение подсказок
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value} dollars`; // Форматирование текста подсказок
                    },
                },
            },
        },
        cutout: '80%',
        maintainAspectRatio: true,
    };

    useEffect(() => {
        const chartInstance = chartRef.current;

        if (chartInstance) {
            // Доступ к данным диаграммы
            const { labels } = chartInstance.data;
            const { data: values, backgroundColor: colors } = chartInstance.data.datasets[0];

            // Вычисление общей суммы значений
            const total = values.reduce((acc, value) => acc + value, 0);

            // Формирование массива данных с метками, процентами и цветами
            const chartDetails = labels.map((label, index) => {
                const value = values[index];
                const percentage = ((value / total) * 100).toFixed(2); // Вычисление процентов

                return {
                    label,
                    value,
                    percentage,
                    color: colors[index],
                };
            });

            setLabels(chartDetails);
        }
    }, []);








    console.log(label);
    return (
        <>
            <div className="w-full text-[50px] text-white pl-[2%]">
                <div className="flex justify-between pt-[2%] mb-[2%] pr-[2%] items-center">
                    <div className="flex gap-[40px] items-center">
                        <h1 className='text-[18px]'>Overview</h1>
                        <p className='text-[18px] text-gray-500'>{count} {month_word}, {day_word}</p>
                    </div>
                    <div className="flex items-center">
                        <button className='text-[16px] font-[600] p-[15px] pt-[5px] pb-[5px] bg-blue-500 rounded-[20px] text-center items-center'>Add Widget</button>
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-[20%] rounded-[10px] flex flex-col relative gap-[10px] bg-background-balance shadow-custom-shadow pt-[0] p-[2%]">
                        <h1 className='text-[22px] pt-[1%] mb-[10px]'>Balance</h1>
                        <div className="w-[70%] mx-auto mb-[15px]">
                            <Doughnut ref={chartRef} data={data} options={options} />
                        </div>
                        {label.map((el) => {
                            return <div key={el.index} className='flex justify-between' >
                                <div className="flex items-center gap-[5px]">
                                    <div className={` w-[15px] h-[15px] shadow-balabce-box-shadow rounded-[50%] bg-blue-500`}></div>
                                    <p className='text-[16px]'>{el.label}</p>
                                </div>
                                <div className="">
                                    <p className='text-[16px]'>{Math.floor(el.percentage)}%</p>
                                </div>
                            </div>
                        })}

                        <div className="absolute flex flex-col top-[28%] left-[36%]">
                            <p className='text-[17px] text-blue-500'>BALANCE</p>
                            <h1 className='text-[20px] text-center'>{label.reduce((a, b) => a + b.value, 0)} $</h1>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default home;
