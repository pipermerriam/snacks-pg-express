var request = require('request');
var app = require('../app.js');
var db = require('../db/knex')

describe('Snacks Root Path', function() {
  it("is cool", () =>  {
    expect(true).toBe(true)
  })

  beforeEach(function(done) {
    this.server = app.listen(0, function() {
      done();
    });
    this.baseUrl = "http://localhost:" + this.server.address().port + "/";
  });

  afterEach(function(done) {
    this.server.close(function() {
      db.destroy(done);
    });
  });

  it('returns status code 200', function(done) {
    request.get(this.baseUrl, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('returns a greeting', function(done) {
    request.get(this.baseUrl, function(error, response, body) {
      expect(body).toBe('Welcome to the Snack Tracker!');
      done();
    });
  });

});
