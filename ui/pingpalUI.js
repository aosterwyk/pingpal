function startPings() {
    let pingMe = document.getElementById('pingMe').value;
    window.pingpal.startPings(pingMe);    
}

function stopPings() {
    window.pingpal.stopPings();
}

function startButton(status) {
    let startButton = document.getElementById('startButton');
    newText = "Start";
    if(status) {
        newText = "Running";
    }
    else {
        newText = "Start";
    }
    startButton.innerText = newText;
}

function updateStatus(msgType, msg) {
    let msgColor = `text-white-75`;
    if(msgType == 'error') {        
        msgColor = `text-danger`;
    }
    else if(msgType == 'info') {
        msgColor = `text-muted`;
    }    
    else {
        msgColor = `text-muted`;
    }
    let statusBox = document.getElementById('statusBox')
    // statusBox.innerHTML += `<span class="${msgColor}">${msg}</span><br>`;
    statusBox.innerHTML += `<option class="${msgColor}">${msg}</option>`;
    statusBox.scrollTop = statusBox.scrollHeight;
    
    let logToFileSetting = document.getElementById('logToFileCheck'); 
    if(logToFileSetting.checked && msgType != 'noLog') {
        let pingThis = document.getElementById('pingMe').value;        
        let logData = {
            host: pingThis,
            msg: msg
        };
        window.pingpal.writeToLog(logData);
    }
}

function playSound(soundFile){
    let sound = new Audio(soundFile);
    sound.play();
}

function pingFailed() {
    let failSoundEnabled = document.getElementById('soundOnFail');
    addPings(false,0);
    if(failSoundEnabled.checked) {
        playSound("./Obsydianxs_interface_sfx_pack_WAV_error_style_2_002.mp3");
    }
}

function externalPage(page) {
    window.pingpal.externalPage(page);
}

function openLog() {
    let pingThis = document.getElementById('pingMe').value;
    if(pingThis.length > 1) {    
        window.pingpal.openLog(pingThis);
    }
}
