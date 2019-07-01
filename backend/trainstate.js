// this class holds the state of the train

class Train {
  constructor(id) {
    console.log('new Train');

    this.id = id;
    this.leaves = false;
    this.leavesLat = 0.0;
    this.leavesLon = 0.0;
  }
}

class TrainManager {
  constructor() {
    console.log('TrainManager');

    this.trains = [];

    this.updateTrain(0, {leaves: false});
  }

  /* Update Train Data (Object) */
  updateTrain(id, data) {
    console.log('updateTrain id:', id, data);

    if (this.trains[id] === undefined || this.trains[id] === null) {
      this.trains[id] = new Train(id);
    } 
    
    for (let [key, value] of Object.entries(data)) {
      console.log(`for ${key}: ${value}`);
      this.trains[id].key = value;
    }

    console.log(this.trains);

  }
}

module.exports = TrainManager;
