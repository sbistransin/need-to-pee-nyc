const Sms = require('./controllers/sms');
const UserPreferences = require('./controllers/user-preferences');
const Authentication = require('./controllers/authentication');
const { populateRestrooms } = require('./controllers/restrooms');
const passport = require('passport');
require('./services/passport');

const requireSignin = passport.authenticate('local');

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  app.post('/login', requireSignin, Authentication.signin);
  app.get('/logout', Authentication.signout);
  app.post('/signup', Authentication.signup);
  app.get('/current-user', Authentication.authenticateRequest, Authentication.currentUser);
  app.put('/current-user', Authentication.authenticateRequest, UserPreferences.updateUserPreferences)

  // twilio routes
  app.post('/sms', Sms.receiveSMSFromUser);
  app.get('/sms', Sms.sendUserSMS);

  // web-scrape / admin route
  app.get('/database/populate-restroom-table', populateRestrooms);
};