import React from "react";
import {
	View,
	ScrollView
} from "react-native";

import Header from "./ScoutComponents/Header.js";
import MatchInfoContainer from "./ScoutComponents/MatchInfoContainer.js";
import Autonomous from "./ScoutComponents/Autonomous.js";
import TeleOp from "./ScoutComponents/TeleOp.js";
import Endgame from "./ScoutComponents/EndGame.js";
import Other from "./ScoutComponents/Other.js";

/** Test Components */

export default function Scout() {
	return (
		// Both views need flex to make scrollbar work???
		<View style={{ flex: 1 }}>
			<Header />
			<View style={{ flex: 1 }}>
				<ScrollView>
					<MatchInfoContainer />
					<Autonomous />
					<TeleOp />
					<Endgame />
					<Other />
				</ScrollView>
			</View>
		</View>
	);
}