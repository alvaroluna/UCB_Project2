var db = require("../models");

module.exports = function(app) {
  app.get("/api/volunteers", function(req, res) {
    db.Volunteer.findAll({}).then(function(cb) {
      res.json(cb);
    });
  });

  /// See if email address already exists in volunteer table, if yes, returns true, //////////

  app.get("/api/validEmail/:email", function(req, res) {
    console.log(req.params);
    db.Volunteer.findOne({
      where: {
        email: req.params.email    
      }
    }).then(function(cb) {
       
     if (cb === null) {
       console.log("false")
       res.send(false);
     } 
     else {
      console.log("true")
      res.send(true);
     }
    });
  });

 




  app.get("/api/volunteers/:id", function(req, res) {
    db.Volunteer.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(cb) {
      res.json(cb);
    });
  });

  app.post("/api/volunteers", function(req, res) {
    db.Volunteer.create(req.body).then(function(cb) {
      res.json(cb);
    });
  });

  app.put("/api/volunteers", function(req, res) {
    db.Volunteer.update(req.body, { where: { id: req.body.id } }).then(function(
      cb
    ) {
      res.json(cb);
    });
  });

  app.delete("/api/volunteers/:id", function(req, res) {
    db.Volunteer.destroy({ where: { id: req.params.id } }).then(function(cb) {
      res.json(cb);
    });
  });
};
