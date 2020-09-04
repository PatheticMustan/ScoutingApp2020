import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Image
} from "react-native";

import { setKeyPair, setDefault, selectData } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function ClimbHeight(props) {
	const dispatch = useDispatch();
	
	// set default value
	dispatch(setDefault([props.id, 0]));
	// get value from store
	const kpv = useSelector(selectData);
	const selectedIndex = kpv.find(v => v[0] === props.id)[1];

	const data = [
		["Low",     require("../../Assets/EndLow.png")],
		["Leveled", require("../../Assets/EndLevel.png")],
		["High",    require("../../Assets/EndHigh.png")]
	];

	return (
		<View style={{
			flex: 1,
			flexDirection: "row",
			justifyContent: "space-around"
		}}>
			{
				data.map((v, i) => 
					<TouchableWithoutFeedback
						key={data[i][0]}
						onPress={() => {
							dispatch(setKeyPair([props.id, i]));
						}}
					>
						<View style={[
							styles.container,
							{backgroundColor: (selectedIndex === i? props.bgc : "white")}
						]}>
							<Image source={data[i][1]} style={styles.image} />
							<Text style={{textAlign: "center"}}>{data[i][0]}</Text>
						</View>
					</TouchableWithoutFeedback>
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