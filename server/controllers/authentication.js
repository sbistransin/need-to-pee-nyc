const { pool, findOneUserByEmail, createNewUser, findOneUserById,findOneUserByPhone } = require("../queries");

exports.signin = async function(req, res, next) {
  // query db and return email? 
  const user = await findOneUserById(req.user);

  res.send({ 
    user_id: req.user,
    email: req.body.email,
    name: user.name,
  });
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
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  // const existingUserFromEMail = await pool.query(findOneUserByEmail(email)).catch(err => console.error(err));
  const existingUserFromEmail = await findOneUserByEmail(email);
  if (existingUserFromEmail){
    res.status(422);
    return res.send('Email is already in use');
  }

  const existingUserFromPhone = await findOneUserByPhone(phone);
  if (existingUserFromPhone) {
    res.status(422);
    return res.send('Phone number is already in use');
  }

  // good to create new user
  pool.query(createNewUser(email, password, name, phone), (err, results) => {
    if (err) return err;
    res.send({user_id: results.rows[0].user_id})
  })
};