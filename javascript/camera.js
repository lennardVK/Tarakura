let preview = document.getElementById('preview')
let imageElement = document.getElementById('image_element')
let currentImgUrl = ""
let frameBg = document.getElementById('bg')
let uploaded = false

let currentId = localStorage.getItem('session')
currentId = JSON.parse(currentId)[0].userId;
currentId.toString()

let arrayOfBgs = ["https://images.unsplash.com/photo-1523295475921-ca5ea3d129a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2727&q=80",
"https://images.unsplash.com/photo-1523295475921-ca5ea3d129a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2727&q=80",
"https://images.unsplash.com/photo-1523295616404-2b6c098f26dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2300&q=80"
]

let index = 0
index = Math.floor(Math.random() * Math.floor(arrayOfBgs.length))

let currentImg = arrayOfBgs[index]
frameBg.src = currentImg 


function getSnapshot(){
  
  let canvas = document.getElementById('mycanvas')
  
  let video = document.querySelector('a-scene').components.screenshot.getCanvas('newCanvas')
  let dataURL = video.toDataURL('image/jpg')
  context = canvas.getContext('2d');
  
  let width = canvas.width
  let height = canvas.height

  context.drawImage(video, 0, 0, width, height);
  currentImgUrl = dataURL
  console.log(currentImgUrl)
  // Turn the canvas image into a dataURL that can be used as a src for our photo.
  
  
  /*
  let element = document.getElementById('screen')
  
  video.getContext('2d').canvas.drawImage(100, 100, 500)
  
  let dataURL = canvas.toDataURL('image/jpg')
  imageElement.src = dataURL  
  currentImgUrl = dataURL */
  showPreview()
  
}


function submit(URL){
  setLoader()
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
  console.log(blob)
  storageRef.put(blob).then(function(snapshot) {
    console.log('Uploaded a blob or file!')
    uploaded = true
    if(uploaded){
      window.location = URL 
    }
  })
  
  hidePreview()
}

function showPreview(){
  preview.style.height = "60%"
  imageElement.src = currentImgUrl
}

function hidePreview(){
  preview.style.height = "0%"
}
      