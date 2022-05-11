const cheerio = require('cheerio');
const axios = require('axios');
const { insertRestrooms, insertCoordinates } = require('../queries');
const { getCoordinates } = require('./sms');

const webScrapeRestrooms = async () => {
  let restrooms = [];
  await axios.get('https://m3.mappler.net/dechr/class/list_data_web_fn.php?&page=1&blogid=nyrestroom&is_blog_user_group_allow_yn=N&page_per_record=550&th_no_sort_class=sort_asc')
  .then( response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const rows = $("tbody tr");
    rows.each((index, element) => {
      const name = $('td:nth-of-type(3)', element).text();
      // stop loop
      if (name === "Name"){
        return false;
      }

      const address = $('td:nth-of-type(5)', element).text();
      // just want to skip
      if (!address){
        return ;
      }

      // I think I should filter out if address is null.... because it has no use for me

      const id = $('td:nth-of-type(1)', element).text();
      const category = $('td:nth-of-type(4)', element).text();
      const hours = $('td:nth-of-type(6)', element).text();

      restrooms.push({
        id,
        name,
        category,
        address,
        hours,
      })
    })
    //res.send(restrooms);
  }).catch((err) => {
    console.log(err);
    //res.send(400);
  })
  return restrooms;
}

exports.populateRestrooms = async (req, res) => {
  const restrooms = await webScrapeRestrooms();
  const returnUpdatedRestrooms = await insertRestrooms(restrooms)
  
  let needLongAndLat = returnUpdatedRestrooms.filter(i => (!i.lat || !i.long) && i.address && !i.exclude);
  for (let i = 0; i < needLongAndLat.length; i++){
    let coordinates = await getCoordinates(needLongAndLat[i].address);
    needLongAndLat[i].lat = coordinates.lat;
    needLongAndLat[i].long = coordinates.long;
  } 

  // update coordinates if needed
  if (needLongAndLat.length > 0){
    const updatedLatAndLong = await insertCoordinates(needLongAndLat);
  }

  // if possible send back the coordinates we needed
  res.send(restrooms);
}