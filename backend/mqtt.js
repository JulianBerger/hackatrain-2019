// const mqtt = require('mqtt')
// const client = mqtt.connect('mqtt://test.mosquitto.org')
const mosca = require('mosca');
const main = require('./main');
const TrainManager = require('./trainstate');

let self = null;

class MQTT {
  constructor(trainstate) {
    self = this;

    console.log("MQTT init");

    this.ascoltatore = {
      //using ascoltatore
      type: 'mongo',
      url: 'mongodb://localhost:27017/mqtt',
      pubsubCollection: 'ascoltatori',
      mongo: {}
    };

    this.settings = {
      port: 1883,
      backend: this.ascoltatore
    };

    this.server = new mosca.Server(this.settings);

    this.server.on('clientConnected', this.clientConnected);
    this.server.on('published', this.published);
    this.server.on('ready', this.afterSetup);
  }


  clientConnected(client) {
    console.log('client connected', client.id);
  }


  // fired when a message is received
  published(packet, client) {
    console.log('Published', packet.topic, packet.payload);

    if (packet.topic.startsWith('train')) {
      const trainDataSplit = packet.topic.substr(6).split('/');
      console.log(trainDataSplit);
      if (trainDataSplit[0]) {
        const trainIdInt = parseInt(trainDataSplit[0]);
        const route = trainDataSplit[1];

        if (route === 'leaves') {
          self.onLeavesReceive(trainIdInt, packet, client);
        } else if (route === 'speed') {
          self.onSpeedReceive(trainIdInt, packet, client);
        } else if (route === 'lat') {
          self.onLatReceive(trainIdInt, packet, client);
        } else if (route === 'lon') {
          self.onLonReceive(trainIdInt, packet, client);
        }


      }
    }
  };

  // fired when the mqtt server is ready
  afterSetup() {
    console.log('Mosca server is up and running');
  }

  onLeavesReceive(id, packet, client) {
    console.log('leeave:', id, packet);
    const leaves = parseInt(packet.payload) === 1;
    TrainManager.updateTrain(id, { leaves: leaves });
  }

  onSpeedReceive(id, packet, client) {
    console.log('speed:', id, packet);
    const speed = parseFloat(packet.payload);
    TrainManager.updateTrain(id, { speed: speed });
  }

  onLatReceive(id, packet, client) {
    console.log('lat:', id, packet);
    const lat = parseFloat(packet.payload);
    TrainManager.updateTrain(id, { leavesLat: lat });
  }

  onLonReceive(id, packet, client) {
    console.log('lon:', id, packet);
    const lon = parseFloat(packet.payload);
    TrainManager.updateTrain(id, { leavesLon: lon });
  }
}

module.exports = MQTT;