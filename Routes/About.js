import React from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	Image
} from "react-native";
import Header from "./AboutComponents/Header";

export default function About() {
	const title = input => <Text style={styles.title}>{input}</Text>;
	const text = input => <Text style={styles.text}>{input}</Text>;
	const person = (title, name) => <Text style={styles.text}><Text style={styles.underline}>{title}</Text> {name}</Text>;
	const spacer = <Text>{"\n\n"}</Text>;

	return (
		<View style={styles.flex}>
			<View style={{flex: 1}}>
				<Header/>
			</View>
			
			<View style={{flex: 7}}>
				<ScrollView>
					<View style={styles.credits}>
						<Image
							source={require("../Assets/appicon.png")}
							style={styles.image}
						/>

						{title("2638 Scout")}
						{text("Version 3.0 3/6/2020")}

						{spacer}
							
						{title("UI Design and Concept by")}
						{person("App Designer", "Reid Fleishman")}

						{spacer}

						{title("App Development Team (React Native)")}
						{person("Developer", "Kevin Wang")}
						{person("Developer", "Eric Yachabes")}
						{person("Developer", "Aidan Din")}

						{spacer}

						{title("Tools Used")}
						{text("React Native")}
						{text("Expo")}
						{text("VSCode")}

						{spacer}

						{title("Special Thanks To")}
						{text("John Motchkavitz")}
						{text("Matthew Corrigan")}
						{text("Andrea Zinn")}
						{text(<Text style={styles.italic}>And all of our amazing mentors!</Text>)}

						{spacer}
							
						{text("Questions or Comments? Please email reidfleishman5@gmail.com")}

						{title("© 2020 Rebel Robotics")}
						{title("gnsrobotics.com")}
					</View>
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	credits: {
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 50
	},
	flex: {flex: 1},
	image: {
		borderRadius: 10,
		height: 350,
		margin: 10,
		width: 350
	},
	italic: {fontStyle: "italic"},
	text: {fontSize: 16},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		textDecorationLine: "underline"
	},
	underline: {
		fontSize: 16,
		textDecorationLine: "underline"
	}
});
