const { pool, findOneUser, createNewUser, findOneUserById } = require("../queries");

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

exports.currentUser = async function (req, res) {
  const user = await findOneUserById(req.user);
  // add error handling
  res.send(user);
};

exports.signup = async function(req, res, next) {
  debugger;
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;

  // if (!email || !password) {
  //   return res.status(422).send({ error: 'You must provide email and password'});
  // }
  // See if a user with the given email exists
  const existingUser = await pool.query(findOneUser(email)).catch(err => console.error(err));
  if (existingUser.rows.length != 0){
    res.status(422);
    return res.send('Email is already in use');
  }
  // good to create new user
  pool.query(createNewUser(email, password, name, phone), (err, results) => {
    if (err) return err;
    res.send({user_id: results.rows[0].user_id})
  })
};