import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";

import { setKeyPair, setDefault, selectData } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesome } from "react-native-vector-icons";
import ScoutingColors from "../../Config/ScoutingColors.js";

import CustomTextBox from "./CustomTextBox";

export default function Incrementer(props) {
	const dispatch = useDispatch();

	// set default value
	dispatch(setDefault([props.id, 0]));

	// get value from store
	const kpv = useSelector(selectData);
	const value = parseInt(kpv.find(v => v[0] === props.id)[1]);

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => {
				// minimum value is 0
				if (value - 1 >= 0) {
					dispatch(setKeyPair([props.id, value - 1]));
				}
			}}>
				<View style={styles.iconContainer}>
					{ /** I'm so lonely */}
					<FontAwesome name="minus" size={30} color={ScoutingColors.skyBlue} />
				</View>
			</TouchableOpacity>

			{props.max == null
				// Match Number
				? <CustomTextBox max={props.max} borderRadius={10} padding={0} fontSize={30} margin={0} isNumber={true} id={props.id} keyboardType="number-pad" width={55} />
				// Starting Game Pieces
				: <Text style={{ fontSize: 30 }}>{props.max ? `${value}/${props.max}` : value + ""}</Text>
			}

			<TouchableOpacity onPress={() => {
				// first make sure max value exists, then do comparison
				if (!props.max || value + 1 <= props.max) {
					dispatch(setKeyPair([props.id, value + 1]));
				}
			}}>
				<View style={styles.iconContainer}>
					<FontAwesome name="plus" size={30} color={ScoutingColors.skyBlue} />
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: ScoutingColors.white,
		flex: 1,
		flexDirection: "row"
	},
	iconContainer: {
		padding: 5
	}
});
