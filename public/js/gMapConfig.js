// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;

// initMap() is called by src callback in handlebars file
function initMap() {
  // Try HTML5 geolocation. - WHERE IS THE NAVIGATOR OBJECT COMING FROM???
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {

        // get current location
        var currentPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };


        //////////////////////////////////////////////////////////// THIS CAN BE ABOVE 
        // map loads slow
        map = new google.maps.Map(document.getElementById("map"), {
          center: currentPos,
          zoom: 20
        });
        infoWindow = new google.maps.InfoWindow();
        //////////////////////////////////////////////////////////// THIS CAN BE ABOVE IF


        // this is an info window but don't really want it
        // infoWindow.setPosition(currentPos);
        // infoWindow.setContent("Location found.");
        // infoWindow.open(map);
        map.setCenter(currentPos);

        // custom dog icon at geolocation
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var marker = new google.maps.Marker({
          map: map,
          position: currentPos,
          // icon: iconBase + 'parking_lot_maps.png'
          icon: '../images/shibaMapIcon_smaller.png'
        })

      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, currentPos) {
  infoWindow.setPosition(currentPos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}