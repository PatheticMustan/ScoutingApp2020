import React from "react";
import {
	View,
	ImageBackground
} from "react-native";

import { selectData, setDefault } from "../../Redux/Features/dataSlice.js";
import { useSelector, useDispatch } from "react-redux";

export default function Arena(props) {
	const dispatch = useDispatch();
	const arenaID = "Team";

	// set default value
	dispatch(setDefault([arenaID, 0]));
	// since this isn't an input, no need to set default.
	// get value from store
	const kpv = useSelector(selectData);
	const selectedTeam = kpv.find(v => v[0] === arenaID)[1];

	return (
		<View>
			<ImageBackground
				source={require("../../Assets/2020Field.png")}
				style={{
					flexDirection: selectedTeam==0? "row" : "row-reverse",
					height: 453,
					marginTop: 20,
					width: 900
				}}
				imageStyle={{borderRadius: 10}}
			>
				{props.children}
			</ImageBackground>
		</View>
	);
}
