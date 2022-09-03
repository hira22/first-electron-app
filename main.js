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
  // win.loadFile('index.html');
  const view = new BrowserView()
  win.setBrowserView(view)
  const windowSize = win.getSize();
  view.setBounds({ x: 0, y: 0, width: windowSize[0], height: windowSize[1] })
  view.setAutoResize({ width: true, height: true })
  view.webContents.loadURL('https://electronjs.org')

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
