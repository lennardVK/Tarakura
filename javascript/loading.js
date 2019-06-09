let timer
let loaderElement = document.getElementById("loading_wrap")

function setLoader() {
  if(loaderElement.style.display == "none"){
    loaderElement.style.display = "flex"
  }
  timer = setTimeout(showPage, 14000)
}

function showPage() {
  loaderElement.style.display = "none"
}