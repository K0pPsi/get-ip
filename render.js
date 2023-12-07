const btn = document.getElementById("go");

btn.addEventListener("click", () => {
  const userInput = document.getElementById("userInput").value;

  //we call the function setWk in the preload.js and send the userInput to the main process
  window.electronAPI.getIP(userInput);
});
