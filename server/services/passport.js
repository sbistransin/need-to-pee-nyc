const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    const authenticated = email === "John" && password === "Smith";

    if (authenticated) {
      //return user data from db here
      return done(null, { myUser: "user", myID: 1234 });
    } else {
      return done(null, false);
    }

  // User.findOne({ email: email }, function(err, user) {
  //   if (err) { return done(err); }
  //   if (!user) { return done(null, false) }

  //   if (!user.validPassword(password)) {
  //     return done(null, false, { message: 'Incorrect password.' })
  //   }

  //   return done(null, user);
  // });
});

passport.use('local', localLogin);