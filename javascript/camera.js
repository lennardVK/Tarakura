let preview = document.getElementById('preview')
let imageElement = document.getElementById('image_element')
let currentImgUrl = ""



  
function getSnapshot(){
  
  //let canvas = document.getElementById('mycanvas')
  
  //console.log(document.querySelector('a-scene').components.screenshot.capture('perspective'))
  
  let video = document.querySelector('a-scene').components.screenshot.getCanvas('newCanvas')
  let dataURL = video.toDataURL('image/jpg')
  currentImgUrl = dataURL
  console.log('url',currentImgUrl)
  /*
  let element = document.getElementById('screen')
  
  video.getContext('2d').canvas.drawImage(100, 100, 500)
  
  let dataURL = canvas.toDataURL('image/jpg')
  imageElement.src = dataURL  
  currentImgUrl = dataURL */
  showPreview()
}

function submit(){
  
  let byteString = atob(currentImgUrl.split(',')[1]);
  
  let mimeString = currentImgUrl.split(',')[0].split(':')[1].split(';')[0]

  let ab = new ArrayBuffer(byteString.length);

  let ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  let blob = new Blob([ab], {type: mimeString});

  let storageRef = firebase.storage().ref('images/'+ blob)
  let task = storageRef.put(blob)
  //disableBtn(document.getElementById('snapshot'))
  
  hidePreview()
  
  console.log('upload')
}

function showPreview(){
  preview.style.height = "60%"
  imageElement.src = currentImgUrl
}

function hidePreview(){
  preview.style.height = "0%"
}
/*
function disableBtn(btnElement){
  btnElement.onclick = null
  btnElement.style.backgroundColor = 'grey'
  let messageElement = document.getElementById('message') 
  messageElement.style.width = '100%'
}
*/
window.onload = function(){
  document.getElementById('arjsDebugUIContainer').style.display = 'none'
}


      