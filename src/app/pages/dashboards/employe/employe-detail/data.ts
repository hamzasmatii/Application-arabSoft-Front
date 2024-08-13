import { ChartType } from './chartjs.model';

const lineAreaChart: ChartType = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
    datasets: [
        {
            label: 'Sales Analytics',
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'rgba(85, 110, 230, 0.2)',
            borderColor: '#556ee6',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#556ee6',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#556ee6',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80]
        }
    ],
    options: {
        defaultFontColor: '#8791af',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
                    gridLines: {
                        color: 'rgba(166, 176, 207, 0.1)',
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        max: 100,
                        min: 20,
                        stepSize: 10,
                    },
                    gridLines: {
                        color: 'rgba(166, 176, 207, 0.1)',
                    },
                },
            ],
        },

    }
};

const lineBarChart: ChartType = {
    labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July'
    ],
    datasets: [
        {
            label: 'Sales Analytics',
            backgroundColor: 'rgba(52, 195, 143, 0.8)',
            borderColor: 'rgba(52, 195, 143, 0.8)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(52, 195, 143, 0.9)',
            hoverBorderColor: 'rgba(52, 195, 143, 0.9)',
            data: [65, 59, 81, 45, 56, 80, 50, 20],
            barPercentage: 0.4

        },
    ],
    options: {
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
                    gridLines: {
                        color: 'rgba(166, 176, 207, 0.1)'
                    },
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        color: 'rgba(166, 176, 207, 0.1)'
                    }
                }
            ]
        }
    }
};



export { lineAreaChart, lineBarChart };
