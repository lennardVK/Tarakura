

let timer

function setLoader() {
  timer = setTimeout(showPage, 6000)
}

function showPage() {
  document.getElementById("loading_wrap").style.display = "none"
}