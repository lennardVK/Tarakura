let confirm = document.getElementById('confirm')
let form = document.getElementById('form')
let currentAddress
let background = document.getElementById('background')

function getCookie(cookie){
  console.log(cookie)
  if(cookie){
    window.location.href = "map.html"
  } else{
    console.log('no cookie found')
  }
}



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
  currentAddress =  document.getElementById('address').value
  console.log('currentId')
  createUser()
  hideConfirmation()
  getCookie(document.cookie)
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