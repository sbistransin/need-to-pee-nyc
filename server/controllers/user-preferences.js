const { updateUser } = require("../queries");

exports.updateUserPreferences = async function(req, res) {
  await updateUser(req.user, req.body);
  res.send(200, "updating");
};