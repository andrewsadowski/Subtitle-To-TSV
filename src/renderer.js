const { remote, ipcRenderer } = require('electron');
const mainProcess = remote.require('./main');

// const openFileButton = document.querySelector('#open-file');

// let filePath = null;
// let originalContent = '';

// openFileButton.addEventListener('click', () => {
//   mainProcess.openFile();
// });
