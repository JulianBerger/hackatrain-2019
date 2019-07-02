import React from 'react'
import TrainImage from '../assets/train2.png'
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
			<div style={{ position: "absolute", top: "15px", right: "15px", height: '130px', width: '200px' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: process.env.REACT_APP_DEV_API_KEY }}
					defaultCenter={defaultProps.center}
					defaultZoom={defaultProps.zoom}
				>
					<AnyReactComponent
						lat={59.955413}
						lng={30.337844}
						text="My Marker"
					/>
				</GoogleMapReact>
			</div>
			<div
				className={"train"}
				style={{
					backgroundImage: `url(${TrainImage})`
				}}
			/>
		</div>
	)
}