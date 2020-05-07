var db = require("../models");

module.exports = function(app) {

  app.get("/api/volunteers", function(req, res) {
    db.Volunteer.findAll({}).then(function(cb) {
      res.json(cb);
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
    db.Volunteer.update(req.body,{ where: { id: req.body.id }}).then(function(cb) {
        res.json(cb);
      });
  }); 

  app.delete("/api/volunteers/:id", function(req, res) {
    db.Volunteer.destroy({ where: { id: req.params.id } }).then(function(cb) {
      res.json(cb);
    });
  });
};
