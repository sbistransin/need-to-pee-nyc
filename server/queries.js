const { Pool } = require('pg');
const parser = require('pg-connection-string').parse;

// const client = new Client(parser(process.env.DATABASE_URL));
const pool = new Pool(parser('postgres://localhost:5432/peenyc'));


const findOneUser = (email) => {
  
  const query = {
    text: `
    SELECT *
    FROM nyc_pee_users
    WHERE email = $1;
  `,
  values: [email],
  };

  return query;
};

module.exports = {
  pool,
  findOneUser
}