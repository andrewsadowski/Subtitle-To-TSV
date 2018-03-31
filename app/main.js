const { app, BrowserWindow } = require('electron');
const fs = require('fs');

let mainWindow = null;

const getFileFromUserSelection = (exports.getFileFromUserSelection = mainWindow => {
  const files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'SubRip Files', extensions: 'srt' }]
  });
  if (!files) return;
  return files[0];
});

app.on('ready', () => {
  const mainWindow = new BrowserWindow({ show: false });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  require('devtron').install();
});

const openFile = (exports.openFile = (mainWindow, filePath) => {
  const file = filePath || getFileFromUserSelection(mainWindow);
  const content = fs.readFileSync(file).toString();
  mainWindow.webContents.send('file-opened', file, content);
  mainWindow.setTitle(`${file} - SubRip2CSV`);
});
