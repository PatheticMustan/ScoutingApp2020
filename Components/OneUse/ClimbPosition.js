import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Pressable,
	ImageBackground
} from "react-native";
import { setKeyPair, setDefault, selectID } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";
import ScoutingColors from "../../Config/ScoutingColors.js";

export default function ClimbPosition(props) {
	const dispatch = useDispatch();

	// set default value
	dispatch(setDefault([props.id, 0]));
	// get value from store
	const selectedIndex = useSelector(selectID(props.id));

	// all possible options.
	// [name, flexSpace]
	const data = [
		["Edge", 1.4],
		["Middle Bar", 0.8],
		["Center", 1.22]
	];

	return (
		<View>
			<ImageBackground source={require("../../Assets/ClimbPosition.png")} style={{ width: 600, height: 300 }}>
				<View style={styles.container}>
					{
						data.map((v, i) =>
							<View style={{ flex: data[i][1] }} key={"ClimbPositionView" + i}>
								<Pressable
									key={"ClimbPositionButton" + i}
									onPress={() => {
										const r = i;
										// dispatch to redux and set state
										dispatch(setKeyPair([props.id, r]));
									}}
								>
									<View style={{
										justifyContent: "center",
										borderRadius: 10,
										borderWidth: StyleSheet.hairlineWidth,
										margin: props.margin || 10,
										width: (props.width ? props.width : 100),
										height: 40,
										backgroundColor: (selectedIndex === i ? props.bgc : ScoutingColors.white)
									}}>
										<Text style={{ textAlign: "center" }}>{data[i][0]}</Text>
									</View>
								</Pressable>
							</View>
						)
					}
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		top: 230
	}
});