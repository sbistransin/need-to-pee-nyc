const http = require('http');
const bodyParser = require('body-parser');
const express = require("express");
const cors = require('cors');
const cookieSession = require("cookie-session");
const passport = require('passport');


const app = express();
const router = require('./router');

// postgres client
const { pool } = require('./queries');

pool.connect((err) => {
  if (err) console.log(err);
});

// accessible to any domain
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    name: "session-nyc",
    keys: ["helloworld"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

router(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;

http.createServer(app).listen(PORT, () => {
  console.log('Express server listening on port 8000');
});
