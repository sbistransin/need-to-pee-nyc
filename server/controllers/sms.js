const axios = require('axios');
const turf = require('@turf/turf');

// do we need this here
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { findOneUserByPhone, getRestrooms } = require('../queries');
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

const receiveSMSFromUser = async (req, res) => {
  const phone = req.body.From;
  const address = req.body.Body;
  const twiml = new MessagingResponse();

  const existingUser = await findOneUserByPhone(phone);
  if (!existingUser) {
    twiml.message(`Hi! To get your nearest NYC restrooms, please sign up at "https://need-to-pee-nyc.herokuapp.com/" :)`);

  } else {
    const name = existingUser.name;
    const results = await getRestrooms(existingUser);
    if (results.length === 0) {
      twiml.message(`Sorry no restrooms returned for your preferences. Please update at "https://need-to-pee-nyc.herokuapp.com/preferences"`);
    } else {
      const coordinates = await getCoordinates(address);
      const [closestRestroom, distance] = calculateClosestRestroom(results, coordinates);
      twiml.message(`Hi ${name}! Your closest restroom, ${closestRestroom.name}, at ${closestRestroom.address} is ${distance.toFixed(2)} miles away.`);
    }
  };
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
};

const getCoordinates = async function(query) {
  const geoURL= `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  const response = await axios.get(geoURL)
  .catch(function (error) {
    throw error;
  });

  const coordinates = {
    lat: response.data.results[0].geometry.location.lat,
    long: response.data.results[0].geometry.location.lng,
  };

  return coordinates;
};

// uses Haversine formula
const calculateClosestRestroom = function(restrooms, coordinates) {
  
  // need to handle no restroom recommendation
  const from = turf.point([coordinates.long, coordinates.lat]);
  const options = {units: 'miles'};
  let restroomRecommendation ;
  let minimumDistance;

  for (let i = 0; i < restrooms.length; i++) {

    if (restrooms[i].long && restrooms[i].lat){
      let to = turf.point([restrooms[i].long, restrooms[i].lat]);
      let distance = turf.distance(from, to, options);
      
      if (!minimumDistance || distance < minimumDistance) {
        minimumDistance = distance;
        restroomRecommendation = restrooms[i];
      }
    }
  }

  return [restroomRecommendation, minimumDistance];
};

module.exports = {
  sendUserSMS,
  receiveSMSFromUser
};