const { app, BrowserWindow } = require('electron');
const fs = require('fs');

let mainWindow = null;

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
