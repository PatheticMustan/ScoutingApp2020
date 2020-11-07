import React from "react";
import {
	StyleSheet,
	Text,
	View
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Sharing from "expo-sharing";
import Link from "../../Components/Utility/Link.js";

import kpvToCsv from "../../Config/kpvToCsv.js";

import { useDispatch, useSelector } from "react-redux";
import { setDefault, selectID } from "../../Redux/Features/dataSlice.js";

import { selectMatches } from "../../Redux/Features/matchSlice.js";

import { resetMatches } from "../../Redux/Features/matchSlice.js";
import { FileSystem } from "react-native-unimodules";
import ScoutingColors from "../../Config/ScoutingColors.js";

export default function Header() {
	const dispatch = useDispatch();
	const arenaID = "Team";

	const matches = useSelector(selectMatches);

	// set default value
	dispatch(setDefault([arenaID, 0]));
	// since this isn't an input, no need to set default.
	// get value from store
	const selectedTeam = useSelector(selectID(arenaID));

	const clickResetMatches = () => {
		AsyncStorage.removeItem("matches");

		dispatch(resetMatches());

		// TODO: Add confirmation
		alert("Cleared all the matches!");
	};

	const clickExportAllMatches = () => {
		// sharing doesn't work on web.
		console.log("REMINDER: Sharing doesn't work on web!");
		const path = "./data.csv";

		// write new csv file
		console.log(matches);
		const output = kpvToCsv(matches);
		console.log(output);

		FileSystem.writeAsStringAsync(FileSystem.documentDirectory + path, output, { encoding: FileSystem.EncodingType.UTF8 });
		// share the new csv file we just made
		Sharing.shareAsync(FileSystem.documentDirectory + path);
	};

	return (
		<View style={[
			styles.flex,
			{ backgroundColor: selectedTeam == 1 ? ScoutingColors.red : ScoutingColors.lightBlue }
		]}>
			<Text style={styles.headerText}>2020 - Infinite Recharge{"\n"}</Text>

			<View style={styles.linkContainer}>
				<Link color="red" onPress={clickResetMatches}>Reset All Matches</Link>

				<Link color="blue" onPress={clickExportAllMatches}>Export All Matches</Link>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	flex: { flex: 1 },
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