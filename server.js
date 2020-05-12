require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");
var seniorSeed = require("./seeders/seniorSeed")
var taskSeed = require("./seeders/taskSeed")
var volunteerSeed = require("./seeders/volunteerSeed")

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/task-api-routes")(app);
require("./routes/volunteer-api-routes")(app);
require("./routes/htmlRoutes")(app);




var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`


if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

if (process.env.NODE_ENV === "production") {
  syncOptions.force = false;
}
 

// Starting the server, syncing our models -& seeding tables initially------------/

db.sequelize.sync(syncOptions).then(function () {
  db.Senior.destroy({
    where: {},
    truncate: true
  }).then(function () { 
    db.Senior.bulkCreate(seniorSeed);
    db.Volunteer.bulkCreate(volunteerSeed);
    db.Task.bulkCreate(taskSeed); 
  })
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

