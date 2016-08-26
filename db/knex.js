var DATABASE_URL = process.env.DATABASE_URL
if (process.env.NODE_ENV === 'test') {
  DATABASE_URL = process.env.TEST_DB_URL;
};

var knex = require('knex');
var db = knex({ client: 'pg', connection: DATABASE_URL });
module.exports = db;
