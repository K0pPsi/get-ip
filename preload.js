//Using contextBridge you can communicate between the main process and the render process
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  //send the userInput to the main process
  //the function setWK is called in render.js
  getIP: (userInput) => ipcRenderer.send("getIP", userInput),
});
