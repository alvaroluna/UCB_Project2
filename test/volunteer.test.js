var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/volunteers", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.Volunteer.bulkCreate([
      {
        name: "testing 1",
        age: 1,
        address: "testing 1",
        city: "testing 1",
        state: "testing 1",
        dlNum: "testing 1",
        dlState: "testing 1",
        phoneNum: "testing 1",
        gender: "testing 1"
      },
      {
        name: "testing 2",
        age: 2,
        address: "testing 2",
        city: "testing 2",
        state: "testing 2",
        dlNum: "testing 2",
        dlState: "testing 2",
        phoneNum: "testing 2",
        gender: "testing 2"
      }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/volunteers").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            name: "testing 1",
            age: 1,
            address: "testing 1",
            city: "testing 1",
            state: "testing 1",
            dlNum: "testing 1",
            dlState: "testing 1",
            phoneNum: "testing 1",
            gender: "testing 1"
          });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({
            name: "testing 2",
            age: 2,
            address: "testing 2",
            city: "testing 2",
            state: "testing 2",
            dlNum: "testing 2",
            dlState: "testing 2",
            phoneNum: "testing 2",
            gender: "testing 2"
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
