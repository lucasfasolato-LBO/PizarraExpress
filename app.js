const express = require('express')
const path = require('path');
const router = express.Router();
const app = express()
const port = 3000
const browserObject = require('./browser');
const scraperController = require('./public/pageController');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();
// // Pass the browser instance to the scraper controller
scraperController(browserInstance)

// const data = require('./data.json')
// console.log(data)

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  // if (data != null) {
  //   res.sendFile(path.join(__dirname+'/public/index.html'));
  // } else {
  //   res.send('No cargo data')
  // }
  res.sendFile(path.join(__dirname+'/public/index.html'));
})

app.get('/json', (req, res) => {
  res.json(data)
})

app.listen(process.env.port || 3000);
console.log("Running at Port 3000");