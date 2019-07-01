// const mqtt = require('mqtt')
// const client = mqtt.connect('mqtt://test.mosquitto.org')
const mosca = require('mosca');

class MQTT {
  constructor(trainstate) {
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

    this.server.on('leaves', this.onLeavesReceive);

  }


  clientConnected(client) {
    console.log('client connected', client.id);
  }


  // fired when a message is received
  published(packet, client) {
    console.log('Published', packet.payload);
  };

  // fired when the mqtt server is ready
  afterSetup() {
    console.log('Mosca server is up and running');
  }

  onLeavesReceive(packet, client) {
    // console.log('Published', packet.toString());
  }
}

module.exports = MQTT;