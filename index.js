// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

const os = require('os');
const accepts = require('accepts');
const useragent = require('useragent');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Get IP Address
function getIpAddress() {
  const ifaces = os.networkInterfaces();
  let ipAddress = null;

  Object.keys(ifaces).forEach((ifname) => {
    const iface = ifaces[ifname].find((info) => !info.internal && info.family === 'IPv4');
    if (iface) {
      ipAddress = iface.address;
      return;
    }
  });

  return ipAddress;
}

// user language
function getUserLanguages(req) {
  const accept = accepts(req);

  const preferredLanguages = accept.languages();

  return preferredLanguages;
}

// user software
function getUserSoftware(req) {

  const agent = useragent.parse(req.headers['user-agent']);

  return agent.toString();
}


// Route for IP Address
app.get('/api/whoami', (req, res) => {
  console.log(getUserSoftware(req));
  const ipAddress = getIpAddress();
  const userLanguage = getUserLanguages(req);
  const userSoftware = getUserSoftware(req);

  res.json({ ipaddress: ipAddress, language: userLanguage, software: userSoftware });
});

