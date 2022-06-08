const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { pool, findOneUserByEmailPassport } = require('../queries');
const bcrypt = require('bcrypt');

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    pool.query(findOneUserByEmailPassport(email), (err, results) => {
      if (err) {
        return done(err);
      }
      
      if (results.rows.length === 0) {
        return done(null, false, { message: 'No user with that email found.'});
      }

      // check for password
      // need to add decryption i think
      bcrypt.compare(password, results.rows[0].password, function(err, result) {
        if (result) {
          done(null, {
            user_id: results.rows[0].user_id,
            email: results.rows[0].email,
            name: results.rows[0].name,
          });
        } else {
          done(null, false, { message: 'Incorrect password.' });
        }
      });
    });

});

// implement local sign up

passport.use('local', localLogin);