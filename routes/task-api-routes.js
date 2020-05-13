var db = require("../models");

module.exports = function(app) {
  app.get("/api/tasks", function(req, res) {
    var query = {};
    if (req.query.volunteer_id) {
      query.volunteerId = req.query.volunteer_id;
    }
    db.Task.findAll({
      where: query,
    }).then(function(cb) {
      res.json(cb);
    });
  });

  app.get("/api/tasks/:id", function(req, res) {
    db.Task.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function(cb) {
      res.json(cb);
    });
  });

  app.post("/api/tasks", function(req, res) {
    db.Task.create(req.body).then(function(cb) {
      res.json(cb);
    });
  });

  app.delete("/api/tasks/:id", function(req, res) {
    db.Task.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function(cb) {
      res.json(cb);
    });
  });

  app.put("/api/tasks/:id", function(req, res) {
    db.Task.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then(function(cb) {
      res.json(cb);
    });
  });
};
