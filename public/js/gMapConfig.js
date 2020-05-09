/**
 * Create google maps Map instance.
 * @param {number} lat
 * @param {number} lng
 * @return {Object}
 */
const createMap = ({ lat, lng }) => {
  return new google.maps.Map(document.getElementById('map'), {
    center: { lat, lng },
    zoom: 20
  });
};

/**
 * Create google maps Marker instance.
 * @param {Object} mapObj
 * @param {Object} position
 * @return {Object}
 */
// const createMarker = ({ mapObj, position }) => {
//   return new google.maps.Marker({ mapObj, position });
// };

// custom dog icon at geolocation
const createMarker = function (mapObj, initialPosition) {
  return new google.maps.Marker({
    map: mapObj,
    position: initialPosition,
    icon: '../images/shibaMapIcon2_smaller.png'
  })
}

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
function initMap() {
  const initialPosition = { lat: 59.32, lng: 17.84 };
  const mapObj = createMap(initialPosition);
  const dogMarker = createMarker({ mapObj, position: initialPosition });
  const $info = document.getElementById('info');

  var locationList = [];
  ///////////////////////////////
  // START, STOP EVENT HANDLER //
  ///////////////////////////////
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

      }); // end

      // jQuery end walk
      $("#endWalk").on("click", function (event) {
        console.log("End Walk!")

        // SHOW CURRENT STATIC LOCATION


        locationList = []
        console.log(locationList)
      }); // end




    });


  });


  console.log(locationList)
}


