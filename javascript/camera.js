let preview = document.getElementById('preview')
let imageElement = document.getElementById('image_element')
let currentImgUrl = ""

let currentId = localStorage.getItem('session')
currentId = JSON.parse(currentId)[0].userId;
currentId.toString()

//let currentId = Math.floor(Math.random() * Math.floor(99999999999))
console.log('currentId',currentId)


  
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

function delay (URL) {
  setTimeout( function() { window.location = URL }, 2000 );
}

function submit(URL){
  
  let byteString = atob(currentImgUrl.split(',')[1])
  
  let mimeString = currentImgUrl.split(',')[0].split(':')[1].split(';')[0]

  let ab = new ArrayBuffer(byteString.length)

  let ia = new Uint8Array(ab)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  let blob = new Blob([ab], {type: mimeString})
  console.log('currentId: ',currentId)
  let storageRef = firebase.storage().ref(""+currentId+"")
  


  
  storageRef.put(blob).then(function(snapshot) {
    console.log('Uploaded a blob or file!')
  })
  //disableBtn(document.getElementById('snapshot'))
  
  hidePreview()
  delay (URL)
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


      