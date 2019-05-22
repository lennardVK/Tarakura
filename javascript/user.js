
var database = firebase.database()
let currentId = Math.floor(Math.random() * Math.floor(99999999999))

let users = []

class User {
  constructor(address, userId) {
    this.address = address
    this.userId = userId
  }
}

function createUser(){
  console.log('currentId', currentId)
  let address = document.getElementById('address').value
  let userId = currentId
  let user = new User(address,userId)

  let currentUser = [user]
  currentUser.push(JSON.parse(localStorage.getItem('currentId')));
  localStorage.setItem('session', JSON.stringify(currentUser));

  const dbRefObject = firebase.database().ref('/users').push(user)
  hideConfirmation()
  console.log('user is created')
}