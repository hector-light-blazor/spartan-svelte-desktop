// Modules to control application life and create native browser window
const electron = require('electron')
const { app, BrowserWindow } = electron
const path = require('path')
const url  = require('url')

// enabled live reload for all the files inside your project
require('electron-reload')(`${__dirname}\\public`, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  hardResetMethod: 'exit'
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true
  }
  })


 

  
  // and load the index.html of the app.
  //mainWindow.loadFile(`${__dirname}\\public\\index.html`)

  mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, './public/index.html'),
			protocol: 'file:',
			slashes: true
		})
  );
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })


  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.