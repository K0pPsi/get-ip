const { app, BrowserWindow, ipcMain, clipboard } = require("electron");
const path = require("path");
const url = require("url");
const dns = require("dns");
const { dialog } = require("electron");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  ipcMain.on("setWk", (event, wk) => {
    dns.lookup(wk, (err, address) => {
      if (err) {
        dialog.showMessageBox({
          type: "error",
          title: "Adresse konnte nicht erreicht werden",
          message: `WK: ${wk} nicht erreichbar`,
          bnuttons: ["Ok"],
        });
        return;
      }

      dialog.showMessageBox({
        type: "none",
        title: "IP wurde zwischengespeichert",
        message: `IP-Adresse von ${wk}: ${address}`,
        bnuttons: ["Ok"],
      });

      //copy the ip in clipboard
      clipboard.writeText(address);
    });
  });
}

app.whenReady().then(createWindow);
