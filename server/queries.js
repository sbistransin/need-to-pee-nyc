const { Pool } = require('pg');
const parser = require('pg-connection-string').parse;
const pool = new Pool(parser(process.env.DATABASE_URL));

//prod connection: psql --host=ec2-34-194-73-236.compute-1.amazonaws.com --port=5432 --username=axapllxmniuzny --password --dbname=dcqboijsfm85ar
// password: f7c993fce2e0f8783d40c1e46914bf564d1fe6007c759e6ab06a8f8d92fd8ed7

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

const createNewUser = (email, password, name, phone) => {
  
  const query = {
    text: `
    INSERT INTO "nyc_pee_users" (email, password, name, phone)
    VALUES ($1, $2, $3, $4) RETURNING user_id, phone, name;
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
  return updatedUser;
};

const getRestrooms = async (user) => {
  const query = buildPreferencesQuery(user);
  const results = await pool.query(query).catch(err => console.error(err));
  return results.rows;
};

const buildPreferencesQuery = (user) => {
  const anyPreferences = getIfAnyPreferences(user);
  if (!anyPreferences) {
    return {
      text: "SELECT * FROM restrooms;",
    };
  }

  let preferencesQuery = "SELECT * FROM restrooms WHERE ";
  let preferencesArray = [];
  let nextParamNum = 1;

  if (!user.is_public) {
    if (nextParamNum != 1) {
      preferencesQuery += " AND ";
    };
    
    preferencesQuery += "category != $" + nextParamNum;
    nextParamNum += 1;
    preferencesArray.push("Public");
  }

  if (!user.is_coffee) {
    if (nextParamNum != 1) {
      preferencesQuery += " AND ";
    }; 

    preferencesQuery += "category != $" + nextParamNum;
    nextParamNum += 1;
    preferencesArray.push("Coffee Shop");
  }
 
  if (!user.is_fastfood) {
    if (nextParamNum != 1) {
      preferencesQuery += " AND ";
    };

    preferencesQuery += "category != $" + nextParamNum;
    nextParamNum += 1;
    preferencesArray.push("Fast Food");
  }

  if (!user.is_hotel) {
    if (nextParamNum != 1) {
      preferencesQuery += " AND ";
    };

    preferencesQuery += "category != $" + nextParamNum;
    nextParamNum += 1;
    preferencesArray.push("Hotel");
  }

  if (!user.is_book) {
    if (nextParamNum != 1) {
      preferencesQuery += " AND ";
    };

    preferencesQuery += "category != $" + nextParamNum;
    nextParamNum += 1;
    preferencesArray.push("Book Store");
  }

  if (!user.is_other) {
    if (nextParamNum != 1) {
      preferencesQuery += " AND ";
    };

    preferencesQuery += "category != $" + nextParamNum;
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

module.exports = {
  pool,
  findOneUserByEmailPassport,
  findOneUserByEmail,
  findOneUserByPhone,
  findOneUserById,
  createNewUser,
  getRestrooms,
  updateUser,
}