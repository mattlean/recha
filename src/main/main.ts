import path from 'path'
import { app, BrowserWindow, Menu } from 'electron' // eslint-disable-line import/no-extraneous-dependencies

if (process.env.NODE_ENV === 'development') {
  var { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer') // eslint-disable-line @typescript-eslint/no-var-requires, global-require, import/no-extraneous-dependencies, no-var, vars-on-top
}

let win
const isWindows = process.platform === 'win32'

const createMenu = (): void => {
  const menu = Menu.buildFromTemplate([
    {
      label: isWindows ? 'File' : app.getName(),
      submenu: [
        {
          label: isWindows ? 'Exit' : `Quit: ${app.getName()}`,
          accelerator: isWindows ? 'Alt+F4' : 'CmdOrCtrl+Q',
          click: () => {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [{ role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectall' }]
    }
  ])

  Menu.setApplicationMenu(menu)
}

const createWindow = (): void => {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false
  })

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:8080')
  } else {
    win.loadFile(path.join(__dirname, 'index.html'))
  }

  win.on('closed', () => {
    win = null
  })

  win.on('ready-to-show', () => win.show())
  createMenu()
}

app.on('ready', () => {
  createWindow()

  if (process.env.NODE_ENV === 'development') {
    require('devtron').install() // eslint-disable-line global-require, import/no-extraneous-dependencies
    // @ts-ignore
    installExtension(REACT_DEVELOPER_TOOLS) // eslint-disable-line block-scoped-var, no-undef
    // @ts-ignore
    installExtension(REDUX_DEVTOOLS) // eslint-disable-line block-scoped-var, no-undef
    win.webContents.openDevTools()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (win === null) createWindow()
})
