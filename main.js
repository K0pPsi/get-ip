const { app, BrowserWindow, ipcMain, clipboard, Menu } = require("electron");
const path = require("path");
const url = require("url");
const dns = require("dns");
const { dialog } = require("electron");

//create the window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //load index.html
  mainWindow.loadURL(
    url.format({
      //Constructing the path by joining the current directory (__dirname)
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  //create own menu
  const mainMenu = Menu.buildFromTemplate([
    {
      label: "Programm",
      submenu: [
        {
          label: "Beenden",
          role: "quit",
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(mainMenu);

  //When the rendering process sends the setWk event, the following functions are executed
  ipcMain.on("getIP", (event, userInput) => {
    //change the domain name into a IP addres
    dns.lookup(userInput, (err, address) => {
      if (err) {
        //show message box when domain name is not rechable
        dialog.showMessageBox({
          type: "error",
          title: "Adresse konnte nicht erreicht werden",
          message: `WK: ${userInput} nicht erreichbar`,
          bnuttons: ["Ok"],
        });

        return;
      }

      //show message box when domain name is reachable
      dialog.showMessageBox({
        type: "none",
        title: "IP wurde zwischengespeichert",
        message: `IP-Adresse von ${userInput}: ${address}`,
        bnuttons: ["Ok"],
      });

      //copy the ip in clipboard
      clipboard.writeText(address);
    });
  });
}

app.whenReady().then(createWindow);
