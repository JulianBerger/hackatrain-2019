import React from 'react';
import './Leaves.css';

import { Train } from './components/Train'
import { TrainInfo } from './components/TrainInfo'
import LeafImg from './assets/leaf.png'
import RailsSideImg from './assets/rails-side.svg'
import TrainImg from './assets/train2.png'
import TrainImg2 from './assets/train3.png'

import MQTTManager from './utils/MQTTManager'
import Moment from 'react-moment';

class User extends React.Component {

	constructor(props) {
		super(props);

		this.maxDist = 8000;	// distance to destination
		this.rideTimeMin = 55;	// time in min to dest

		this.notificationStart = 0;
		this.state = {
			leaves: false,
			speed: -1.0,
			distance: -1.0,
		}
	}

	start() {
		setInterval(async () => {
			try {
				const res = await MQTTManager.pull()
				console.log(res)

				this.setState({ speed: res.data.trains[0].trainSpeed, leaves: res.data.trains[0].leaves, distance: res.data.trains[0].distance, })
				let train2 = Object.assign({}, res.data.trains[0]);
				train2.leaves = false;

				this.setState({ train2: train2 })
				let train1 = Object.assign({}, res.data.trains[0]);
				train1.distance = res.data.trains[0].distance + 2000;
				train1.distance = res.data.trains[0].distance + 2000;
				this.setState({ train1: train1 })
				console.log(this.state)
			} catch (e) {
				console.log("res")
			}

		}, 100)
	}

	async componentDidMount() {
		this.start()
		console.log(process.env.REACT_APP_DEV_API_KEY)
	}

	getDistancePosition(dist) {
		let left = 0;

		if (dist <= 0) {
			return 0;
		}
		else if (dist >= this.maxDist) {
			return 100;
		}

		left = dist / this.maxDist;


		return left * 100;
	}

	getTimeToDest(dist) {
		let percentage = 0;

		if (dist <= 0) {
			percentage = 0;
		}
		else if (dist >= this.maxDist) {
			percentage = 0.99;
		} else {

			percentage = dist / this.maxDist;

		}
		const mins = parseInt(this.rideTimeMin - (percentage * this.rideTimeMin));
		const dt = new Date();
		// console.log('mins', percentage, mins);


		return new Date(dt.getTime() + mins * 60000);

	}

	render() {
		const trainSpeed1 = this.state.train1 ? parseFloat(this.state.train1.trainSpeed).toFixed(1) : "error"
		const trainSpeed2 = this.state.train2 ? parseFloat(this.state.train2.trainSpeed).toFixed(1) : "error"

		if (!this.state.train1 || !this.state.train2) {
			return (
				<div className="Leaves"></div>
			);
		}

		const maxSpeed1 = this.state.train1.leaves ? 100 : 150;
		const maxSpeed2 = this.state.train2.leaves ? 100 : 150;


		return (
			<div className="Leaves">

				<div className="Info">

					<div className="Rails-Bg" style={{
						backgroundImage: `url(${RailsSideImg})`
					}}>

						<h3 className="Train-Startstation">Eindhoven</h3>
						<h3 className="Train-Endstation">Amsterdam</h3>

						<div className="Train-Progress" style={{
							backgroundImage: `url(${TrainImg})`,
							left: this.getDistancePosition(this.state.train1.distance) + '%',
						}}>
						</div>
						<div className="Train-Progress" style={{
							backgroundImage: `url(${TrainImg2})`,
							left: this.getDistancePosition(this.state.train2.distance) + '%',
						}}>
						</div>

						{this.state.train1.leaves && (
							<div className="Leaves-Progress" style={{
								backgroundImage: `url(${LeafImg})`,
								left: this.getDistancePosition(this.state.train1.leavesDistance) + '%',
							}}>
							</div>
						)}

						{this.state.train2.leaves && (
							<div className="Leaves-Progress" style={{
								backgroundImage: `url(${LeafImg})`,
								left: this.getDistancePosition(this.state.train2.leavesDistance) + '%',
							}}>
							</div>
						)}

					</div>

					<div className="SubInfo-Container">
						<div className="Sub-Info">
							<h2><span className="Train1-Color-Cirlce"></span> Train 1</h2>

							<h4>Speed: {trainSpeed1} km/h (Max: {maxSpeed1} km/h)</h4>
							<h4>Arrives <Moment fromNow>{this.getTimeToDest(this.state.train1.distance)}</Moment></h4>
							{this.state.train1.leaves && (
								<div className="Speed-Warning">
									<div className="Warning-Icon" style={{
										backgroundImage: `url(${LeafImg})`
									}}>

									</div>
									Leaves on the Rails
					</div>)}
						</div>

						<div className="Sub-Info">
							<h2><span className="Train2-Color-Cirlce"></span> Train 2</h2>

							<h4>Speed: {trainSpeed2} km/h (Max: {maxSpeed2} km/h)</h4>
							<h4>Arrives <Moment fromNow>{this.getTimeToDest(this.state.train2.distance)}</Moment></h4>

							{this.state.train2.leaves && (
								<div className="Speed-Warning">
									<div className="Warning-Icon" style={{
										backgroundImage: `url(${LeafImg})`
									}}>

									</div>
									Leaves on the Rails
					</div>)}
						</div>

					</div>

				</div>


			</div>
		)
	}
}

export default User;
