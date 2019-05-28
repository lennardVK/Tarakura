
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.282416, lng: 10.025453},
    disableDefaultUI: true,
    zoom: 2.5,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#F0B67F'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#FE5F55'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#FFFFFF'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#FE5F55'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#FE5F55'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#FE5F55'}]
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
        stylers: [{color: '#FE5F55'}]
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
        stylers: [{color: '#C7EFCF'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#C7EFCF'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#FFFFFF'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#FE5F55'}]
      }
    ]
  })
  map.setOptions({draggable: true, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true})
  
  function confirm(){
    console.log('update')
    geocodeAddress(geocoder, map)
  }
    
  
  function initMainPosition(position){
    
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      icon: 'assets/images/initial_position.svg'
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
              url:  'assets/images/marker_animated.svg',
              scaledSize: new google.maps.Size(50, 50), // scaled size
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
              icon
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
              strokeColor: '#FE5F55',
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
  



