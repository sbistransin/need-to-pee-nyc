const { Pool } = require('pg');
const parser = require('pg-connection-string').parse;

// const client = new Client(parser(process.env.DATABASE_URL));
// const pool = new Pool(parser('postgres://localhost:5432/peenyc'));
const pool = new Pool(parser(process.env.DATABASE_URL));

//prod connection: psql --host=ec2-34-194-73-236.compute-1.amazonaws.com --port=5432 --username=axapllxmniuzny --password --dbname=dcqboijsfm85ar
// password: f7c993fce2e0f8783d40c1e46914bf564d1fe6007c759e6ab06a8f8d92fd8ed7

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

const findOneUserByPhone = async function(phone) {
  
  const query = {
    text: `
    SELECT *
    FROM nyc_pee_users
    WHERE phone = $1;
  `,
  values: [phone],
  };

  const user = await pool.query(query).catch(err => console.error(err));
  return user.rows[0];
};

const findOneUserById = async function(id) {
  
  const query = {
    text: `
    SELECT *
    FROM nyc_pee_users
    WHERE user_id = $1;
  `,
  values: [id],
  };

  const user = await pool.query(query).catch(err => console.error(err));
  return user.rows[0];
};

const createNewUser = (email, password, name, phone) => {
  
  const query = {
    text: `
    INSERT INTO "nyc_pee_users" (email, password, name, phone)
    VALUES ($1, $2, $3, $4) RETURNING user_id;
  `,
  values: [email, password, name, phone],
  };

  return query;
};

const updateUser = async (id, userData) => {
  // update to add name later
  const query = {
    text: `
    UPDATE "nyc_pee_users"
    SET is_public = $2,
      is_coffee = $3,
      is_fastfood = $4,
      is_hotel = $5,
      is_book = $6,
      is_other = $7
    WHERE user_id = $1;
  `,
  values: [id, userData.isPublic, userData.isCoffee, userData.isFastFood, userData.isHotel, userData.isBook,
    userData.isOther],
  };

  const updatedUser = await pool.query(query).catch(err => console.error(err));
  return query;
};

const getRestrooms = async () => {
  
  const query = {
    text: `
      SELECT *
      FROM restrooms;
  `
  };
  const results = await pool.query(query).catch(err => console.error(err));
  return results.rows;
};

module.exports = {
  pool,
  findOneUser,
  findOneUserByPhone,
  findOneUserById,
  createNewUser,
  getRestrooms,
  updateUser,
}