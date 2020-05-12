function CreateMap() {
  return new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7749, lng: 122.4194 },
    zoom: 20
  });
};

function CreateMarker(pos) {
  return new google.maps.Marker({
    map: mapObj,
    position: pos,
    icon: '../images/shibaNormal.png'
  })
};

const trackLocation = ({ onSuccess, onError = () => { } }) => {
  if ('geolocation' in navigator === false) {
    return onError(new Error('Geolocation is not supported by your browser.'));
  }

  return navigator.geolocation.watchPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });
};

/**
 * Get position error message from the given error code.
 * @param {number} code
 * @return {String}
 */
const getPositionErrorMessage = code => {
  switch (code) {
    case 1:
      return 'Permission denied.';
    case 2:
      return 'Position unavailable.';
    case 3:
      return 'Timeout reached.';
  }
}

///////////////////////////////////////////////////
// PROGRAM ENTRY POINT                           //
// invoked by src as callback in handlebars file //
///////////////////////////////////////////////////
var mapObj, infoWindow;
function initMap() {
  mapObj = CreateMap();
  infoWindow = new google.maps.InfoWindow;
  var $info = document.getElementById('info');

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var currentPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      mapObj.setCenter(currentPos);

      // custom dog icon at geolocation
      var dogMarker = CreateMarker(currentPos);

      ///////////////////////////////
      // START, STOP EVENT HANDLER //
      ///////////////////////////////
      var walkingPathCoordinates = [];
      $(function () {
        // 
        // jQuery start walk
        // 
        $("#startWalk").on("click", function (event) {
          console.log("Start Walk!")

          // change shiba marker back to happy (redundent on first run)
          // setInterval(function () { dogMarker.setIcon('../images/shibaHappy.png') }, 1500);
          // switch shiba face back to normal
          dogMarker.setIcon('../images/shibaHappy.png')

          let watchId = trackLocation({
            onSuccess: ({ coords: { latitude: lat, longitude: lng } }) => {
              dogMarker.setPosition({ lat, lng });
              mapObj.panTo({ lat, lng });

              // write coordinates to the dom
              $info.textContent = `Lat: ${lat.toFixed(5)} Lng: ${lng.toFixed(5)}`;
              $info.classList.remove('error');

              walkingPathCoordinates.push({ lat, lng });
              console.log(walkingPathCoordinates)

              // walking path polyline
              var walkPath = new google.maps.Polyline({
                path: walkingPathCoordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
              });
              walkPath.setMap(mapObj);

              console.log(walkPath)
            },
            onError: err => {
              console.log($info);
              $info.textContent = `Error: ${err.message || getPositionErrorMessage(err.code)}`;
              $info.classList.add('error');
            }
          }) // end
        });
        // 
        // jQuery end walk
        // 
        $("#endWalk").on("click", function (event) {
          console.log("End Walk!");

          // switch shiba face back to normal
          dogMarker.setIcon('../images/shibaAnnoyed.png')

          walkingPathCoordinates = []

          console.log(walkingPathCoordinates)
        }); // end


      });
      console.log(walkingPathCoordinates)

    },
      function () {
        handleLocationError(true, infoWindow, mapObj.getCenter());
      });
  }

  else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, mapObj.getCenter());
  }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(mapObj);
}
