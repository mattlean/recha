import path from 'path'
import { app, BrowserWindow } from 'electron'

if (process.env.NODE_ENV === 'development') {
  var { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer') // eslint-disable-line @typescript-eslint/no-var-requires, global-require, import/no-extraneous-dependencies, no-var, vars-on-top
}

let win

function createWindow(): void {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false
  })

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:8080')
  } else {
    win.loadFile(path.join(__dirname, 'index.html'))
  }
}

app.on('ready', () => {
  if (process.env.NODE_ENV === 'development') {
    require('devtron').install() // eslint-disable-line global-require, import/no-extraneous-dependencies
    // @ts-ignore
    installExtension(REACT_DEVELOPER_TOOLS) // eslint-disable-line block-scoped-var, no-undef
    // @ts-ignore
    installExtension(REDUX_DEVTOOLS) // eslint-disable-line block-scoped-var, no-undef
  }

  createWindow()
  win.on('ready-to-show', () => win.show())
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (win === null) createWindow()
})
