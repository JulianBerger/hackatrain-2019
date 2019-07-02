import React from 'react'
import TrainImage from '../assets/train2.png'
import TrainImage2 from '../assets/train3.png'

import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const defaultProps = {
	center: {
		lat: 59.95,
		lng: 30.33
	},
	zoom: 11
}

export const Train = (props) => {

	return (
		<div style={{
			backgroundColor: props.bg,
			display: "flex",
			flex: "1",
			position: "relative"
		}}>
			<div
				className={"train"}
				style={{
					backgroundImage: `url(${props.greenTrain ? TrainImage2 : TrainImage})`
				}}
			/>
		</div>
	)
}