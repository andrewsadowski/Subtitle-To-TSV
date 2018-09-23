const { remote, ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;
const mainProcess = remote.require('./main');
const currentWindow = remote.getCurrentWindow();
const fs = require('fs');

const chooseFile = document.querySelector('#choose-file');
const saveTo = document.querySelector('#save-file');
const dragContainer = document.querySelector('#drag-container');

let filePath = null;

chooseFile.addEventListener('click', e => {
  // mainProcess.openFile(currentWindow);
  console.log('object', e);
});

saveTo.addEventListener('click', e => {
  console.log(e.returnValue, e.path);
  dialog.showOpenDialog({
    properties: ['openDirectory']
  });
});
