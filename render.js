const btn = document.getElementById("go");
const value = document.getElementById("text");

btn.addEventListener("click", () => {
  const text = value.value;
  window.electronAPI.setWk(text);
});
