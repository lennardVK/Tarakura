let confirm = document.getElementById("confirm");
let form = document.getElementById("form");

function showError(){
  let error = document.getElementById("error");
  error.style.display = "flex"
}

function hideForm(){
  form.style.display = "none"
  showConfirmation();
}

function showForm(){
  form.style.display = "flex"
  hideConfirmation();
}

function showConfirmation(){
  confirm.style.display = "flex";
}

function hideConfirmation(){ 
  confirm.style.display = "none";
}

function confirmation(){
  confirmed = "true";
  hideConfirmation();
}




function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
   
    if (status === 'OK'  ) {
      
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
        
      });
      hideForm();
    } else {
      showError();
    }
  });
}