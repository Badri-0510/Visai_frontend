import React from 'react'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    plugins,
    ArcElement
}from 'chart.js';

import { Bar } from 'react-chartjs-2';
//investigate about the faker -dummy data provider


ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
)





export default function Barchart() {
    const options={
        responsive:true,
        plugins:{
            legend:{
                
            },
            title:{
                display:true,
                text:'BarChart'
            },   
        },
    }
    const data={
        labels:['Jan','Feb','Mar'],
        datasets:[{
            label:'Present',
            data:[11,13,12],
            backgroundColor:'rgba(255,99,132,0.5)'
        },
        {
            label:'absent',
            data:[4,3,2],
            backgroundColor:'rgba(53,162,235,0.5)'
        }
        ]
    }
  return (
   <Bar options={options} data={data} />
  )
}
