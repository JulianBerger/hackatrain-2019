import React from 'react';
import './App.css';

import { Train } from './components/Train'
import { TrainInfo } from './components/TrainInfo'

import MQTTManager from './utils/MQTTManager'

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			train1: undefined,
			train2: undefined
		}
	}

	start(){
		setInterval(async () => {
			try {
				const res = await MQTTManager.pull()
				this.setState({ train1: res.data.trains[0], train2: res.data.trains[1] })
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
			}}>
				<div className="App" style={{ flex: "2" }}>
					<Train bg={"#3A9FD8"} />
					<Train bg={"#fdd835"} />
				</div>
				<div style={{
					flex: "1",
					background: "#2483B8",
					display: "flex",
					width: "300px",
					flexDirection: "column"
				}}>
					<TrainInfo trainSpeed={parseFloat(trainSpeed1).toFixed(1)} />
					<TrainInfo trainSpeed={parseFloat(trainSpeed2).toFixed(1)} />
				</div>
			</div>
		)
	}
}

export default App;
