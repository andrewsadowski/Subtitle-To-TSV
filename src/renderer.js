const { remote, ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;
const mainProcess = remote.require('./main');
const currentWindow = remote.getCurrentWindow();
const fs = require('fs');

const { subParser } = require('./utils/sub-parser');

const chooseFile = document.querySelector('#choose-file');
const saveTo = document.querySelector('#save-file');
const dragContainer = document.querySelector('#drag-container');

let filePath = null;

chooseFile.addEventListener('click', e => {
  const files = dialog.showOpenDialog({
    properties: ['openFile']
  });

  console.log(files[0]);
});

saveTo.addEventListener('click', e => {
  const directoryOfChoice = dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  console.log(directoryOfChoice);
});

ipcRenderer.on('file-opened', (event, file, content) => {
  filePath = file;
  originalContent = content;

  console.log('IPCRENDERER FILE-OPENED', filePath, originalContent);
});
