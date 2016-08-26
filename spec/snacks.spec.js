var request = require('request');
var app = require('../app.js');

describe('Snacks', function() {

  // beforeEach(function(done) {
  //   this.server = app.listen(0, function() {
  //     done();
  //   });
  //   this.baseUrl = "http://localhost:" + this.server.address().port + "/";
  // });
  //
  // afterEach(function(done) {
  //   this.server.close(function() {
  //     done();
  //   });
  // });
  //
  // it('returns status code 200', function(done) {
  //   request.get(this.baseUrl + 'snacks', function(error, response, body) {
  //     expect(response).toNotBe(undefined);
  //     expect(response.statusCode).toBe(200);
  //     done();
  //   });
  // });
  //
  // it('returns empty list of snacks', function(done) {
  //   request.get(this.baseUrl + 'snacks', function(error, response, body) {
  //     expect(body).toBe(JSON.stringify([]));
  //     done();
  //   });
  // });

});
