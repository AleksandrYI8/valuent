import React, { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import LineChart from '../components/line';
import LineChart_sec from '../components/secLine';

// Регистрация компонентов

const home = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const arr = [
        {
            title: "Bitcoin",
            balance: "600 BTC",
            bg: 'bg-background-btc',
            img: "/btc.svg",
            mini: "btc",
            imgbg: "bg-purple-600"
        },
        {
            title: "Ethereum",
            balance: "600 ETH",
            bg: 'bg-background-eth',
            img: "/eth.svg",
            mini: "eth",
            imgbg: "bg-blue-400"
        },
        {
            title: "GridCoin",
            balance: "600 GRC",
            bg: 'bg-background-grc',
            img: "/grc.svg",
            mini: "grc",
            imgbg: "bg-red-400"
        },
        {
            title: "Aeternity",
            balance: "600 AE",
            bg: 'bg-background-ae',
            img: "/ae.svg",
            mini: "ae",
            imgbg: "bg-orange-500"
        }
    ]

    const sec_arr = [
        {
            title: "SEC Fails to Show Court Blockvest Tokens Are",
            date: "19 hours ago"
        },
        {
            title: "SEC Fails to Show Court Blockvest Tokens Are",
            date: "19 hours ago"
        },
        {
            title: "SEC Fails to Show Court Blockvest Tokens Are",
            date: "19 hours ago"
        },
        {
            title: "SEC Fails to Show Court Blockvest Tokens Are",
            date: "19 hours ago"
        },
        {
            title: "SEC Fails to Show Court Blockvest Tokens Are",
            date: "19 hours ago"
        },
        {
            title: "SEC Fails to Show Court Blockvest Tokens Are",
            date: "19 hours ago"
        },
        {
            title: "SEC Fails to Show Court Blockvest Tokens Are",
            date: "19 hours ago"
        },
        {
            title: "SEC Fails to Show Court Blockvest Tokens Are",
            date: "19 hours ago"
        },
        {
            title: "SEC Fails to Show Court Blockvest Tokens Are",
            date: "19 hours ago"
        },
        {
            title: "SEC Fails to Show Court Blockvest Tokens Are",
            date: "19 hours ago"
        },
        {
            title: "SEC Fails to Show Court Blockvest Tokens Are",
            date: "19 hours ago"
        },
        {
            title: "SEC Fails to Show Court Blockvest Tokens Are",
            date: "19 hours ago"
        },

        {
            title: "SEC Fails to Show Court Blockvest Tokens Are",
            date: "19 hours ago"
        },
    ]





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

    return (
        <>
            <div className="w-full text-[50px] text-white pl-[2%]">
                <div className="flex justify-between pt-[2%] mb-[2%] pr-[2%] items-center">
                    <div className="flex gap-[40px] items-center">
                        <h1 className='lg:text-[16px] xl:text-[18px]'>Overview</h1>
                        <p className='lg:text-[16px] xl:text-[18px] text-gray-500'>{count} {month_word}, {day_word}</p>
                    </div>
                    <div className="flex items-center">
                        <button className='lg:text-[14px] xl:text-[16px] font-[600] p-[15px] pt-[5px] pb-[5px] bg-blue-500 rounded-[20px] text-center items-center'>Add Widget</button>
                    </div>
                </div>
                <div className="w-full mb-[3%] flex gap-[1%]">
                    <div className="w-[30%] h-[25vh] rounded-[10px] flex justify-between items-center pl-[0] relative  bg-background-balance shadow-custom-shadow pt-[0] p-[2%]">
                        <div className="lg:w-[35%] mx-auto  xl:w-[40%]">
                            <Doughnut ref={chartRef} data={data} options={options} />
                        </div>
                        <div className="flex flex-col pt-[15px]">
                            {label.map((el, index) => {
                                return <div key={index}>
                                    <div className="flex mb-[10px] items-center gap-[15px]">
                                        <div className={`lg:w-[13px] xl:w-[15px] h-[15px] shadow-balabce-box-shadow rounded-[50%] bg-blue-500`}></div>
                                        <p className='lg:text-[14px] xl:text-[18px]'>{el.label}</p>
                                        <p className='lg:text-[14px] xl:text-[18px]'>{Math.floor(el.percentage)}%</p>
                                    </div>
                                </div>
                            })}
                        </div>

                        <div className="absolute flex flex-col lg:top-[26%] lg:left-[36%] xl:top-[25%] xl:left-[18%]">
                            <p className='lg:text-[11px] text-blue-500 xl:text-[17px]'>BALANCE</p>
                            <h1 className='lg:text-[12px] text-center xl:text-[20px]'>{label.reduce((a, b) => a + b.value, 0)} $</h1>
                        </div>
                    </div>


                    <div className="w-[68%] pr-[2%] gap-[3%] bg-background-balance shadow-custom-shadow rounded-[10px] flex overflow-x-auto no-scrollbar whitespace-nowrap">
                        {arr.map((data, index) => {
                            return <div key={index} className={`inline-block min-w-[38%] lg:h-[19vh] ${data.bg} lg:mb-[2%]  mb-[2%] xl:h-[25vh] rounded-[10px] shadow-custom-shadow xl:pt-[1%] lg:pt-[.5%] pr-[1%] pl-[1%] pb-[0]`}>
                                <h2 className='lg:text-[16px] xl:text-[18px]'>{data.title}</h2>
                                <div className="flex xl:justify-between items-center">
                                    <div className="flex pl-[2%] gap-[5px]">
                                        <div className={`${data.imgbg} lg:w-[32px] lg:h-[32px] xl:w-[50px] xl:h-[50px] flex justify-center  rounded-[50%]`}>
                                            <img className='lg:w-[17px] xl:w-[30px]' src={data.img} alt="" />
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <p className='lg:text-[12px] xl:text-[17px]'>{data.balance}</p>
                                            <span className='lg:text-[11px] xl:text-[15px] text-gray-400'>$30,000,0</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[10px] pr-[1%] items-center">
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                <img className='lg:w-[20px] xl:w-[40px]' src="/arrow.svg" alt="" />
                                            </div>
                                            <div className="border-b pb-[3px]">
                                                <p className='lg:text-[9px] xl:text-[12px]'>$1 200 = 0,074 {data.mini}</p>
                                                <p className='lg:text-[7px]  xl:text-[10px] text-gray-400'>1 {data.mini} = $6,542</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                <img className='lg:w-[20px] xl:w-[40px]' src="/arrow.svg" alt="" />
                                            </div>
                                            <div className="border-b pb-[3px]">
                                                <p className='lg:text-[9px] xl:text-[12px]'>$1 200 = 0,074 {data.mini}</p>
                                                <p className='lg:text-[7px] xl:text-[10px] text-gray-400'>1 {data.mini} = $6,542</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                <img className='lg:w-[20px] xl:w-[40px]' src="/arrow.svg" alt="" />
                                            </div>
                                            <div className="border-b pb-[3px]">
                                                <p className='lg:text-[9px] xl:text-[12px]'>$1 200 = 0,074 {data.mini}</p>
                                                <p className='lg:text-[7px] xl:text-[10px] text-gray-400'>1 {data.mini} = $6,542</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        })}

                    </div>


                </div>
                <div className="flex gap-[2%]">
                <div className={`w-[49%] lg:h-[34vh]  bg-background-balance shadow-custom-shadow xl:h-[40vh] flex flex-col items-start justify-between  rounded-[10px]`}>
                        <LineChart_sec />
                    </div>
                    <div className="w-[49%] lg:h-[34vh] xl:h-[40vh] pr-[2%] bg-background-balance shadow-custom-shadow p-[1%]">
                        <h1 className='lg:text-[14px] xl:text-[16px] mb-[1%]'>Recent News</h1>
                        <div className="w-full h-[1px] mb-[2%] bg-blue-500"></div>
                        <div className="flex overflow-auto no-scrollbar h-[33vh] flex-col">
                            {sec_arr.map((el) => {
                                return <div className="flex w-full justify-between items-center mb-[5%]">
                                    <p className='lg:text-[12px] xl:text-[14px]  leading-tight lg:w-[38%] text-gray-600'>{el.date}</p>
                                    <p className='lg:text-[12px] xl:text-[14px] leading-tight lg:w-[60%]'>{el.title}</p>
                                </div>
                            })}




                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default home;
