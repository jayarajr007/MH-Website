/*! 
* Sample Chart
*/
if(document.getElementById('timeSpend')) {
    var ctx = document.getElementById('timeSpend').getContext('2d');
    var timeSpend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7', 'Chapter 8', 'Chapter 9', 'Chapter 10'],
            datasets: [{
                label: 'Minutes',
                fill: true,
                data: [20, 45, 25, 55, 40, 10, 40, 30, 20, 45],
                backgroundColor: 'rgb(237, 237, 237)',
                borderColor: 'rgb(237, 57, 108)',
                lineTension: 0.4,
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

/*! 
* result page donut
*/
if(document.getElementById('questionStatistics')) {
    var resultDonut = document.getElementById('questionStatistics').getContext('2d');
    document.getElementById('questionStatistics').height = 200;
    var timeSpend = new Chart(resultDonut, {
        type: 'doughnut',
        data: {
            labels: ['Correct Answers', 'Wrong Answers', 'Unanswered'],
            datasets: [{
                label: 'Minutes',
                fill: true,
                data: [33, 33, 33],
                backgroundColor: [
                    'rgb(96, 197, 37)',
                    'rgb(242, 36, 71)',
                    'rgb(74, 85, 91)',
                ],
                borderColor: [
                    'rgb(255, 255, 255)',
                    'rgb(255, 255, 255)',
                    'rgb(255, 255, 255)',
                ],
                lineTension: 0.4,
                borderWidth: 10
            }]
        },
        options: {
            scales: {
                // y: {
                //     beginAtZero: false
                // }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            elements: {
                arc: {
                    hoverOffset: '20'
                }
            },
            responsive: false,
            maintainAspectRatio: true
        }
    });
}
