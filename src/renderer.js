const { remote, ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;
const mainProcess = remote.require('./main');
const currentWindow = remote.getCurrentWindow();
const fs = require('fs');

const { subParser, generateTSV } = require('./utils/sub-parser');

const chooseFile = document.querySelector('#choose-file');
const saveTo = document.querySelector('#save-file');
const execute = document.querySelector('#execute');
const dragContainer = document.querySelector('#drag-container');

let filePathForSub = null;
let dirPathForOutput = null;
let subtitleFileName = null;
let defaultDirPath = null;

/**
 *
 * @param {string} filePath - Accepts a filepath of the subtitle
 * @return {string} defaultDirPath - Returns a default directory for saving
 *
 */

const getDefaultDirPath = filePath => {
  let parsedDirPath = filePath.replace(/[^\/]*$/, '');
  defaultDirPath = parsedDirPath;
  return parsedDirPath;
};

/**
 * ChooseFile button event listener
 *  -updates filePathForSub variable with path info
 *  -onClick adds 'completed' class to DOM element
 */

chooseFile.addEventListener('click', e => {
  const files = dialog.showOpenDialog({
    properties: ['openFile']
  });
  filePathForSub = files[0];
  subtitleFileName = filePathForSub.replace(/^.*[\\\/]/, '');
  subtitleFileName = subtitleFileName.replace(/(.srt)/, '');

  console.log(files);
  chooseFile.classList.add('completed');
});

/**
 * SaveTo button event listener
 *  -updated dirPathForOutput variable with output path
 *  -onClick adds 'completed' class to DOM element
 */

saveTo.addEventListener('click', e => {
  const directoryOfChoice = dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  dirPathForOutput = directoryOfChoice[0];
  console.log(`dirPathForOutput:${dirPathForOutput}`);
  saveTo.classList.add('completed');
});

execute.addEventListener('click', e => {
  if ((filePathForSub && dirPathForOutput) || defaultDirPath) {
    generateTSV(
      subParser(filePathForSub),
      dirPathForOutput || defaultDirPath,
      subtitleFileName
    );
  }
  if (!filePathForSub) {
    alert('Please provide a subtitle.');
  }
  if (!dirPathForOutput && !defaultDirPath) {
    alert('Please provide a directory to output to.');
  }
  saveTo.classList.remove('completed');
  chooseFile.classList.remove('completed');
});

/**
 * DragOver Logic
 *  -Prevents Electron from showing the .srt when dragging in
 *  -Saves and updates filePathForSub variable on drag
 * TODO: Make drag take both directory and single subtitle
 */

document.addEventListener(
  'dragover',
  e => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  },
  false
);

document.addEventListener('ondragstart', e => {
  e.preventDefault();
  e.stopPropagation();
  return false;
});

document.addEventListener('ondragleave', e => {
  e.preventDefault();
  e.stopPropagation();
  return false;
});

document.addEventListener('ondragend', e => {
  e.preventDefault();
  e.stopPropagation();
  return false;
});

document.addEventListener(
  'drop',
  e => {
    e.preventDefault();
    filePathForSub = e.dataTransfer.files[0].path;
    getDefaultDirPath(filePathForSub);
    subtitleFileName = filePathForSub.replace(/^.*[\\\/]/, '');
    subtitleFileName = subtitleFileName.replace(/(.srt)/, '');
    console.log(
      `FilePathForSub${filePathForSub} \n subtitleFileName:${subtitleFileName}\ndefaultDirPath: ${defaultDirPath}`
    );
    return false;
  },
  false
);
ipcRenderer.on('file-opened', (event, file, content) => {
  filePath = file;
  originalContent = content;

  console.log('IPCRENDERER FILE-OPENED', filePath, originalContent);
});
