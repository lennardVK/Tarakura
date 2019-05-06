
var database = firebase.database()
let users = []

class User {
  constructor(address, image) {
    this.address = address
    this.image = image
  }dd
}

function createUser(){
  let address = document.getElementById('address').value
  let image = "assets/images/cathedral.jpg"
  let user = new User(address,image)
  
  console.log('db',firebase.database().ref('/thegiveaway').child('thegiveaway'))
  const dbRefObject = firebase.database().ref('/thegiveaway').push(user)
  dbRefObject.on('value', snap => console.log(snap.val()))
}
