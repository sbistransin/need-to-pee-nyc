const { pool, findOneUserByEmail, createNewUser, findOneUserById, findOneUserByPhone } = require("../queries");
const { sendUserSMS } = require('./sms');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signin = async function(req, res, next) {
  // query db
  const user = await findOneUserById(req.user.user_id);
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
    res.send(401, "Not logged in");
  } else {
    next();
  }
};

exports.currentUser = async function (req, res) {
  // if not auth
  if (!req.user) {
    res.send(401, "Not logged in");
  }
  const user = await findOneUserById(req.user.user_id);
  // add error handling
  res.send(user);
};

// move to local sign up
exports.signup = async function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // is email already in db?
  const existingUserFromEmail = await findOneUserByEmail(email);
  if (existingUserFromEmail){
    res.status(422);
    return res.send('Email is already in use');
  }

  // phone already in db?
  const existingUserFromPhone = await findOneUserByPhone(phone);
  if (existingUserFromPhone) {
    res.status(422);
    return res.send('Phone number is already in use');
  }

  bcrypt.hash(password, saltRounds, function(err, hash) {
    // create user 
    pool.query(createNewUser(email, hash, name, phone), (err, results) => {
      if (err) return next(err);
      const newUser = results.rows[0]
      sendUserSMS(newUser);
      req.login(newUser, function(err) {
        if (err) { return next(err) }
        res.send({
          user_id: newUser.user_id,
          email: newUser.email,
          name: newUser.name,
        })
      })
    })
  });  
};