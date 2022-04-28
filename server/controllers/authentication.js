const { pool, findOneUser, createNewUser } = require("../queries");

exports.signin = function(req, res, next) {
  debugger;
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

exports.signup = async function(req, res, next) {
  debugger;
  const email = req.body.email;
  const password = req.body.password;

  console.log(email);

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }
  debugger;
  // See if a user with the given email exists
  const existingUser = await pool.query(findOneUser(email)).catch(err => console.error(err));
  debugger;
  if (existingUser.rows.length != 0){
    debugger;
    res.status(422);
    return res.send('Email is already in use');
  }
  // good to create new user
  pool.query(createNewUser(email, password), (err, results) => {
    if (err) return err;
    debugger;
    res.send({user_id: results.rows[0].user_id})
  })
};