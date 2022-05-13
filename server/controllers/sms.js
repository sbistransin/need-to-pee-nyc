const axios = require('axios');
const turf = require('@turf/turf');

// do we need this here
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { findOneUserByPhone, getUserRestrooms } = require('../queries');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const sendUserSMS = async (user) => {
  const client = require('twilio')(accountSid, authToken);
  
  await client.messages
    .create({
      body: `Welcome to Need to Pee NYC, ${user.name}!
      \nTo get started... text a NYC address to get the closest restroom near it.
      \nTo update your restroom preferences please visit: 
      https://need-to-pee-nyc.herokuapp.com/preferences`,  
      messagingServiceSid: process.env.MESSAGING_SERVICE_SID,      
      to: user.phone, 
      })
    .done();
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
    const results = await getUserRestrooms(existingUser);
    if (results.length === 0) {
      twiml.message(`Sorry no restrooms returned for your preferences. Please update at "https://need-to-pee-nyc.herokuapp.com/preferences"`);
    } else {
      const coordinates = await getCoordinates(address);
    
      const closestRestrooms = calculateClosestRestroom(results, coordinates);

      twiml.message(`Hi ${name}! Your closest restroom options are: 
      ${closestRestrooms.map((restroom, index) => {
        return `\n${index + 1}) ${restroom.name} at ${restroom.address} is ${restroom.distance} miles away\n`}).join('')}`);
    }
  };
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
};

const getCoordinates = async function(query) {
  query = query.replace("#", "");
  const geoURL= encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${process.env.GOOGLE_MAPS_API_KEY}`);

  return response =  await axios.get(geoURL)
  .then(response => {
    let coordinates = {
      lat: 'NULL',
      long: 'NULL',
    }

    if (response.data.status === 'OK'){
      coordinates = {
        lat: response.data.results[0].geometry.location.lat,
        long: response.data.results[0].geometry.location.lng,
      }
    }

    return coordinates;
  })
  .catch(function (error) {
    console.log(error);
    return {
      lat: 'NULL',
      long: 'NULL',
    }
  });
};

// uses Haversine formula
const calculateClosestRestroom = function(restrooms, coordinates) {
  
  // need to handle no restroom recommendation
  const from = turf.point([coordinates.long, coordinates.lat]);
  const options = {units: 'miles'};
  let restroomsWithDist = [];

  for (let i = 0; i < restrooms.length; i++) {

    if (restrooms[i].long && restrooms[i].lat){
      let to = turf.point([restrooms[i].long, restrooms[i].lat]);
      let distance = turf.distance(from, to, options);
      
      const restroom = {
        name: restrooms[i].name,
        distance: distance.toFixed(2),
        address: restrooms[i].address,
      }

      restroomsWithDist.push(restroom);
    }
  }
  const sortedRestrooms = restroomsWithDist.sort((a, b) => (a.distance > b.distance ? 1 : -1));
  return sortedRestrooms.slice(0,3);
};

module.exports = {
  sendUserSMS,
  receiveSMSFromUser,
  getCoordinates
};