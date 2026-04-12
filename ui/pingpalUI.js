function startPings() {
    const pingMe = document.getElementById('pingMe').value;
    window.pingpal.startPings(pingMe);
    startButton(true);
}

function stopPings() {
    window.pingpal.stopPings();
    startButton(false);
}

function startButton(status) {
    const btn = document.getElementById('startButton');
    btn.innerText = status ? 'Running' : 'Start';
}

function updateStatus(msgType, msg) {
    let msgColor = 'text-muted';
    if (msgType === 'error') {
        msgColor = 'text-danger';
    }
    const statusBox = document.getElementById('statusBox');
    const option = document.createElement('option');
    option.className = msgColor;
    option.textContent = msg;
    statusBox.appendChild(option);
    // cap at 500 entries to avoid unbounded memory growth
    while (statusBox.options.length > 500) {
        statusBox.remove(0);
    }
    statusBox.scrollTop = statusBox.scrollHeight;

    const logToFileSetting = document.getElementById('logToFileCheck');
    if (logToFileSetting.checked && msgType !== 'noLog') {
        const pingThis = document.getElementById('pingMe').value;
        window.pingpal.writeToLog({ host: pingThis, msg });
    }
}

function playSound(soundFile) {
    const sound = new Audio(soundFile);
    sound.play();
}

function externalPage(page) {
    window.pingpal.externalPage(page);
}

function openLog() {
    const pingThis = document.getElementById('pingMe').value;
    if (pingThis.length > 1) {
        window.pingpal.openLog(pingThis);
    }
}

// Wire up button event listeners
document.getElementById('startButton').addEventListener('click', startPings);
document.getElementById('stopButton').addEventListener('click', stopPings);
document.getElementById('openLogBtn').addEventListener('click', openLog);
document.getElementById('githubLink').addEventListener('click', () => externalPage('github'));

// Register main-process push events
window.pingpal.onStatusUpdate(({ msgType, msg }) => {
    updateStatus(msgType, msg);
});

window.pingpal.onPingResult(({ alive, label, time }) => {
    addPings(alive, label, time);
    if (!alive) {
        const failSoundEnabled = document.getElementById('soundOnFail');
        if (failSoundEnabled.checked) {
            playSound('./Obsydianxs_interface_sfx_pack_WAV_error_style_2_002.mp3');
        }
    }
});
