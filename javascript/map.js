

function initMap() {

  
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.282416, lng: 10.025453},
    disableDefaultUI: true,
    zoom: 2.5,
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
  map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true})
  
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
  
  var storage = firebase.storage()

  function updateMap(geocoder, resultsMap){
     
    let db = firebase.database().ref('/users')
    db.on('value', function(snapshot) {
      
      let usersObj = snapshot.val()
      let usersArr = Object.values(usersObj)
      var storageRef = storage.ref()
      var rootRef = storageRef
      console.log('rootRef', rootRef.bucket)
      
      usersArr.map(obj => {
      let index = 0
      index = index ++  
      let arrayOfIds = [obj.userId]
        console.log('arrayOfIds', arrayOfIds[index])
      })

      usersArr.map(obj => {
        let address = obj.address  
        let index = 0
        index = index ++  
        let arrayOfIds = [obj.userId]
        console.log(arrayOfIds[index])
        var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/thegiveaway.appspot.com/o/'+ arrayOfIds[index] +'?alt=media&token=08eabc32-5dc5-4aa5-b827-78b6bb7f8a1f')
        

        geocoder.geocode({address}, function(results, status) {
          
          if (status === 'OK'  ) { 
            
            var icon = {
              url:  'assets/images/school_copy.svg',
              scaledSize: new google.maps.Size(80, 50), // scaled size
              origin: new google.maps.Point(0,0), // origin
              anchor: new google.maps.Point(0, 0) // anchor
            }
            let y = 'https://firebasestorage.googleapis.com/v0/b/thegiveaway.appspot.com/o/'+ arrayOfIds[index] +'?alt=media&token=08eabc32-5dc5-4aa5-b827-78b6bb7f8a1f'
            let x = "" + y + ""
            let currentWindow = "<div style='float:left; background-color:#FE5F55;'><img style='width: 300px; height: 200px; ' src=" + x + "></div>"
            console.log(currentWindow)
            let infowindow =  new google.maps.InfoWindow({  
              content: currentWindow,
              position: results[0].geometry.location
            });

            let marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
              icon: 'assets/images/school_copy.svg'
            })

            let active = false
            google.maps.event.addListener(marker, 'click', function() {
              if(active == true){
                active = false
                infowindow.close()
              }else if(active == false){
                active = true
                infowindow.open(map, this)
              } 
            });
            
            
            
            
            
            
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
            
            flightPath.setMap(map)
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
  



