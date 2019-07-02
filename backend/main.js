const Mqtt = require('./mqtt');
const trainData = require('./trainstate');

// const trainData = new Train();

module.exports = {
  get trainState() {
    return trainData;
  }
}

const Rest = require('./rest');

const mqttServer = new Mqtt();
const restApi = new Rest();