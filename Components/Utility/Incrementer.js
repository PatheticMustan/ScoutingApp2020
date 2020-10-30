import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Pressable
} from "react-native";

import { setKeyPair, setDefault, selectData } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesome } from "react-native-vector-icons";
import ScoutingColors from "../../Config/ScoutingColors.js";

export default function Incrementer(props) {
	const dispatch = useDispatch();

	// set default value
	dispatch(setDefault([props.id, 0]));
	// get value from store
	const kpv = useSelector(selectData);
	const value = kpv.find(v => v[0] === props.id)[1];

	return (
		<View style={styles.container}>
			<Pressable onPress={() => {
				// minimum value is 0
				if (value - 1 >= 0) {
					dispatch(setKeyPair([props.id, value - 1]));
				}
			}}>
				<View style={styles.iconContainer}>
					{ /** I'm so lonely */}
					<FontAwesome name="minus" size={30} color={ScoutingColors.skyBlue}/>
				</View>
			</Pressable>
			
			<Text style = {{fontSize: 30}}>{value}{props.max? `/${props.max}` : ""}</Text>

			<Pressable onPress={() => {
				// first make sure max value exists, then do comparison
				if (!props.max || value+1 <= props.max) {
					dispatch(setKeyPair([props.id, value + 1]));
				}
			}}>
				<View style = {styles.iconContainer}>
					<FontAwesome name="plus" size={30} color={ScoutingColors.skyBlue}/>
				</View>
			</Pressable>
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
