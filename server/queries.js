const { Pool } = require('pg');
const parser = require('pg-connection-string').parse;
const pool = new Pool(parser(process.env.DATABASE_URL));
const format = require('pg-format');


const findOneUserByEmailPassport = (email) => {
  
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

const findOneUserByEmail = async (email) => {
  
  const query = {
    text: `
    SELECT *
    FROM nyc_pee_users
    WHERE email = $1;
  `,
  values: [email],
  };

  const user = await pool.query(query).catch(err => console.error(err));
  return user.rows[0];
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

const createNewUser = (email, hash, name, phone) => {
  
  const query = {
    text: `
    INSERT INTO "nyc_pee_users" (email, password, name, phone)
    VALUES ($1, $2, $3, $4) RETURNING user_id, phone, name;
  `,
  values: [email, hash, name, phone],
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
  return updatedUser;
};

const getUserRestrooms = async (user) => {
  const query = buildPreferencesQuery(user);
  const results = await pool.query(query).catch(err => console.error(err));
  return results.rows;
};

const getAllRestrooms = async () => {
  const query = 'SELECT * FROM restrooms;'
  const results = await pool.query(query).catch(err => console.error(err));
  return results.rows;
};

const buildPreferencesQuery = (user) => {
  const anyPreferences = getIfAnyPreferences(user);
  if (!anyPreferences) {
    return {
      text: "SELECT * FROM restrooms WHERE exclude = FALSE;",
    };
  }

  let preferencesQuery = "SELECT * FROM restrooms WHERE exclude = FALSE ";
  let preferencesArray = [];
  let nextParamNum = 1;

  if (!user.is_public) {
    preferencesQuery += "AND category != $" + nextParamNum;
    nextParamNum += 1;
    preferencesArray.push("Public");
  }

  if (!user.is_coffee) {
    preferencesQuery += "AND category != $" + nextParamNum;
    nextParamNum += 1;
    preferencesArray.push("Coffee Shop");
  }
 
  if (!user.is_fastfood) {
    preferencesQuery += "AND category != $" + nextParamNum;
    nextParamNum += 1;
    preferencesArray.push("Fast Food");
  }

  if (!user.is_hotel) {
    preferencesQuery += "AND category != $" + nextParamNum;
    nextParamNum += 1;
    preferencesArray.push("Hotel");
  }

  if (!user.is_book) {
    preferencesQuery += "AND category != $" + nextParamNum;
    nextParamNum += 1;
    preferencesArray.push("Book Store");
  }

  if (!user.is_other) {
    preferencesQuery += "AND category != $" + nextParamNum;
    nextParamNum += 1;
    preferencesArray.push("Other");
  }
  preferencesQuery += ";";
  return {
    text: preferencesQuery,
    values: preferencesArray,
  };
}

const getIfAnyPreferences = (user) => {
  return !user.is_public || !user.is_coffee || !user.is_fastfood || !user.is_hotel || !user.is_book || !user.is_other;
};

const insertRestrooms = async (restrooms) => {
  const valuesArray = buildArrayForRestroomInsert(restrooms);
  
  const sql = format(`
    INSERT INTO restrooms (restroom_id, name, category, address, hours)
    VALUES %L 
    ON CONFLICT ON CONSTRAINT restrooms_pkey
    DO
      UPDATE SET
		    (name, category, address, hours) = (EXCLUDED.name, EXCLUDED.category, EXCLUDED.address, EXCLUDED.hours) 
    RETURNING restroom_id, lat, long, address, exclude;
    `, valuesArray);
  
  const results = await pool.query(sql).catch(err => {
    console.error(err)});
  return results.rows;
};

const buildArrayForRestroomInsert = (restrooms) => {
  const valuesArray = restrooms.map((r, i) => {
    const regex = /'/g;
    const name = r.name.replace(regex, '');
    const category = r.category.replace(regex, '');
    const address = r.address.replace(regex, '');
    const hours = r.hours.replace(regex, '');
    return [r.id, name, category, address, hours];
    } 
  )
  return valuesArray;
}

const insertCoordinates = async (restrooms) => {
  const valuesArray = buildCoordinatesArray(restrooms);

  const sql = format(`
    UPDATE restrooms
    SET lat = temp.lat, long = temp.long
    FROM (
      VALUES ${valuesArray}
    ) AS temp (id, lat, long)
    WHERE restrooms.restroom_id = temp.id
    RETURNING restroom_id, temp.lat, temp.long;
    `);

  const results = await pool.query(sql).catch(err => {
    console.error(err)});
  return results.rows;
};

const buildCoordinatesArray = (restrooms) => {
  return `${restrooms.map(r => `(${r.restroom_id}::varchar, ${r.lat}::real, ${r.long}::real)`)}`};


module.exports = {
  pool,
  findOneUserByEmailPassport,
  findOneUserByEmail,
  findOneUserByPhone,
  findOneUserById,
  createNewUser,
  getUserRestrooms,
  getAllRestrooms,
  updateUser,
  insertRestrooms,
  insertCoordinates,
}