var ping = require('ping');
const path = require('path');
const { sleep } = require('./utils/sleep');
const { ipcMain, app, BrowserWindow } = require('electron');
var win;
var timeBetweenPings = 1;
var runPings = false;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('./ui/index.html');
    win.setMenu(null);
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

function statusMsg(msgType, msg) {
    win.webContents.executeJavaScript(`updateStatus("${msgType}", "${msg}")`);
    console.log(msg);
}

async function startPings(pingMe) {
    do {
        let res = await ping.promise.probe(pingMe);
        // update value in UI         
        if(res.alive) {
            // console.log(res);
            const timestamp = new Date();
            let statusString = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()} ${res.numeric_host} ${res.time}ms`;
            statusMsg('info', statusString);
            win.webContents.executeJavaScript(`addPings(true,${res.time})`);
        }
        else {
            // console.log(`${res.alive}`);
            // console.log(res);
            const timestamp = new Date();
            let failOutput = res.output.replace('\r','');
            failOutput = failOutput.replace('\n','');
            let statusString = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()} ping to ${res.inputHost} failed (${failOutput})`;
            statusMsg('error', statusString);
            win.webContents.executeJavaScript(`pingFailed()`);
        }       
        // log to file 
        await sleep(timeBetweenPings);
    }while(runPings);
}

ipcMain.handle('startPings', (args, data) => {
    // console.log(data);
    runPings = true;
    startPings(data);
});

ipcMain.handle('stopPings', (args, data) => {
    runPings = false;
});
