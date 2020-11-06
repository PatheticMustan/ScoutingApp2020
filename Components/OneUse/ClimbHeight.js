import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Pressable,
	Image
} from "react-native";

import { setKeyPair, setDefault, selectID } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";

import ScoutingColors from "../../Config/ScoutingColors";

export default function ClimbHeight(props) {
	const dispatch = useDispatch();

	// set default value
	dispatch(setDefault([props.id, 0]));
	// get value from store
	const selectedIndex = useSelector(selectID(props.id));

	const data = [
		["Low", require("../../Assets/EndLow.png")],
		["Leveled", require("../../Assets/EndLevel.png")],
		["High", require("../../Assets/EndHigh.png")]
	];

	return (
		<View style={{
			flex: 1,
			flexDirection: "row",
			justifyContent: "space-around"
		}}>
			{
				data.map((v, i) =>
					<Pressable
						key={data[i][0]}
						onPress={() => {
							dispatch(setKeyPair([props.id, i]));
						}}
					>
						<View style={[
							styles.container,
							{ backgroundColor: (selectedIndex === i ? props.bgc : ScoutingColors.white) }
						]}>
							<Image source={data[i][1]} style={styles.image} />
							<Text style={{ textAlign: "center" }}>{data[i][0]}</Text>
						</View>
					</Pressable>
				)
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		borderWidth: StyleSheet.hairlineWidth,
		flexDirection: "column",
		justifyContent: "center",
		margin: 10
	},
	image: {
		borderRadius: 10,
		height: 150,
		width: 280
	}
});