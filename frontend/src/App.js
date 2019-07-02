import React from 'react';
import './App.css';

import { Train } from './components/Train'
import { TrainInfo } from './components/TrainInfo'
import Leaves from './Leaves';

import MQTTManager from './utils/MQTTManager'

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			train1: undefined,
			train2: undefined
		}
	}

	start() {
		setInterval(async () => {
			try {
				const res = await MQTTManager.pull()
				this.setState({ train2: res.data.trains[0], })
				let train1 = Object.assign({}, res.data.trains[0]);
				train1.distance = res.data.trains[0].distance + 2000;
				this.setState({ train1: train1 })


			} catch (e) {
				console.log("res")
			}

		}, 100)
	}

	async componentDidMount() {
		this.start()
		console.log(process.env.REACT_APP_DEV_API_KEY)
	}

	render() {

		const trainSpeed1 = this.state.train1 ? this.state.train1.trainSpeed : "error"
		const trainSpeed2 = this.state.train2 ? this.state.train2.trainSpeed : "error"
		return (
			<div style={{
				display: "flex",
				flexDirection: "column"
			}}>
				<div className="App">
				<div style={{
						display: "flex",
						flexDirection: "row"
					}}>

						<Train />

						<div style={{
							flex: "1",
							display: "flex",
							width: "300px",
							flexDirection: "column"
						}}>						<TrainInfo trainSpeed={parseFloat(trainSpeed1).toFixed(1)} />

						</div>
					</div>

					<div style={{
						display: "flex",
						flexDirection: "row"
					}}>

						<Train greenTrain={true} />

						<div style={{
							flex: "1",
							display: "flex",
							width: "300px",
							flexDirection: "column"
						}}>						<TrainInfo trainSpeed={parseFloat(trainSpeed2).toFixed(1)} />

						</div>
					</div>
				</div>


				<Leaves></Leaves>

			</div>
		)
	}
}

export default App;
