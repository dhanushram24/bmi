import React, { useRef, useEffect } from 'react';
import styles from './chartcontainer.module.css';
import { Chart } from 'chart.js/auto';


export default function ChartContainer({ bmiResult }){
	const chartRef = useRef(null);

  const createChart = (data) => {
    const context = chartRef.current.getContext('2d');
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }
    const newChart = new Chart(context, {
      type: 'bar',
      data: {
        labels: ['Underweight', 'Normal', 'Overweight', 'Obesity'],
        datasets: [
          {
            label: 'Info',
            data,
            backgroundColor: [
              'rgb(255, 255, 51, 0.2)',
              'rgb(0, 255, 0, 0.2)',
              'rgb(255, 128, 0, 0.2)',
              'rgb(255, 0, 0, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    chartRef.current.chart = newChart;
  };

  useEffect(() => {
    createChart([0, 0, 0, 0]);
    const dataIndex =
      bmiResult < 18.5
        ? 0
        : bmiResult >= 18.5 && bmiResult <= 24.9
        ? 1
        : bmiResult >= 25 && bmiResult <= 29.9
        ? 2
        : 3;

    if (chartRef.current.chart) {
      chartRef.current.chart.data.datasets[0].data[dataIndex] = bmiResult;
      chartRef.current.chart.update();
    }
  }, [bmiResult]);
			
	return(
		<div className={styles.myResultContainer}>
			<div className={styles.myResultBox}>
				<p className={styles.myBmiText}>Your BMI is</p>
				<p
				className={`${styles.myBmiValue} ${
					bmiResult < 18.5 ? styles.myUnderweight : bmiResult <= 24.9 ? styles.myNormal : styles.myObese
				}`}
				>
				{bmiResult}
				</p>
			</div>

			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
				<div style={{ width: '50%', height: '30vh' }}>
					<canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
				</div>
			</div>

			<div>
				{isNaN(bmiResult) ? (
				<h1></h1>
				) : bmiResult < 18.5 ? (
				<h1 style={{fontSize:'35px'}} className={styles.myUnderweight}>Underweight</h1>
				) : bmiResult <= 24.9 ? (
				<h1 style={{fontSize:'35px'}} className={styles.myNormal}>Normal</h1>
				) : bmiResult <= 29.9 ? (
					<h1 style={{fontSize:'35px'}} className={styles.myObese}>Overweight</h1>
				) : (
				<h1 style={{fontSize:'35px'}} className={styles.myObese}>Obese</h1>
				)}
			</div>

			<div className={styles.myHealthInfo}>
				<p>By maintaining a healthy weight, you lower your risk of developing serious health problems.</p>
				<p className={styles.myHealthyBMI}>Healthy BMI range: 18.5 kg/m² - 25 kg/m²</p>
			</div>
		</div>
    
    
	);
}