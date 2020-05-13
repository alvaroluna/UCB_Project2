//#region HTML Elements
$monthYearHeader = $(".calendarMonthYear");
$weekOneRow = $("#week-1-row");
$weekTwoRow = $("#week-2-row");
$availableTaskList = $(".availableTaskList");

//#endregion

//#region Global Variables

//#endregion

//#region Objects
var API = {
  //Get All Task
  getAllTask: function() {
    return $.ajax({
      url: "/api/tasks",
      type: "GET",
    });
  },

  getTask: function(query) {
    return $.ajax({
      url: "/api/tasks",
      type: "GET",
    });
  },

  //GET Specific Task
  getOneTask: function(id) {
    return $.ajax({
      url: "/api/tasks/" + id,
      type: "GET",
    });
  },

  //Update Task Info
  updateTask: function(id, data) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
      },
      type: "PUT",
      url: "/api/tasks/" + id,
      data: JSON.stringify(data),
    });
  },
};
//#endregion

//#region Functions

function handleAddTask(event) {
  event.preventDefault();
  var taskId = $(this).attr("data-task-id");
  var data = { volunteerId: $("#user-name").attr("data-volunteer-id") };
  console.log(taskId);
  //Update Task to assign volunteer ID and refresh page
  API.updateTask(taskId, data).then(function(result) {
    window.location.reload();
  });
}

function handleStartTask(event) {}

function handleCompleteTask(event) {
  event.preventDefault();
  var taskId = $(this).attr("data-task-id");
  var data = { completed: true };

  //Update Task to completed and refresh page
  API.updateTask(taskId, data).then(function(result) {
    window.location.reload();
  });
}

function handleClickDay(event) {
  event.preventDefault();
  $thisButton = $(this);

  //Clear task list
  $availableTaskList.empty();
  //Reset button color
  $(".active-button").removeClass("btn-info");
  $(".active-button").addClass("btn-outline-info");
  //Set Active button color
  $thisButton.removeClass("btn-outline-info");
  $thisButton.addClass("btn-info");

  //Get available task ID for day
  var taskID = $thisButton.attr("data-taskids").split(",");

  //Render and append Task list
  taskID.forEach((task) => {
    API.getOneTask(task).then(function(result) {
      renderAvailableTask(result);
    });
  });
}

function getMoments() {
  //Get array of dates from sunday to end of month
  var dates = [];

  //Get todays date
  var now = new Date();
  var x = now.getDay();

  //Roll back to sunday to start calendar
  var start = new Date();
  start.setDate(now.getDate() - x);

  //Get all days in month
  var daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  var remainderOfDays = daysInMonth - start.getDate();

  for (i = 0; i < remainderOfDays; i++) {
    var temp = new Date();
    temp.setDate(start.getDate() + i);

    console.log();
    dates.push(moment(temp));
  }

  return dates;
}

function findTaskDate(task, date) {
  return task.date >= date;
}

function renderCalendar(dates, task) {
  $monthYearHeader.text(moment().format("MMMM YYYY"));
  for (var i = 0; i < dates.length; i++) {
    //Create column
    var $td = $("<td>");

    //Create button
    var $dateButton = $(
      "<button type='button' class='btn btn-calendar btn-sm m-0  waves-effect' >"
    );

    //filter all task with date and no assigned volunteer
    var dateTask = task.filter(function(task) {
      return (
        task.date === dates[i].format("YYYY-MM-DD") && task.volunteerId === null
      );
    });

    //Assign task IDs to array for date
    var taskIds = [];
    if (dateTask.length > 0) {
      dateTask.forEach((task) => {
        taskIds.push(task.id);
      });
      //TO DO: Assign button blue
      $dateButton.addClass("btn-outline-info active-button");
    } else {
      //TO DO: Assign button grey
      $dateButton.addClass("btn-outline-blue-grey");
      $dateButton.prop("disabled", true);
    }

    $dateButton.text(dates[i].date());
    $dateButton.attr("data-date", dates[i].format("YYYY-MM-DD"));
    $dateButton.attr("data-id", i);
    $dateButton.attr("data-taskIds", taskIds);
    var $modalBtn = $dateButton.clone().addClass("btn-calendar-modal");
    var $modaltd = $td.clone();
    $td.append($dateButton);
    $modaltd.append($modalBtn);

    if (i < 7) {
      $weekOneRow.append($td);
      $("#modal-week-1-row").append($modaltd);
    } else if (i < 14) {
      $weekTwoRow.append($td);
      $("#modal-week-2-row").append($modaltd);
    } else {
      return;
    }
  }
}

function renderAvailableTask(task) {
  //create and append element
  $li = $("<li class='list-group-item available-task'>" + task.task + "</li>");
  $li.attr("data-task-id", task.id);
  $span = $("<span class='float-right mr-2'>");
  $button = $(
    "<button type='button' class='btn-add-task btn btn-sm orange lighten-2'>"
  );
  $button.attr("data-task-id", task.id);
  $i = $("<i class='fas fa-plus fa-lg m-0 p-0'>");

  //;

  $li.append($span);
  $span.append($button);
  $button.append($i);

  // $li.text(task.task);

  $availableTaskList.append($li);
}

//#endregion

//#region Event Handlers
$(document).ready(function() {
  //Get all task when page loads
  API.getAllTask().then(function(result) {
    //render calendar
    renderCalendar(getMoments(), result);
  });

  //Calendar Day click
  $(document).on("click", ".btn-calendar", handleClickDay);
  //Add Task Click
  $(document).on("click", ".btn-add-task", handleAddTask);
  //Complete Task Click
  $(document).on("click", ".btn-complete-task", handleCompleteTask);
  //TO DO: Start Task Click
});
