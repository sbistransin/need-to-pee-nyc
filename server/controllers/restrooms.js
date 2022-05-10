const cheerio = require('cheerio');
const axios = require('axios');
const { AuthRegistrationsCredentialListMappingContext } = require('twilio/lib/rest/api/v2010/account/sip/domain/authTypes/authRegistrationsMapping/authRegistrationsCredentialListMapping');
exports.getRestrooms = (req, res) => {

  let restrooms = [];
  axios.get('https://m3.mappler.net/dechr/class/list_data_web_fn.php?&page=1&blogid=nyrestroom&is_blog_user_group_allow_yn=N&page_per_record=530&th_no_sort_class=sort_asc')
  .then( response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const rows = $("tbody tr");
    rows.each((index, element) => {
      const name = $('td:nth-of-type(3)', element).text();
      if (name === "Name"){
        return false;
      }

      const id = $('td:nth-of-type(1)', element).text();
      const category = $('td:nth-of-type(4)', element).text();
      const address = $('td:nth-of-type(5)', element).text();
      const hours = $('td:nth-of-type(6)', element).text();

      restrooms.push({
        id,
        name,
        category,
        address,
        hours,
      })
    })
    res.send(restrooms);
  }).catch((err) => {
    console.log(err);
    res.send(400);
  })
}