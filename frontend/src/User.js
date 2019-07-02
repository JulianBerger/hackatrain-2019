import React from 'react';
import './User.css';

import { Train } from './components/Train'
import { TrainInfo } from './components/TrainInfo'
import LeafImg from './assets/leaf.png'
import RailsSideImg from './assets/rails-side.svg'
import TrainImg from './assets/train2.png'

import MQTTManager from './utils/MQTTManager'
import Moment from 'react-moment';

class Leaves extends React.Component {

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

	getDistancePosition() {
		let left = 0;

		if (this.state.distance <= 0) {
			return 0;
		}
		else if (this.state.distance >= this.maxDist) {
			return 100;
		}

		left = this.state.distance / this.maxDist;


		return left * 100;
	}

	getTimeToDest() {
		let percentage = 0;

		if (this.state.distance <= 0) {
			percentage = 0;
		}
		else if (this.state.distance >= this.maxDist) {
			percentage = 0.99;
		} else {

			percentage = this.state.distance / this.maxDist;

		}
		const mins = parseInt(this.rideTimeMin - (percentage * this.rideTimeMin));
		const dt = new Date();
		// console.log('mins', percentage, mins);


		return new Date(dt.getTime() + mins * 60000);

	}

	render() {
		return (
			<div className="User">

				<div className="Info">
					<h2 className="Info-Ride">Welcome to the Autonomous Train to Amsterdam 🙋‍</h2>
					<h4>You will arrive <Moment fromNow>{this.getTimeToDest()}</Moment></h4>

					<div className="Rails-Bg" style={{
						backgroundImage: `url(${RailsSideImg})`
					}}>

						<h3 className="Train-Startstation">Eindhoven</h3>
						<h3 className="Train-Endstation">Amsterdam</h3>

						<div className="Train-Progress" style={{
							backgroundImage: `url(${TrainImg})`,
							left: this.getDistancePosition() + '%',
						}}>
						</div>
					</div>

					<div className="Sub-Info">
					<h4>Tuesday, 2. July, 21° C 🌤</h4>

						<h4>Speed: {this.state.speed.toString()} km/h</h4>

						{this.state.leaves && (
							<div className="Speed-Warning">
								<div className="Warning-Icon" style={{
									backgroundImage: `url(${LeafImg})`
								}}>

								</div>
								The train slowed down because it detected Leaves on the Rails...
					</div>)}
					</div>
				</div>


			</div>
		)
	}
}

export default Leaves;
