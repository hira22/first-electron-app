const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path')

const createWindow = () => {
  return new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
};

app.whenReady().then(() => {
  const win = createWindow();
  win.loadFile('index.html');

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
