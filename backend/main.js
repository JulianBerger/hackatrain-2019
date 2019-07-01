const Mqtt = require('./mqtt');
const Train = require('./trainstate');

const trainData = new Train();

module.exports = {
 get trainState() {
   return trainData;
 },
 set trainState(state) {
  trainData = state;
}
} 

const Rest = require('./rest');

const mqttServer = new Mqtt();
const restApi = new Rest();