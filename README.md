# README

### TODO (snack crud)

1. User can get a list of snacks
1. User can add a snack
1. User can edit a snack
1. User can delete a snack

### Get this puppy up and running

1. Fork, clone, npm install
1. `$ npm start`
1. go to (http://localhost:3000/)[http://localhost:3000/] and be greeted
1. `$ curl http://localhost:3000/` and be greeted

### How was this thing made?

#### Basic Express App setup

1. `$ express snacks-pg`
1. `$ cd snacks-pg`
1. `$ touch README.md`, open in your favorite editor and start taking AMAZING NOTES.
1. `$ npm install`
1. `$ npm start` to start the server and check it out (http://localhost:3000/)[http://localhost:3000/]
1. install jasmine-node `$ npm install --save-dev jasmine-node`
1. Ensure you have jasmine-node globally installed `$ jasmine-node`
  * if not installed, `$ npm install -g jasmine-node`
1. Make a spec directory in the project root and `$ touch spec/test.spec.js`
1. add the following contents to `spec/test.spec.js`:

  ```js
  describe("test setup", () => {
    it("is setup", () => {
      expect(true).toBe(false);
    });
  });
  ```

1. Open `package.json` and add a new script called "test" with a value of "jasmine-node spec/" (follow pattern for "start" script)
1. Run the test `$ npm test`. Make sure the test fails, then change false to true and COMMIT. yay.
1. `$ git init`
1. `$ echo node_modules >> .gitignore`
1. `$ git add .`
1. Commit all changes

#### User is greeted by API at root

1. `$ mv spec/test.spec.js spec/welcome.spec.js`
1. Add the package request to dev dependencies `$ npm install --save-dev request`
1. Change the contents of the file to:

  ```js
  var request = require('request');
  var app = require('../app.js');

  var baseUrl = 'http://localhost:3000/'

  describe('Snacks Root Path', function() {
    it('returns status code 200', function(done) {
      request.get(baseUrl, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns a greeting', function(done) {
      request.get(baseUrl, function(error, response, body) {
        expect(body).toBe('Welcome to the Snack Tracker!');
        done();
      });
    });

  });
  ```

1. Run your tests. Change the `routes/index.js` response to:

  ```js
  res.send('Welcome to the Snack Tracker!');
  ```

  Remove the comment while you are there. Run your tests and make sure you have gone from red to green.
1. Strip out all server-side rendering cruft code, and re-run tests to make sure you are still green:
  * `app.js`:
    * remove `var favicon = require('serve-favicon');`... we won't need a favicon.
    * remove comment regarding favicon and commented code for favicon

      ```js
      // uncomment after placing your favicon in /public
      //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
      ```

    * remove view engine setup lines of code
      ```js
      // view engine setup
      app.set('views', path.join(__dirname, 'views'));
      app.set('view engine', 'jade');
      ```
    * remove line of code to load static files `app.use(express.static(path.join(__dirname, 'public')));`
    * change the error case to render json as below (in two places):

      ```js
      res.json({
        message: err.message,
        error: err
      });
      ```
  * `package.json`:
    * remove jade and serve-favicon from dependencies. Make sure you address any trailing comma issues.
    * `$ rm -rf node_modules`, `$ npm install`, and restart server.
  * delete public directory
  * delete views directory
1. Commit new changes

#### Server restarts on file changes

1. globally install nodemon `$ npm install -g nodemon`
1. update package.json start script to be: `"nodemon ./bin/www"`

#### User can get a list of snacks

1. Create a new spec file `spec/snacks.spec.js` with the following content:

  ```js
  var request = require('request');
  var app = require('../app.js');

  var baseUrl = 'http://localhost:3000/'

  describe('Snacks', function() {
    it('returns status code 200', function(done) {
      request.get(baseUrl + 'snacks', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns empty list of snacks', function(done) {
      request.get(baseUrl + 'snacks', function(error, response, body) {
        expect(body).toBe([]);
        done();
      });
    });

  });
  ```

1. `$ createdb snacks_test`
1. `$ knex migrate:latest --env test`
1. In app.js, change users to snacks in two lines (four places):

  ```js
  var snacks = require('./routes/snacks');
  // ...
  app.use('/snacks', snacks);
  ```

1. `$ mv routes/users.js routes/snacks.js`
1. In `routes/snacks.js`, remove comment and change `res.send` to `res.json`
1. Install `pg` and `knex`

  ```
  npm install --save pg knex
  ```

1. `$ knex init` and replace the contents with:

  ```js
  module.exports = {

    development: {
      client: 'pg',
      connection: 'postgres://localhost/snacks_development'
    },

    test: {
      client: 'pg',
      connection: 'postgres://localhost/snacks_test'
    },

    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL
    }

  };
  ```

1. To app.js, add `var knex = require('./db/knex');`
1. Add `/db/knex.js` with the following content:

  ```js
  var environment = process.env.NODE_ENV || 'development';
  var config = require('../knexfile.js')[environment];
  module.exports = require('knex')(config);
  ```

1. change routes/snacks.js to use knex:

  ```js
  var express = require('express');
  var router = express.Router();
  var knex = require('knex')(require('../knexfile')[process.env.NODE_ENV || 'development']);

  router.get('/', function(req, res, next) {
    knex('snacks').then(function (snacks) {
      res.json(snacks);
    })
  });

  module.exports = router;
  ```

1. `$ createdb snacks_development`
1. `$ knex migrate:make snacks` and replace migration content with:

  ```js
  exports.up = function(knex, Promise) {
    return knex.schema.createTable('snacks', (t) => {
      t.increments();
      t.string('name');
      t.boolean('healthy');
      t.integer('quantity');
      t.float('ounces');
      t.timestamps();
    })
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('snacks');
  };
  ```

1. migrate `$ knex migrate:latest`
1. check out the empty collection of snacks at (http://localhost:3000/snacks)[http://localhost:3000/snacks]
1. Add a snack to your development database:

  ```
  $ psql
  > \c snacks_development
  > SELECT * FROM snacks;
  > INSERT INTO snacks(name, healthy, quantity, ounces, created_at, updated_at)
  > VALUES ('beef jerky', true, 5, 3.5, current_timestamp, current_timestamp);
  ```

1. Check out your new colleciton of snacks! (http://localhost:3000/snacks)[http://localhost:3000/snacks]
