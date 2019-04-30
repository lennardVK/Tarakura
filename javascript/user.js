
class User {
  constructor(address, image) {
    this.address = address;
    this.image = image;
  }
}

function createUser(){
  let address = document.getElementById('address').value;
  let image = "assets/images/cathedral.jpg"
  let user = new User(address,image)

  firebase.database().ref("User").set({
    address: address,
    image: image
  });
 

  console.log("new User",user)
  
}
