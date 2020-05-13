// Note: This example requires that you consent to location sharing when
var map, infoWindow;

///////////////////////////////////////////////////
// PROGRAM ENTRY POINT                           //
// invoked by src as callback in handlebars file //
///////////////////////////////////////////////////
function initMap() {
  // Try HTML5 geolocation. - WHERE IS THE NAVIGATOR OBJECT COMING FROM???
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
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

        map.setCenter(currentPos);

        // custom dog icon at geolocation
        var marker = new google.maps.Marker({
          map: map,
          position: currentPos,
          icon: "../images/shibaMapIcon2_smaller.png"
        });
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, currentPos) {
  infoWindow.setPosition(currentPos);
  infoWindow.setContent(
    browserHasGeolocation
    "Error: The Geolocation service failed." :
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

///////////////////////////////
// START, STOP EVENT HANDLER //
///////////////////////////////
$(function() {
  // jQuery start walk
  $("#startWalk").on("click", function(event) {
    console.log("Start Walk!");

    // var id = $(this).data("id");
    // var newDevoured = $(this).data("newsleep");

    // var newDevouredState = {
    //   devoured: newDevoured
    // };

    // Send the PUT request.
    // $.ajax("/api/burgers/" + id, {
    //   type: "PUT",
    //   data: newDevouredState
    // }).then(
    //   function () {
    //     console.log("changed devoured to", newDevoured);
    //     // Reload the page to get the updated list
    //     location.reload();
    //   }
    // );
  }); // end

  // jQuery end walk
  $("#endWalk").on("click", function(event) {
    console.log("End Walk!");
  }); // end

  // $(".create-form").on("submit", function (event) {
  //   // Make sure to preventDefault on a submit event.
  //   event.preventDefault();

  //   var newBurger = {
  //     burger_name: $("#inputBox").val().trim(),
  //   };

  //   // Send the POST request.
  //   $.ajax("/api/burgers", {
  //     type: "POST",
  //     data: newBurger
  //   }).then(
  //     function () {
  //       console.log("created new burger");
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });

  // $(".delete-burger").on("click", function (event) {
  //   var id = $(this).data("id");

  //   // Send the DELETE request.
  //   $.ajax("/api/burgers/" + id, {
  //     type: "DELETE"
  //   }).then(
  //     function () {
  //       console.log("deleted burger", id);
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });
});
