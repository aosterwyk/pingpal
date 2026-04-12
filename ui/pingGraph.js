let pingCount = 0;
let highestPing = 0;

const COLOR_NORMAL = 'rgba(0, 0, 128, 1)';
const COLOR_FAIL   = 'rgba(220, 53, 69, 1)';

const ctx = document.getElementById('pingChart');
const pingChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'ms',
            data: [],
            pointBackgroundColor: [],
            pointBorderColor: [],
            borderColor: COLOR_NORMAL,
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

function addPings(alive, labelString, newPingValue) {
    pingCount += 1;

    const dataset = pingChart.data.datasets[0];

    if (pingCount > 50) {
        pingChart.data.labels.shift();
        dataset.data.shift();
        dataset.pointBackgroundColor.shift();
        dataset.pointBorderColor.shift();
    }

    const color = alive ? COLOR_NORMAL : COLOR_FAIL;
    pingChart.data.labels.push(labelString);
    dataset.data.push(newPingValue);
    dataset.pointBackgroundColor.push(color);
    dataset.pointBorderColor.push(color);
    pingChart.update();

    document.getElementById('pingCount').innerText = pingCount;

    if (!alive) {
        const pingFails = document.getElementById('pingFailures');
        pingFails.innerText = Number(pingFails.innerText) + 1;
    } else {
        document.getElementById('lastResponse').innerText = `${newPingValue}ms`;
        if (newPingValue > highestPing) {
            document.getElementById('highestPing').innerText = `${newPingValue}ms`;
            highestPing = newPingValue;
        }
    }
}
