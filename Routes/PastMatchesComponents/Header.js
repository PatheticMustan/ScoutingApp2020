import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Platform
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Sharing from "expo-sharing";
import Link from "../../Components/Utility/Link.js";

import kpvToCsv from "../../Config/kpvToCsv.js";

import { useDispatch, useSelector } from "react-redux";
import { setDefault, selectData } from "../../Redux/Features/dataSlice.js";

import { selectData as matchSelectData } from "../../Redux/Features/matchSlice.js";

import { resetMatches } from "../../Redux/Features/matchSlice.js";
import { FileSystem } from "react-native-unimodules";
import ScoutingColors from "../../Config/ScoutingColors.js";

export default function Header() {
	const dispatch = useDispatch();
	const arenaID = "Team";

	const matches = useSelector(matchSelectData);

	// set default value
	dispatch(setDefault([arenaID, 0]));
	// since this isn't an input, no need to set default.
	// get value from store
	const kpv = useSelector(selectData);
	const selectedTeam = kpv.find(v => v[0] === arenaID)[1];

	const clickResetMatches = () => {
		AsyncStorage.removeItem("matches");

		dispatch(resetMatches());

		// TODO: Add confirmation
		alert("Cleared all the matches!");
	};

	const clickExportAllMatches = () => {
		// write new csv file
		console.log(matches);
		const output = kpvToCsv(matches);
		console.log(output);

		Platform.OS == "web"
			? webExport(output, "data.csv")
			: mobileExport(output);
	};


	function webExport(content, fileName) {
		console.log("NAY");
		let a = document.createElement("a"); 
		let mimeType = "text/csv;encoding:utf-8";

		// Thanks, stackoverflow
		if (URL && "download" in a) {
			a.href = URL.createObjectURL(new Blob([content], {
				type: mimeType
			}));
			a.setAttribute("download", fileName);
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		} else {
			location.href = "data:application/octet-stream," + encodeURIComponent(content);
		}
	}

	function mobileExport(output) {
		console.log("YAY");
		const path = "./data.csv";

		FileSystem.writeAsStringAsync(FileSystem.documentDirectory + path, output, { encoding: FileSystem.EncodingType.UTF8 });
		// share the new csv file we just made
		Sharing.shareAsync(FileSystem.documentDirectory + path);
	}

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