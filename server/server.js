if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const http = require('http');
const express = require("express");
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.get('/', (req, res) => {
  res.send("Test Route");
  res.end();
})

app.get('/sms', (req, res) => {

  const client = require('twilio')(accountSid, authToken);
  client.messages
    .create({
      body: 'hi from nyc pee',  
      messagingServiceSid: 'MG1d6d31b1fb9fba83d482f516be369835',      
      to: '+19728541675' 
    })
    .then(message => console.log(message.sid))
    .done();

})

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('Testing...');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
})

const PORT = process.env.PORT || 8000;

http.createServer(app).listen(PORT, () => {
  console.log('Express server listening on port 8000');
});
