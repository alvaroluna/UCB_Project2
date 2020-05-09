// think about the pages you want displayed, not the data to display on them

var db = require("../models");

module.exports = function(app) {
  ////////////////////////////
  // Load index page - HOME //
  ////////////////////////////
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  ////////////////////////////
  // TEST Load App page     //
  ////////////////////////////
  app.get("/app", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("app", {
        examples: dbExamples
      });
    });
  });

  ////////////////////////////////////////////////////
  // Load example page and pass in an example by id //
  ////////////////////////////////////////////////////
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  //////////////////////////
  // Test page for Alvaro //
  //////////////////////////
  app.get("/dogWalkVolunteer", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("dogWalkVolunteer", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  //////////////////////////////
  // Load main volunteer page //
  //////////////////////////////
  app.get("/app/:id", function (req, res) {

    db.Volunteer.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbVolunteer) {
      res.render("app", {
        volunteer: dbVolunteer
      });
    });
  });

  //////////////////////////////////////////////
  // Render 404 page for any unmatched routes //
  //////////////////////////////////////////////
  app.get("*", function(req, res) {
    res.render("404");
  });
};
