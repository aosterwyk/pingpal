const ping = require('ping');
const path = require('path');
const { sleep } = require('./utils/sleep');
const { logToFile } = require('./utils/logToFile');
const { ipcMain, app, BrowserWindow, shell } = require('electron');
const { autoUpdater } = require('electron-updater');

let win;
const timeBetweenPings = 1;
let runPings = false;

const logFilepath = app.getPath('desktop');

const createWindow = () => {
    win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    win.loadFile('./ui/index.html');
    win.setMenu(null);
};

app.whenReady().then(() => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

function statusMsg(msgType, msg) {
    win.webContents.send('statusUpdate', { msgType, msg });
    console.log(msg);
}

async function startPings(pingMe) {
    do {
        const res = await ping.promise.probe(pingMe);
        const timestamp = new Date();
        const label = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`;
        if (res.alive) {
            const statusString = `${label} ${res.numeric_host} ${res.time}ms`;
            statusMsg('info', statusString);
            win.webContents.send('pingResult', { alive: true, label, time: res.time });
        } else {
            const failOutput = res.output.replace(/(\r\n|\n|\r)/gm, '');
            const statusString = `${label} ping to ${res.inputHost} failed (${failOutput})`;
            statusMsg('error', statusString);
            win.webContents.send('pingResult', { alive: false, label, time: 0 });
        }
        await sleep(timeBetweenPings);
    } while (runPings);
}

ipcMain.handle('startPings', (_event, data) => {
    if (!runPings) {
        runPings = true;
        startPings(data);
    }
});

ipcMain.handle('stopPings', () => {
    if (runPings) {
        runPings = false;
    }
});

ipcMain.handle('writeToLog', (_event, data) => {
    logToFile(path.join(logFilepath, `pingpal-${data.host}.log`), `${data.msg}\n`);
});

ipcMain.handle('openLog', (_event, data) => {
    shell.openPath(path.join(logFilepath, `pingpal-${data}.log`));
});

ipcMain.handle('openExternal', (_event, url) => {
    const allowedUrls = ['https://github.com/aosterwyk/pingpal'];
    if (allowedUrls.includes(url)) {
        shell.openExternal(url);
    }
});

ipcMain.handle('getVersion', () => app.getVersion());

autoUpdater.on('update-available', () => {
    statusMsg('noLog', 'Update available. Starting download.');
});

autoUpdater.on('update-downloaded', () => {
    statusMsg('noLog', 'Update downloaded. Update will be installed next time pingpal is closed.');
});
