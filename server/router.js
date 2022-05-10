const Sms = require('./controllers/sms');
const UserPreferences = require('./controllers/user-preferences');
const Authentication = require('./controllers/authentication');
const { getRestrooms } = require('./controllers/restrooms');
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
  // PUT /current-user
  app.put('/current-user', Authentication.authenticateRequest, UserPreferences.updateUserPreferences)

  // thinking these routes won't be "protected" but they won't work if you aren't a user?
  app.post('/sms', Sms.receiveSMSFromUser);
  app.get('/sms', Sms.sendUserSMS);

  app.get('/restrooms', getRestrooms);
};


// GEO LOCATION STUFF
// if(!navigator.geolocation) {
//   alert('Geolocation is not supported by your browser');
//   document.getElementById('root').classList.remove('loading');
// } else {
//   console.log("success")
//   navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
// }