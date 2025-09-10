"use client"

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register the required elements for Chart.js.
// This is necessary to render the chart correctly.
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the shape of a single item within the `labels` array.
// This provides type safety for the data used in the chart.
interface LabelItem {
  total_cost: number;
  title: string;
}

// Define the interface for the component's props.
export interface AnalysisProps {
  title: string;
  data: number | string;
  day?: string;
  percentage: number;
  labels: LabelItem[] | null;
}

const Analysis: React.FC<AnalysisProps> = ({ title, data, day, percentage, labels }) => {

  // Define the data structure for the Doughnut chart.
  // The type `ChartData<'doughnut'>` ensures we're providing the correct format.
  const chartData: ChartData<'doughnut'> = {
    labels: labels ? labels.map((item) => item.title) : [],
    datasets: [
      {
        label: 'Properties',
        data: labels ? labels.map((item) => item.total_cost) : [],
        backgroundColor: ['#03B5AA', '#FF3131', '#2f91fa'] 
      }
    ],
  };

  return (
    <div className='mb-5'>
      <div className='h-[170px] w-full border p-1'>
        <div className='shadow-md px-3 h-full bg-white rounded-tr-xl rounded-bl-xl w-full'>
          <div className='font-bold text-[35px]'>{data}</div>
          <div className='flex flex-col space-x-2'>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-col justify-center items-start gap-2'>
                  <div className='font-semibold text-gray-500 text-16 w-full'>{title}</div>
                  <div className='flex flex-row justify-start items-center space-x-2'>
                    <div className='p-2 bg-main-100 text-white rounded'>~ {percentage}%</div>
                    <div>{day}</div>
                  </div>
                </div>
                <div className='w-24 h-24'>
                  <Doughnut 
                    data={chartData} 
                    options={{
                      cutout: '60%',
                      plugins: {
                        legend: {
                          display: false
                        }
                      }
                    }}
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
