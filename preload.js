const { ipcRenderer, contextBridge, shell } = require('electron');
const pingpalVersion = require('./package.json').version;

contextBridge.exposeInMainWorld('pingpal', {
  startPings: (pingMe) => {
    ipcRenderer.invoke('startPings', pingMe)
  },
  stopPings: () => {
    ipcRenderer.invoke('stopPings')
  },
  writeToLog: (data) => {
    ipcRenderer.invoke('writeToLog', data);
  },
  externalPage: (page) => {
    if(page == 'github') {
      shell.openExternal('https://github.com/aosterwyk/pingpal')
    }
  }
});

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('versionNumber').innerText = pingpalVersion;
});
