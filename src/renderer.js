const { remote, ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;
const mainProcess = remote.require('./main');
const currentWindow = remote.getCurrentWindow();
const fs = require('fs');

const { subParser, generateTSV } = require('./utils/sub-parser');

const chooseFile = document.querySelector('#choose-file');
const saveTo = document.querySelector('#save-file');
const dragContainer = document.querySelector('#drag-container');

let filePathForSub = null;
let dirPathForOutput = null;

chooseFile.addEventListener('click', e => {
  const files = dialog.showOpenDialog({
    properties: ['openFile']
  });
  filePathForSub = files[0];
  console.log(filePathForSub, files[0]);
  if (filePathForSub && dirPathForOutput) {
    console.log(dirPathForOutput);
    generateTSV(subParser(filePathForSub), dirPathForOutput);
    // let content = subParser(filePathForSub);
    // generateSub2TSV(content, dirPathForOutput);
  } else if (!filePathForSub || !dirPathForOutput) {
    alert('Please select a directory or subtitle');
  }
});

saveTo.addEventListener('click', e => {
  const directoryOfChoice = dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  dirPathForOutput = directoryOfChoice[0];
  console.log(`dirPathForOutput:${dirPathForOutput}`);

  // if (filePathForSub && dirPathForOutput) {
  //   generateSub2TSV(subParser(filePathForSub), dirPathForOutput);
  //   console.log('created');
  // } else if (!filePathForSub || !dirPathForOutput) {
  //   alert('Please select a directory or subtitle');
  // }
});

ipcRenderer.on('file-opened', (event, file, content) => {
  filePath = file;
  originalContent = content;

  console.log('IPCRENDERER FILE-OPENED', filePath, originalContent);
});
