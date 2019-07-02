// The REST API for Frontend communication

// const mqtt = require('mqtt')
// const client = mqtt.connect('mqtt://test.mosquitto.org')
const cors = require('cors');
const express = require('express');
const main = require('./main');

class Rest {
  constructor() {
    console.log("Rest init");

    this.app = express();

    this.app.use('*', cors()) // include before other routes

    this.app.get('/', this.getInfo);

    this.app.listen(8080);
  }

  getInfo(req, res) {
    // console.log('getInfo:', req, main.trainState);
    
    res.send(main.trainState);
  } 

}

module.exports = Rest;