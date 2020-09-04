import React, { useState } from "react";
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

	return (
		<View style = {{flex: 1}}>
			<View style = {{flex: 1, alignSelf: "center", paddingBottom: 5}}>
				<Text>{(`${(seconds-(seconds%60))/60}:${((seconds % 60)+"").padStart(2, "0")}`)}</Text>
			</View>
				
			<BoolButton
				id="TimerClicked"
				bgc="lime"
				width={160}
				press={() => {
					if (!isEnabled) {
						setEnabled(true);
						
						// the only exception I'll make to "no globals"
						// we can probably assume we'll only ever need one timer
						// if we DO need more than one timer, I'm sure we can figure out a solution by then
						global.timerInterval = setInterval(async () => {
							await setSeconds(oldSeconds => oldSeconds + 1);
						}, 1000);
					} else {
						clearInterval(global.timerInterval);
						setEnabled(false);
						dispatch(setKeyPair(["Time", seconds]));
					}
				}}
			>
				<Text>{!isEnabled? "Start" : "Stop" } Stopwatch</Text>
			</BoolButton>
		</View>
	);
}