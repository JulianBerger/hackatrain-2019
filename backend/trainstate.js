// this class holds the state of the train

class Train {
  constructor(id) {
    console.log('new Train');

    this.id = id;
    this.leaves = false;
    this.leavesLat = 0.0;
    this.leavesLon = 0.0;
    this.trainSpeed = 10.3;

  }
}

class TrainManager {
  constructor() {
    console.log('TrainManager');

    this.trains = [];

    this.updateTrain(0, {leaves: false});
    this.updateTrain(1, {leaves: false});

    setInterval(() => {
      this.updateTrain(0, {trainSpeed: Math.random() * 20 + 140 });
      this.updateTrain(1, {trainSpeed: Math.random() * 10 + 130 });
    }, 500);

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
  }
}

module.exports = new TrainManager();
