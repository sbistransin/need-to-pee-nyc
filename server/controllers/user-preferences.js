const { updateUser } = require("../queries");

exports.updateUserPreferences = async function(req, res, next) {
  await updateUser(req.user, req.body);
  res.send(200);
};