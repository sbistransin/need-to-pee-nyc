exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ user_id: req.user});
};

exports.signout = function(req, res) {
  req.logout();
  res.send("Logged out!");
};

exports.authenticateRequest = function (req, res, next) {
  if (!req.isAuthenticated()) {
    // Denied. Redirect to login
    // how to redirect this on the front end?
    console.log("DEEEnied");
  } else {
    next();
  }
};

exports.currentUser = function (req, res) {
  // change to return email and phone number or something
  const user = {
    user: req.user,
  };

  res.send(user);
};