// this class holds the state of the train

class Train {
  constructor(id) {
    console.log('new Train');

    this.id = id;                // train id
    this.leaves = false;         // leaves detected
    this.laser = false;          // laser is active

    this.leavesDistance = -1.0;  // where are the leaves on the track

    this.leavesLat = 0.0;        // leaves gps coord
    this.leavesLon = 0.0;        // leaves gps coord
    this.trainSpeed = -1;        // speed
    this.distance = -1;          // where is the train on the track
    this.updated = -1;           // timestamp of last update
  }
}

class TrainManager {
  constructor() {
    console.log('TrainManager');

    this.trains = [];

    this.updateTrain(0, { leaves: false });
    this.updateTrain(1, { leaves: false });

    /*
    setInterval(() => {
      this.updateTrain(0, {trainSpeed: Math.random() * 20 + 140 });
      this.updateTrain(1, {trainSpeed: Math.random() * 10 + 130 });
    }, 500);
    */

  }

  /* Update Train Data (Object) */
  updateTrain(id, data) {
    // console.log('updateTrain id:', id, data);

    if (this.trains[id] === undefined || this.trains[id] === null) {
      this.trains[id] = new Train(id);
    }

    for (let [key, value] of Object.entries(data)) {
      this.trains[id][key] = value;
    }

    this.trains[id]['updated'] = new Date().getTime();
  }
}

module.exports = new TrainManager();
