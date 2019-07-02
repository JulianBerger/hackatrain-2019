import React from 'react'

const prefferedFontFamily = 'Futura,Trebuchet MS,Arial,sans-serif'

export const TrainInfo = (props) => {

		return (
		<div className={"traininfo"}>
			<div style={{ flex: "1" }}></div>
			{/* 
			</span> */}
			<div style={{ flex: "1",fontSize: "24px",
					fontFamily: prefferedFontFamily,
					textAlign:"center",
					padding: "20px",
					color: "#666"}}>
					{props.trainSpeed}km/h
			</div>
			<div style={{ flex: "1" }}></div>
		</div>
	)
}