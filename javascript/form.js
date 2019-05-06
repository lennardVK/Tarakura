let confirm = document.getElementById('confirm')
let form = document.getElementById('form')
let upload = document.getElementById('upload')

function showError(){
  let error = document.getElementById('error')
  error.style.display = "flex"
}

function fileValidation(){
  let fileIsValid = false
  let upload = document.getElementById('upload')
  let fileEnding = upload.value.split('.')[1]
  
  if (fileEnding === "jpg"){
    fileIsValid = true
    return true
  } else{
    showError()
    return false
  }
}

upload.addEventListener('change', function(e){
  let file = e.target.files[0]
  console.log(file)

  
  let storageRef = firebase.storage().ref('images/'+ file.name)
  let task = storageRef.put(file)

  

  console.log('event')
})

function hideForm(){
  if (fileValidation()){
    form.style.display = "none"
    showConfirmation()
    
  } else{
    showError()
  }
}

function showForm(){
  form.style.display = "flex"
  hideConfirmation()
  clearForm()
}

function showConfirmation(){
  confirm.style.display = "flex"
}

function hideConfirmation(){ 
  confirm.style.display = "none"
}

function confirmation(){
  confirmed = "true"
  createUser()
  hideConfirmation()
}

function clearForm(){
  document.getElementById('address').value = ""
  document.getElementById('upload').value = ""
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value
  geocoder.geocode({'address': address}, function(results, status) {
   
    if (status === 'OK'  ) {
      
      resultsMap.setCenter(results[0].geometry.location)
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
          
      })
      hideForm()
    } else {
      showError()
    }
  })
}