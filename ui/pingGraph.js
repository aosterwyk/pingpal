var pingCount = 0;

const ctx = document.getElementById('pingChart');
const pingChart = new Chart(ctx, {
    type: 'line',
    data: {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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

function addPings() {
    let newPingValue = Math.floor((Math.random() * 100) + 1);
    pingCount += 1;
    document.getElementById('pingCount').innerText = pingCount;
    // log to status window
    // update fail count if ping failed
    // get timestamp and add it to label
    addData(pingChart, '', newPingValue);
}
