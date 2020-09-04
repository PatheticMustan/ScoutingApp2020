import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Alert,
	AsyncStorage
} from "react-native";

import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

import RadioButton from "../../Components/Buttons/RadioButton.js";
import Link from "../../Components/Utility/Link.js";

import { useDispatch, useSelector } from "react-redux";
import { setDefault, freshStart, selectData } from "../../Redux/Features/dataSlice.js";
import { writeMatch  } from "../../Redux/Features/matchSlice.js";
import kpvToCsv from "../../Config/kpvToCsv.js";



export default function Header() {
	const dispatch = useDispatch();
	const arenaID = "Team";

	// set default value
	dispatch(setDefault([arenaID, 0]));
	// since this isn't an input, no need to set default.
	// get value from store
	const kpv = useSelector(selectData);
	const selectedTeam = kpv.find(v => v[0] === arenaID)[1];

	function reset() {
		// alert("Everyone needs a fresh start. Why not now?");
		// dispatch(freshStart());
		Alert.alert(
			"Reset",
			"Are you sure you want to reset the Scoutsheet?",
			[
				{text: "Reset", onPress: () => dispatch(freshStart())},
				{text: "Cancel", style: "cancel"}
			]
		);
	}
	
	async function save(successCallback=()=>{}) {
		// fun fact, kpv is short for KeyPairValue, because it's filled with [key, value]
		// matchKey is a unique identifier for a match. Right now I could have Team
		const matchKey = ["Team", "TeamNumber", "MatchNumber", "MatchType", "Scouters"]
			.map(k => [k, kpv.find(v => v[0] === k)[1]]); // "Team" --> ["Team", value]
			
		// if a single one of them is ""...
		if (matchKey.some(v => v[1] === "")) {
			// find em
			// ["Team", value] --> "Team"
			const blank = matchKey
				.filter(v => v[1] === "")
				.map(v => v[0]);

			// formatting
			// prepend "and " to last item
			// 1, 2, 3, 4, and 5 are blank
			if (blank.length > 1) { blank[blank.length-1] = "and " + blank[blank.length-1]; }

			alert(`${blank.join(", ")} is blank!`);
			// stop save()'ing
			return;
		}
			
		const final = [matchKey.join(""), kpv];

		// get matches OR default []
		const matches = JSON.parse(await AsyncStorage.getItem("matches")) || [];
		// make sure the item actually exists, then check against matchKey
		const mki = matches.findIndex(v => v && (v[0] === final[0]));

		const saveMatch = () => {
			// put all our matches back in a place where it'll be safe and sound <3
			AsyncStorage.setItem("matches", JSON.stringify(matches));
			// now update matches in redux
			dispatch(writeMatch(final));
			// "hey you saved a match lmao"
			alert("Saved Match #" + kpv.find(v => v[0] === "MatchNumber")[1]);

			// now we're finished
			successCallback(final);
		};
			
		// add our lovely changes
		if (mki === -1) {
			// if the match key is not found
			// push
			matches.push(final);
			saveMatch();
		} else {
			// if the match key IS found
			// overwrite
			Alert.alert(
				"Overwrite",
				"A match already exists with this match key. Are you sure you want to overwrite it?",
				[
					{text: "Overwrite", onPress: () => {
						matches[mki] = final;
						saveMatch();
					}},
					{text: "Cancel", style: "cancel"}
				]
			);
		}
	}
	
	async function saveAndExport() {
		save(final => {
			if (final === undefined) return;
			
			console.log("REMINDER: Sharing doesn't work on web!");
			const path = "./data.csv";

			const output = kpvToCsv([final]);
			console.log(output);
	
			FileSystem.writeAsStringAsync(FileSystem.documentDirectory+path, output, { encoding: FileSystem.EncodingType.UTF8 });
			// share the new csv file we just made
			Sharing.shareAsync(FileSystem.documentDirectory+path);
		});
		
	}

	return (
		<View style={{backgroundColor: selectedTeam==1? "#FFD0D0" : "#D0F4FF", flex: 1}}>
			<Text style={styles.headerText}>2020 - Infinite Recharge{"\n"}</Text>
			<View style={styles.linkContainer}>
				<Link color="red" onPress={() => reset()}>Reset</Link>

				<Link></Link>
				
				<RadioButton
					id="Team"
					data={["Blue Alliance", "Red Alliance"]}
					bgc="orange"
					segmentedButton
					forceOption
					options={{
						flexDirection: "row",
					}}
				/>
					
				<Link color="blue" onPress={() => save()}>Save</Link>

				<Link color="blue" onPress={() => saveAndExport()}>Save and Export</Link>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
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