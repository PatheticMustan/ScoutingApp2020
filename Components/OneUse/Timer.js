import React, { useState, useEffect } from "react";
import {
	View,
	Text
} from "react-native";
import BoolButton from "../Buttons/BoolButton.js";

import { setKeyPair, setDefault } from "../../Redux/Features/dataSlice.js";
import { useDispatch } from "react-redux";

export default function Timer() {
	const dispatch = useDispatch();
	const [isEnabled, setEnabled] = useState(false);
	const [seconds, setSeconds] = useState(0);

	dispatch(setDefault(["Time", 0]));
		
	useEffect(() => {
		const timerInterval = setInterval(() => {
			if (isEnabled) setSeconds(oldSeconds => oldSeconds + 1);
		}, 1000);

		// callback when isEnabled ends
		return () => {
			clearInterval(timerInterval);
			dispatch(setKeyPair(["Time", seconds]));
		};

		// run when isEnabled updates
	}, [isEnabled]);

	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1, alignSelf: "center", paddingBottom: 5 }}>
				<Text>{(`${(seconds - (seconds % 60)) / 60}:${((seconds % 60) + "").padStart(2, "0")}`)}</Text>
			</View>

			<BoolButton
				id="TimerClicked"
				bgc="lime"
				width={160}
				press={() => setEnabled(v => !v)}
			>
				<Text>{!isEnabled ? "Start" : "Stop"} Stopwatch</Text>
			</BoolButton>
		</View>
	);
}