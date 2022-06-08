const { updateUser } = require("../queries");

exports.updateUserPreferences = async function(req, res, next) {
  await updateUser(req.user.user_id, req.body);
  res.send(200);
};