function CreateMap() {
  return new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 20
  });
};

function CreateMarker(mood = "eager", pos) {
  switch (mood) {
    case "eager":
      img = '../images/shibaMapIcon_smaller.png'
      break;
    case "annoyed":
      img = '../images/shibaMapIcon2_smaller.png'
      break;
  }

  return new google.maps.Marker({
    map: mapObj,
    position: pos,
    icon: img
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

      // infoWindow.setPosition(currentPos);
      // infoWindow.setContent('Woof woof');
      // infoWindow.open(mapObj);
      mapObj.setCenter(currentPos);

      // custom dog icon at geolocation
      var dogMarker = CreateMarker(mood = "eager", currentPos);

      ///////////////////////////////
      // START, STOP EVENT HANDLER //
      ///////////////////////////////
      var locationList = [];
      $(function () {
        // jQuery start walk
        $("#startWalk").on("click", function (event) {
          console.log("Start Walk!")

          let watchId = trackLocation({
            onSuccess: ({ coords: { latitude: lat, longitude: lng } }) => {
              dogMarker.setPosition({ lat, lng });
              mapObj.panTo({ lat, lng });

              // write coordinates to the dom
              $info.textContent = `Lat: ${lat.toFixed(5)} Lng: ${lng.toFixed(5)}`;
              $info.classList.remove('error');

              // console.log((lat, lng))
              locationList.push({ lat, lng });
              console.log(locationList)

            },
            onError: err => {
              console.log($info);
              $info.textContent = `Error: ${err.message || getPositionErrorMessage(err.code)}`;
              $info.classList.add('error');
            }
          }) // end
        });


        // jQuery end walk
        $("#endWalk").on("click", function (event) {
          console.log("End Walk!")
          locationList = []
          console.log(locationList)
          // dogMarker.mood = "annoyed"
        }); // end


      });
      console.log(locationList)
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
