var ping = require('ping');
const path = require('path');
const { sleep } = require('./utils/sleep');
const { logToFile } = require('./utils/logToFile');
const { ipcMain, app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
var win;
var timeBetweenPings = 1;
var runPings = false;

const logFilepath = `${app.getPath('desktop')}`;

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
    win.webContents.executeJavaScript(`updateStatus('${msgType}', '${msg}')`);
    console.log(msg);
}

async function startPings(pingMe) {
    do {
        let res = await ping.promise.probe(pingMe);      
        if(res.alive) {
            const timestamp = new Date();
            let statusString = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()} ${res.numeric_host} ${res.time}ms`;
            statusMsg('info', statusString);
            win.webContents.executeJavaScript(`addPings(true,${res.time})`);
        }
        else {
            const timestamp = new Date();
            let failOutput = res.output.replace(/(\r\n|\n|\r)/gm, "");
            console.log(failOutput);
            let statusString = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()} ping to ${res.inputHost} failed (${failOutput})`;
            statusMsg('error', statusString);
            win.webContents.executeJavaScript(`pingFailed()`);
        }       
        await sleep(timeBetweenPings);
    }while(runPings);
}

ipcMain.handle('startPings', (args, data) => {
    runPings = true;
    startPings(data);
});

ipcMain.handle('stopPings', () => {
    runPings = false;
});

ipcMain.handle('writeToLog', (args, data) => {   
    logToFile(`${logFilepath}\\pingpal-${data.host}.log`, `${data.msg}\n`);
});

app.on('ready', () => {
    autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on('update-available', () => {
    statusMsg('noLog', `Update available. Starting download.`);
});

autoUpdater.on('update-downloaded', () => {
    statusMsg('noLog', `Update downloaded. Update will be installed next time pingpal is closed.`);
});
