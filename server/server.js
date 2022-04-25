if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const http = require('http');
const express = require("express");
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

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
