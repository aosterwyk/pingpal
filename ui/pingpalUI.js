function startPings() {
    let pingMe = document.getElementById('pingMe').value;
    // console.log(pingMe);
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
    else if(msgType == 'warning') {
        msgColor = `text-warning`;
    }
    else if(msgType == 'success') {
        msgColor = `text-success`;
    }
    else if(msgType == 'info') {
        msgColor = `text-muted`;
    }    
    else if(msgType == 'special') {
        msgColor = `text-info`;
    }
    else {
        msgColor = `text-muted`;
    }
    let statusBox = document.getElementById('statusBox')
    statusBox.innerHTML += `<span class="${msgColor}">${msg}</span><br>`;
    statusBox.scrollTop = statusBox.scrollHeight;
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
