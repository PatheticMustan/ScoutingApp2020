import React from "react";
import {
	StyleSheet,
	Text,
	View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { setDefault, selectData } from "../../Redux/Features/dataSlice.js";
import Link from "../../Components/Utility/Link.js";
import ScoutingColors from "../../Config/ScoutingColors.js";

export default function Header() {
	const dispatch = useDispatch();
	const arenaID = "Team";

	// set default value
	dispatch(setDefault([arenaID, 0]));
	// since this isn't an input, no need to set default.
	// get value from store
	const kpv = useSelector(selectData);
	const selectedTeam = kpv.find(v => v[0] === arenaID)[1];

	return (
		<View style={[
			styles.flex,
			{backgroundColor: selectedTeam==1? ScoutingColors.red : ScoutingColors.lightBlue}
		]}>
			<Text style={styles.headerText}>2020 - Infinite Recharge{"\n"}</Text>
			
			<View style={styles.linkContainer}>
				<Link>About</Link>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	flex: {flex: 1},
	headerText: {
		flex: 1,
		fontSize: 20,
		paddingTop: 10,
		textAlign: "center"
	},
	linkContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 30,
		paddingBottom: 15,
		paddingTop: 10
	}
});