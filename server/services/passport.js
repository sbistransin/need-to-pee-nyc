const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { pool, findOneUserByEmail } = require('../queries');

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    pool.query(findOneUserByEmail(email), (err, results) => {
      if (err) {
        return done(err);
      }
      
      if (results.rows.length === 0) {
        //return res.send({success: false, message: "No user with that email foud."})
        return done(null, false, { message: 'No user with that email found.'});
      }

      // check for password
      // need to add decryption i think
      const found = results.rows.find((u) => u.password === password);

      if (found) {
        done(null, found.user_id);
      } else {
        done(null, false, { message: 'Incorrect password.' });
      }
    });

});

passport.use('local', localLogin);