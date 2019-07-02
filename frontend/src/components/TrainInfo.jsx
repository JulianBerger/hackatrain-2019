import React from 'react'

const prefferedFontFamily = 'Futura,Trebuchet MS,Arial,sans-serif'

export const TrainInfo = (props) => {

		return (
		<div className={"traininfo"}>
			<div style={{ flex: "1" }}></div>
			{/* 
			</span> */}
			<div style={{ flex: "1",fontSize: "50px",
					fontFamily: prefferedFontFamily,
					textAlign:"center",
					color: "#666"}}>
					{props.trainSpeed}km/h
			</div>
			<div style={{ flex: "1" }}></div>
		</div>
	)
}