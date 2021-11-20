var pingCount = 0;

const ctx = document.getElementById('pingChart');
const pingChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [''],
        datasets: [{
            label: 'ms',
            // data: [12, 19, 3, 5, 2, 3],
            data: [0],
            backgroundColor: [
                'rgba(0, 255, 255, 1)'
            ],
            borderColor: [
                'rgba(0, 255, 255, 1)'
            ],
            borderWidth: 1
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

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function addPings(alive, newPingValue) {
    // let newPingValue = Math.floor((Math.random() * 100) + 1);
    pingCount += 1;
    if(pingCount > 50) { // remove old data older than 50
        pingChart.data.labels.shift();
        pingChart.data.datasets.forEach((dataset) => {
            dataset.data.shift();
        });
        pingChart.update();
    }
    document.getElementById('pingCount').innerText = pingCount;
    if(!alive) {
        let pingFails = document.getElementById('pingFailures');
        pingFails.innerText = Number(pingFails.innerText) + 1;
    }    
    // get timestamp and add it to label
    addData(pingChart, '', newPingValue);
}