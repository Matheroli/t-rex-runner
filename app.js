const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
/* ELECTRON PACKAGER 

Windows : npx electron-packager . t-rex --platform win32 --arch x64 --out dist/ --asar --icon=t-rex/icon.png
Linux : electron-packager . t-rex --platform linux --arch x64 --out dist/ --asar --icon=t-rex/icon.png
MacOS : electron-packager . t-rex --platform darwin --arch x64 --out dist/ -icon=t-rex/icon.icns
*/

/* Electron Installer
Windows : electron-installer-windows --src dist/t-rex-win32-x64/ --config config.json
Debian/Ubuntu : electron-installer-debian --src dist/t-rex-linux-x64/ --dest dist/installers/ --arch amd64 --icon=t-rex/icon.png
Red hat : electron-installer-redhat --src dist/t-rex-linux-x64/ --dest dist/installers/ --arch x86_64 --icon=t-rex/icon.png
MacOS :
*/
let win;

function createWindow () {

  win = new BrowserWindow({
    width: 800,
    height: 300,
    icon: 't-rex/icon.png',
    title: 'T-rex runner',
    resizable: false,
    center: true,
    maximizable: false,
    webPreferences: {
      devTools: false
    }
  });
  win.loadFile('t-rex/index.html');

  win.on('closed', () => {
    win = null;
  })
}
app.on("ready", createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

const template = [
  {
      label: 'Fichier',
      submenu: [
          {
              label: 'Quitter',
              click: () => {
                app.quit()
              },
              accelerator: "Alt+Q"
          }
      ]
  },
  {
    label: 'Versions',
    submenu: [
        {
            label: 'Original',
            click: () => {
              win.loadFile("t-rex/index.html")
            },
            accelerator: "Alt+O"
        },
        {
            label: 'Kumamon',
            click: () => {
              win.loadFile("kumamon/index.html")
            },
            accelerator: "Alt+C"
        },
        {
            label: 'Kugou',
            click: () => {
              win.loadFile("hellokugou/index.html")
            },
            accelerator: "Alt+K"
        },
        {
          label: 'Ninja',
          click: () => {
            win.loadFile("ninja/index.html")
          },
          accelerator: "Alt+N"
        },
        {
          label: 'Corona',
          click: () => {
            win.loadFile("corona/index.html")
          },
          accelerator: "Alt+V"
        }
      ]
    },
    {
      label: 'Sources',
      submenu: [
          {
            label: 'Original',
            click: () => {
            electron.shell.openExternal("https://github.com/wayou/t-rex-runner")
            }
          },
          {
            label: 'Kumamon',
            click: () => {
            electron.shell.openExternal("https://github.com/vianroyal/t-rex-runner")
            }
          },
          {
            label: 'Kugou',
            click: () => {
              electron.shell.openExternal("https://github.com/xkuga/t-rex-runner")
            }
          },
          {
            label: 'Ninja',
            click: () => {
              electron.shell.openExternal("https://github.com/d-nery/t-rex-runner")
            }
          },
          {
            label: 'Corona',
            click: () => {
              electron.shell.openExternal("https://github.com/zouariste/corona-runner")
            }
          },
        ]
    }
    /*{
      label: "Mode",
      submenu: [
        {
          label: "Sombre",
          click: () => {
            window.darkMode.toggle()
          }
        }
      ]
    } */
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
