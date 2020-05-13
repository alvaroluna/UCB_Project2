//#region HTML Elements

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
};
//#endregion

//#region Functions
function handleClickDay(event) {
  event.preventDefault();

  //var selectedDate= data-date
}

function handleAddTask(event) {
  event.preventDefault();

  // API.authenticate(data).then(function (result) {
  //     //Load app page
  //     if (!result.authentic) {
  //         alert("password incorrect");
  //         return;
  //     } else {
  //         var url = window.location.href + "app/" + result.id;
  //         window.location.assign(url);
  //     }
  // });
}

function handleStartTask(event) {}

function handleCompleteTask(event) {}
//#endregion

//#region Event Handlers
$(document).ready(function() {
  //Calendar(Populate calendar with date data and disabled buttons. when page renders task data will be passed to page,
  //FOR EACH task check IF date matches date data THEN set active with outline color.
  //Active task(When page renders, all task data will be passed to element, for every task True
  //and assigned to volunteer ID, create list for each)
  //Activity(when page renders, get all task data, add to list IF task has volunteer ID and Completed True,)
  //TO DO: Add task button click (send put request to update task to not
  //available and assigned to volunteer, refresh page)
  //TO DO: Calendar day click (When you click on day the button color will be solid
  //and will send api request for all task with that date and assigned false)
  //TO DO:
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
