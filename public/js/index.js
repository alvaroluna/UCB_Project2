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
  updateVolunteerInfo: function() {
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
  },
  ///////  Check to see if email address already exists in the volunteer table.///////
  testVolEmail: function(user) {
    return $.ajax({
      url: "/api/validEmail/" + user.email,
      type: "GET",
    });
  },
};
//#endregion

//#region Functions
function handleRegister(event) {
  event.preventDefault();
  if (!validateInputs()) {
    return;
  }
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
  /////////////  check to see if email address already exists in db, if no, then create new volunteer /////
  API.testVolEmail({ email: data.email }).then(function(result) {
    console.log(data.email);

    if (result === false) {
      API.createVolunteer(data).then(function(result) {
        //Load next page with volunteer info
        var url = window.location.href + "app/" + result.id;
        window.location.assign(url);
      });
    } else if (result === true) {
      alert("Email address already exists !");
      $("#new-email").val(null);
      return;
    }
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

function validateInputs() {
  if ($("#new-first-name").val() === "") {
    alert("Please Enter First Name");
    return false;
  } else if ($("#new-last-name").val() === "") {
    alert("Please Enter Last Name");
    return false;
  } else if ($("#new-dl-num").val() === "") {
    alert("Please Enter Drivers Lic #");
    return false;
  } else if ($("#new-dl-state").val() === "") {
    alert("Please Enter Drivers Lic State");
    return false;
  } else if ($("#new-dob").val() === "") {
    alert("Please Enter Date of Birth");
    return false;
  } else if ($("#new-address").val() === "") {
    alert("Please Enter Street Address");
    return false;
  } else if ($("#new-city").val() === "") {
    alert("Please Enter Address City");
    return false;
  } else if ($("#new-state").val() === "") {
    alert("Please Enter Address State");
    return false;
  } else if ($("#new-email").val() === "") {
    alert("Please Enter Email");
    return false;
  } else if ($("#new-phone").val() === "") {
    alert("Please Enter Phone Number");
    return false;
  } else {
    return true;
  }
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
