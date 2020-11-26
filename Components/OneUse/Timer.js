import React, { useState, useEffect } from "react";
import {
	View,
	Text
} from "react-native";
import BoolButton from "../Buttons/BoolButton.js";

import { setKeyPair, setDefault, selectID } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function Timer(props) {
	const dispatch = useDispatch();

	dispatch(setDefault([props.id, 0]));

	const reduxTime = useSelector(selectID(props.id));

	const [isEnabled, setEnabled] = useState(false);
	const [seconds, setSeconds] = useState(reduxTime);

	
		
	useEffect(() => {
		const timerInterval = setInterval(() => {
			alert(2);
			if (isEnabled) setSeconds(oldSeconds => oldSeconds + 1);
		}, 1000);

		// callback when isEnabled ends
		return () => {
			alert(1);
			clearInterval(timerInterval);
			dispatch(setKeyPair([props.id, seconds]));
		};

		// run when isEnabled updates
	}, [isEnabled]);

	return (
		<View style={{ flex: 1, alignItems: "center" }}>
			<Text style={{ fontSize: 20, fontWeight: "bold" }}>Stopwatch</Text>

			<Text>{(`${(seconds - (seconds % 60)) / 60}:${((seconds % 60) + "").padStart(2, "0")}`)}</Text>
			
			<BoolButton id="TimerClicked" bgc="lime" width={160} press={() => setEnabled(v => !v)}>
				<Text>{!isEnabled ? "Start" : "Stop"} Stopwatch</Text>
			</BoolButton>
		</View>
	);
}