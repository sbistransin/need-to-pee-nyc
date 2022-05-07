const { updateUser } = require("../queries");

exports.updateUserPreferences = async function(req, res) {
  debugger;
  await updateUser(req.user, req.body);
  res.send(200, "updating");
};

exports.buildPreferencesQuery = (user) => {
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

const  getIfAnyPreferences = (user) => {
  return !user.is_public || !user.is_coffee || !user.is_fastfood || !user.is_hotel || !user.is_book || !user.is_other;
}