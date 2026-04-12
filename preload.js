const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('pingpal', {
    startPings: (pingMe) => ipcRenderer.invoke('startPings', pingMe),
    stopPings: () => ipcRenderer.invoke('stopPings'),
    writeToLog: (data) => ipcRenderer.invoke('writeToLog', data),
    openLog: (data) => ipcRenderer.invoke('openLog', data),
    externalPage: (page) => {
        if (page === 'github') {
            ipcRenderer.invoke('openExternal', 'https://github.com/aosterwyk/pingpal');
        }
    },
    getVersion: () => ipcRenderer.invoke('getVersion'),
    onStatusUpdate: (callback) => ipcRenderer.on('statusUpdate', (_event, data) => callback(data)),
    onPingResult: (callback) => ipcRenderer.on('pingResult', (_event, data) => callback(data)),
});

window.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('versionNumber').innerText = await ipcRenderer.invoke('getVersion');
});
