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
/*
function scale(canvas){
  canvas.width = canvas.width / 2
  
  canvas.height = canvas.height / 2
  
  return canvas
}*/

function resizeCanvas(origCanvas, width, height) {
	let resizedCanvas = document.createElement("canvas");
	let resizedContext = resizedCanvas.getContext("2d");

	resizedCanvas.height = width;
	resizedCanvas.width = height;

  resizedContext.drawImage(origCanvas, 0, 0, width, height);
  console.log('resizedCanvas',resizedCanvas )
	return resizedCanvas.toDataURL();
}

function captureVideoFrame(video, format, width, height) {
  if (typeof video === 'string') {
    video = document.querySelector(video);
  }

  format = format || 'jpeg';

  if (!video || (format !== 'png' && format !== 'jpeg')) {
    return false;
  }

  var canvas = document.createElement("CANVAS");

  canvas.width = width || video.videoWidth;
  canvas.height = height || video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  var dataUri = canvas.toDataURL('image/' + format);
  var data = dataUri.split(',')[1];
  var mimeType = dataUri.split(';')[0].slice(5)

  var bytes = window.atob(data);
  var buf = new ArrayBuffer(bytes.length);
  var arr = new Uint8Array(buf);

  for (var i = 0; i < bytes.length; i++) {
      arr[i] = bytes.charCodeAt(i);
  }

  var blob = new Blob([ arr ], { type: mimeType });
  return { blob: blob, dataUri: dataUri, format: format, width: canvas.width, height: canvas.height };
};

	
function getSnapshot(){

  let video = document.querySelector('a-scene').components.screenshot.getCanvas('perspective')
  let frame = captureVideoFrame("video", "png");
  video = resizeCanvas(video, frame.width, frame.height)
  

  //let dataURL = video.toDataURL('image/jpg')
  frame = frame.dataUri
  mergeImages([frame, video]).then(b64 => {
    console.log('new',b64)
    let link = document.getElementById("download");
		link.setAttribute("download", "AR.png");
    link.setAttribute("href", b64);
    imageElement.setAttribute("src", b64);
    currentImgUrl = b64
  });
  
  

  
  /*


  context = video.getContext('2d');
  
  let width = 500
  let height = 200


  context.drawImage(video, 0, 0, width, height);
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
  preview.style.height = "70%"
  //imageElement.src = currentImgUrl
}

function hidePreview(){
  preview.style.height = "0%"
}
      