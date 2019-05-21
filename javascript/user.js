
var database = firebase.database()
let currentUserId = Math.random(0,999999999999)
let users = []

class User {
  constructor(address, image) {
    this.address = address
    this.image = image
  }
}

function createUser(){
  console.log('currentAddress', currentAddress)
  let address = document.getElementById('address').value
  let image = ""
  let user = new User(address,image)
  const dbRefObject = firebase.database().ref('/users').push(user)
  hideConfirmation()
  console.log('user is created')
}