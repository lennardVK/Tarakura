
var database = firebase.database()
let users = []



class User {
  constructor(address, image) {
    this.address = address
    this.image = image
  }
}

function createUser(){
  let address = document.getElementById('address').value
  let image = "assets/images/cathedral.jpg"
  let user = new User(address,image)
  
  const dbRefObject = firebase.database().ref('/users').push(user)
  hideConfirmation()
}


