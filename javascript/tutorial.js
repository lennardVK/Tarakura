let wrapper = document.getElementsByClassName('tutorial')
let elements = document.getElementsByClassName('tutorial_step')
let rightCntrl = document.getElementById('right')
let leftCntrl = document.getElementById('left')
var arr = [].slice.call(elements);
let width = elements[0].offsetWidth
let index = 0

function moveRight(){
  index = index + 100
  console.log(index)
  if (index >= 400){
    index = 300;
  }else {
    console.log('moveRight')
    arr.map(obj => {
      let currentLeft = parseInt(obj.style.left,10);
      let newLeft = currentLeft - 100
      obj.style.left = "" + newLeft + "vw"
    }) 
  }
  checkIndex()
}

function moveLeft(){
  
  index = index - 100
  console.log(index)
  if (index <= -100){
    index = 0;
  }else {
    arr.map(obj => {
      let currentLeft = parseInt(obj.style.left,10);
      let newLeft = currentLeft + 100
      obj.style.left = "" + newLeft + "vw"
    }) 
  }
  checkIndex()
}

function checkIndex(){
  if(index == 0){
    
    leftCntrl.style.display = "none"
  } else if( index == 300) {
    console.log('checked')
    rightCntrl.style.display = "none"
  } else{
    leftCntrl.style.display = "block"
    rightCntrl.style.display = "block"
  }
}
checkIndex()
