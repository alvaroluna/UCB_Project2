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

  ////////////////////////////////////////////////////
  // Load example page and pass in an example by id //
  ////////////////////////////////////////////////////
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  //////////////////////////////////
  // Load dog walk volunteer page //
  //////////////////////////////////
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
  app.get("/volunteer/:id", function(req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.render("volunteer", {
        example: dbExample
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
