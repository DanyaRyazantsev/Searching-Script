const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

ipcMain.on('find-numbers', (event, text) => {
  const numbers = text.match(/\d+(\.\d+)?/g);
  if (numbers && numbers.length > 0) {
    const result = numbers.map((number, index) => `${index + 1}. ${number}`).join('\n');
    event.reply('found-numbers', result);
  } else {
    event.reply('found-numbers', 'В тексте не найдено чисел.');
  }
});