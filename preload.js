const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  setWk: (wk) => ipcRenderer.send("setWk", wk),
});
