

function showError(){
  let error = document.getElementById("error");
  error.style.display = "flex"
}

function hideForm(){
  let form = document.getElementById("form");
  form.style.display = "none"
}

function showConfirmation(){
  let confirm = document.getElementById("confirm")
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
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