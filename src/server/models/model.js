const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const { URI } = process.env;

const pool = new Pool({
  connectionString: URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('query:', text);
    return pool.query(text, params, callback);
  }
};
