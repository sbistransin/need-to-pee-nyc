const sms = require('./controllers/sms');

module.exports = function(app) {

  app.post('/api/sign-in', requireSignIn, signin);
  app.post('/sms', sms.receiveSMSFromUser);
  app.get('/sms', sms.sendUserSMS);
};