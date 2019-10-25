
const {app, Menu, MenuItem, BrowserWindow,globalShortcut} = require('electron')
const path = require('path')
const { dialog } = require('electron')


let mainWindow

const options = {
  type: 'info',
  buttons: ['Cancel', 'Ok, thanks'],
  defaultId: 2,
  title: 'How to save your work ?',
  message: 'You have to press CTRL+S or Cmd+S',
  detail: 'in editor to save your work :)',
  checkboxLabel: 'Remember my answer',
  checkboxChecked: true,
};

let template = [
{ label:'File',
  submenu:[
    {label:'Save File',accelerator: 'CmdorCtrl+S',click(){dialog.showMessageBox(null, options, (response, checkboxChecked) => {
      console.log(response);
      console.log(checkboxChecked);
    });}},
    {type: 'separator'},
    {role:'quit'}
  ]},
  {
     label: 'Edit',
     submenu: [
        {
           role: 'undo'
        },
        {
           role: 'redo'
        },
        {
           type: 'separator'
        },
        {
           role: 'cut'
        },
        {
           role: 'copy'
        },
        {
           role: 'paste'
        }
     ]
  },
  {
     label: 'View',
     submenu: [
        {
           role: 'toggledevtools'
        },
        {
           type: 'separator'
        },
        {
           role: 'resetzoom'
        },
        {
           role: 'zoomin'
        },
        {
           role: 'zoomout'
        },
        {
           type: 'separator'
        },
        {
           role: 'togglefullscreen'
        }
     ]
  },
  
  {
     role: 'window',
     submenu: [
        {
           role: 'minimize'
        },
        {
           role: 'close'
        }
     ]
  },
  
  {
     label:'More',
     submenu: [
        {
           label: 'Follow Dev on Instagram',
           click:async()=>{const{shell}=require('electron')
           await shell.openExternal('https://instagram.com/iamharsh.dev')
          }
        },
        {
          label: 'Checkout other Repositories on GitHub',
           click:async()=>{const{shell}=require('electron')
           await shell.openExternal('https://github.com/theuitown')
        }
      },
      {type:'separator'},
      {label:'Support Development',
    click:async()=>{const{shell}=require('electron')
  await shell.openExternal('https://paypal.me/iamdevharsh')}}
     ]
  }
]

const menu = Menu.buildFromTemplate(template)

function createWindow () {
  Menu.setApplicationMenu(menu)
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: __dirname + '../assets/general1.png'
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}    

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
