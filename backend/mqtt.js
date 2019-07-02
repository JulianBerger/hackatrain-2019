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
    // console.log('Published', packet.topic, packet.payload);

    if (packet.topic.startsWith('train')) {
      const trainDataSplit = packet.topic.substr(6).split('/');
      // console.log(trainDataSplit);
      if (trainDataSplit[0]) {
        const trainIdInt = parseInt(trainDataSplit[0]);
        const route = trainDataSplit[1];

        if (route === 'leaves') {
          self.onLeavesReceive(trainIdInt, packet, client);
        } else if (route === 'speed') {
          self.onSpeedReceive(trainIdInt, packet, client);
        } else if (route === 'laser') {
          self.onLaserReceive(trainIdInt, packet, client);
        } else if (route === 'distance') {
          self.onDistanceReceive(trainIdInt, packet, client);
        } else if (route === 'flag') {
          self.onFlagReceive(trainIdInt, packet, client);
        } else if (route === 'leaves_distance') {
          self.onLeavesDistanceReceived(trainIdInt, packet, client);
        } else if (route === 'leaves_length') {
          self.onLeavesLengthReceived(trainIdInt, packet, client);
        }

      }
    }
  };

  // fired when the mqtt server is ready
  afterSetup() {
    console.log('Mosca server is up and running');
  }

  onLeavesReceive(id, packet, client) {
    const leaves = packet.payload.toString() === 'True';
    let leavesDistance = -1;

    /*if(leaves === true && TrainManager.trains && TrainManager.trains[id]) {
      leavesDistance = TrainManager.trains[id].distance;
    }*/
    console.log('leaves:', id, packet, packet.payload.toString(), leaves);

    if(leaves === true) {
      console.log('leaves:', id, packet);
    }

    TrainManager.updateTrain(id, {
      leaves,
      // leavesDistance,
     });
  }

  onSpeedReceive(id, packet, client) {
    const speed = parseFloat(packet.payload);
    // console.log('speed:', id, packet, speed);

    TrainManager.updateTrain(id, { trainSpeed: speed });
  }


  onDistanceReceive(id, packet, client) {
    const dist = parseFloat(packet.payload);
    // console.log('speed:', id, packet, dist);

    TrainManager.updateTrain(id, { distance: dist });
  }

  onLaserReceive(id, packet, client) {
    // console.log('laser:', id, packet);
    const laser = parseInt(packet.payload) === 1;
    TrainManager.updateTrain(id, { laser: laser });
  }

  onFlagReceive(id, packet, client) {
    // console.log('flag:', id, packet);
    const flag = parseInt(packet.payload);
    TrainManager.updateTrain(id, { flag: flag });
  }

  onLonReceive(id, packet, client) {
    // console.log('lon:', id, packet);
    const lon = parseFloat(packet.payload);
    TrainManager.updateTrain(id, { leavesLon: lon });
  }

  onLeavesDistanceReceived(id, packet, client) {
    // console.log('lon:', id, packet);
    const lon = parseFloat(packet.payload);
    TrainManager.updateTrain(id, { leavesDistance: lon });
  }

  onLeavesLengthReceived(id, packet, client) {
    // console.log('lon:', id, packet);
    const lon = parseFloat(packet.payload);
    TrainManager.updateTrain(id, { leavesLength: lon });
  }
  
}

module.exports = MQTT;