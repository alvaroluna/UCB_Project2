//#region HTML Elements

var $registerBtn = $("#register-button");
var $logInBtn = $("#login-button");

//#endregion

//#region Global Variables
//#endregion

//#region Objects
var API = {
  //Create New Voluneteer
  createVolunteer: function(data) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
      },
      type: "POST",
      url: "/api/volunteers",
      data: JSON.stringify(data),
    });
  },
  //Get Volunteer Info
  getVolunteerInfo: function() {
    return $.ajax({
      url: "api/volunteer/",
      type: "GET",
    });
  },
  //Update Volunteer Info
  updateVolunteerInfo: function(data) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
      },
      type: "PUT",
      url: "/api/volunteers",
      data: JSON.stringify(data),
    });
  },
  //Delete Volunteer
  deleteExample: function(id) {
    return $.ajax({
      url: "api/volunteers/" + id,
      type: "DELETE",
    });
  },
  //Authenticate Volunteer
  authenticate: function(user) {
    return $.ajax({
      url: "api/authenticate/" + user.email + "/" + user.password,
      type: "GET",
    });

    ("api/authenticate/:email/:password");
  },
};
//#endregion

//#region Functions
function handleRegister(event) {
  event.preventDefault();

  var data = {
    //Get New User Data
    firstName: $("#new-first-name")
      .val()
      .trim(),
    lastName: $("#new-last-name")
      .val()
      .trim(),
    dlNum: $("#new-dl-num")
      .val()
      .trim(),
    dlState: $("#new-dl-state")
      .val()
      .trim(),
    dob: $("#new-dob")
      .val()
      .trim(),
    streetAddress: $("#new-address")
      .val()
      .trim(),
    city: $("#new-city")
      .val()
      .trim(),
    state: $("#new-state")
      .val()
      .trim(),
    email: $("#new-email")
      .val()
      .trim(),
    phoneNum: $("#new-phone")
      .val()
      .trim(),
    password: $("#new-password")
      .val()
      .trim(),
  };

  //Validate new password
  var passwordValidate = $("#new-password-val")
    .val()
    .trim();
  if (data.password != passwordValidate) {
    alert("Passwords must match try again");
    $("#new-password").val(null);
    $("#new-password-val").val(null);
    return;
  }
  //Validate all required fields entered
  if (!(data.firstName && data.lastName && data.email)) {
    alert("First name, last name, and email is required");
    return;
  }

  API.createVolunteer(data).then(function(result) {
    //Load next page with volunteer info
    var url = window.location.href + "app/" + result.id;
    window.location.assign(url);
  });
}

function handleLogIn(event) {
  event.preventDefault();

  var data = {
    //Get Log in Data
    email: $("#log-in-email")
      .val()
      .trim(),
    password: $("#log-in-password")
      .val()
      .trim(),
  };

  if (!(data.email && data.password)) {
    alert("Please enter email and password");
    return;
  }

  API.authenticate(data).then(function(result) {
    //Load app page
    if (!result.authentic) {
      alert("password incorrect");
      return;
    } else {
      var url = window.location.href + "app/" + result.id;
      window.location.assign(url);
    }
  });
}
//#endregion

//#region Event Handlers
$(document).ready(function() {
  //Register
  $registerBtn.on("click", handleRegister);

  //Log In
  $logInBtn.on("click", handleLogIn);
});
//#endregion

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
