import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";

import { setKeyPair, setDefault, selectData } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";
import ScoutingColors from "../../Config/ScoutingColors.js";

export default function BoolButton(props) {
	const dispatch = useDispatch();

	// set default value
	dispatch(setDefault([props.id, false]));
	// get value from store
	const kpv = useSelector(selectData);
	const value = kpv.find(v => v[0] === props.id)[1];

	return (
		<TouchableWithoutFeedback onPress={() => {
			// if the press event exists, run it
			props.press && props.press();
			dispatch(setKeyPair([props.id, !value]));
		}}>
			<View style = {[
				styles.boolButtonContainer,
				{
					width: (props.width || 100),
					backgroundColor: (value? props.bgc : ScoutingColors.white)
				}
			]}>
				<Text style={styles.textCenter}>{props.children}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}

BoolButton.propTypes = {
	id: PropTypes.string.isRequired,
	press: PropTypes.func,
	width: PropTypes.number,
	bgc: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

const styles = new StyleSheet.create({
	boolButtonContainer: {
		justifyContent: "center",
		borderRadius: 10,
		borderWidth: StyleSheet.hairlineWidth,
		margin: 10,
		height: 40,
	},
	textCenter: {textAlign: "center"}
});