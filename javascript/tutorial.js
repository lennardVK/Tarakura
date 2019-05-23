let wrapper = document.getElementsByClassName('tutorial')
let elements = document.getElementsByClassName('tutorial_step')
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
  
}

function moveLeft(){
  index = index - 100
  console.log(index)
  if (index <= -100){
    index = 0;
  }else {
    console.log('moveLeft')
    arr.map(obj => {
      let currentLeft = parseInt(obj.style.left,10);
      let newLeft = currentLeft + 100
      obj.style.left = "" + newLeft + "vw"
    }) 
  }
}
