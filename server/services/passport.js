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
        //return res.send({success: false, message: "No user with that email foud."})
        return done(null, false, { message: 'No user with that email found.'});
      }

      // check for password
      // need to add decryption i think
      bcrypt.compare(password, results.rows[0].password, function(err, result) {
        // result == true
        if (result) {
          done(null, results.rows[0].user_id);
        } else {
          done(null, false, { message: 'Incorrect password.' });
        }
      });

      //const found = results.rows.find((u) => {u.password === password});
      // if (found) {
      //   done(null, found.user_id);
      // } else {
      //   done(null, false, { message: 'Incorrect password.' });
      // }
    });

});

passport.use('local', localLogin);