

function initMap() {

  
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 52.282416, lng: 8.025453},
    disableDefaultUI: true,
    zoom: 3,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
  })
  
  function confirm(){
    console.log('update')
    geocodeAddress(geocoder, map)
  }
    
  
  function initMainPosition(position){
    
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      icon: 'assets/images/school_copy.svg'
    })
  }
  

  function updateMap(geocoder, resultsMap){
     
    let db = firebase.database().ref('/users')
    db.on('value', function(snapshot) {
      
      let usersObj = snapshot.val()
      let usersArr = Object.values(usersObj)
  
      usersArr.map(obj => {
        let address = obj.address
        console.log(address)
        
        geocoder.geocode({address}, function(results, status) {
         
          if (status === 'OK'  ) {   
            let marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
              icon: 'assets/images/school_copy.svg'
            })

            let markerPos = results[0].geometry.location
            const initalPosition = {lat: 52.282416, lng: 8.025453}
            let newPath = [markerPos, initalPosition]
            
            console.log('newPath',newPath)
            let flightPath = new google.maps.Polyline({
              path: newPath,
              geodesic: true,
              strokeColor: '#3A506B',
              strokeOpacity: 1,
              strokeWeight: 2
            })
            
            flightPath.setMap(map);
          }          
        }) 
      })
    })
  }


  var geocoder = new google.maps.Geocoder()
  const initalPosition = {lat: 52.282416, lng: 8.025453}

  updateMap(geocoder, map)
  initMainPosition(initalPosition)


  

  







}
  



