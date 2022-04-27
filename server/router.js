const sms = require('./controllers/sms');
const Authentication = require('./controllers/authentication');
const passport = require('passport');
require('./services/passport');

const requireSignin = passport.authenticate('local', {
  // not sure if we need these might handle on front end
  successRedirect: "/current-user",
  failureRedirect: "/login",
});

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  app.post('/login', requireSignin, Authentication.signin);
  app.get('/logout', Authentication.signout);
  app.get('/current-user', Authentication.authenticateRequest, Authentication.currentUser);

  // thinking these routes won't be "protected" but they won't work if you aren't a user?
  app.post('/sms', sms.receiveSMSFromUser);
  app.get('/sms', sms.sendUserSMS);
};