if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const sendUserSMS = (req, res) => {
  
  const client = require('twilio')(accountSid, authToken);
  
  client.messages
    .create({
      body: 'hi from nyc pee',  
      messagingServiceSid: 'MG1d6d31b1fb9fba83d482f516be369835',      
      to: '+19728541675' 
      })
    .then(message => console.log(message.sid))
    .done();
    // need to change ordering of all this
    res.send("Success!")
    res.end();
};

const receiveSMSFromUser = (req, res) => {
  
  const twiml = new MessagingResponse();
  
  twiml.message('Testing...');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
};

module.exports = {
  sendUserSMS,
  receiveSMSFromUser
};