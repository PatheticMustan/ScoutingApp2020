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

	const [intervalID, setIntervalID] = useState(0);
	const [seconds, setSeconds] = useState(reduxTime);

	const handleTimerClick = () => {
		// if the interval ID is non-zero, we have to stop the timer.
		if (intervalID) {
			clearInterval(intervalID);
			setIntervalID(0);
			dispatch(setKeyPair([props.id, seconds]));
		} else {
			setIntervalID(setInterval(() => {
				setSeconds(s => s + 1);
			}, 1000));
		}
	};
		
	useEffect(() => {
		alert(1);

		// callback when isEnabled ends
		return () => {
			if (intervalID) clearInterval(intervalID);
			dispatch(setKeyPair([props.id, seconds]));
		};

		// run when isEnabled updates
	}, [intervalID]);

	return (
		<View style={{ flex: 1, alignItems: "center" }}>
			<Text style={{ fontSize: 20, fontWeight: "bold" }}>Stopwatch</Text>

			<Text>{(`${Math.floor(seconds / 60)}:${((seconds % 60) + "").padStart(2, "0")}`)}</Text>
			
			<BoolButton id="TimerClicked" bgc="lime" width={160} press={() => handleTimerClick()}>
				<Text>{!intervalID ? "Start" : "Stop"} Stopwatch</Text>
			</BoolButton>
		</View>
	);
}