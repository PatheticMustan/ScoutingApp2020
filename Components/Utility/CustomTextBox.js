import React, { useState, useEffect } from "react";
import {
	View,
	TextInput,
	StyleSheet
} from "react-native";

import { setKeyPair, setDefault, selectData } from "../../Redux/Features/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";

import ScoutingColors from "../../Config/ScoutingColors";

export default function CustomTextBox(props) {
	const dispatch = useDispatch();

	const [text, setText] = props.isNumber ? useState(0) : useState("");
	// Fixes issue #36
	// https://github.com/PatheticMustan/ScoutingApp2019/issues/36#issuecomment-667728272
	const [watchdog, bark] = props.isNumber ? useState(0) : useState("");

	// set default value
	dispatch(setDefault([props.id, ""]));

	// get value from store
	const kpv = useSelector(selectData);
	const reduxText = kpv.find(v => v[0] === props.id)[1];

	useEffect(() => {
		const interval = setInterval(() => {
			/** #36 and solution:
			 * CONTEXT:
			 * every second, we want to check if the user typed.
			 * if they DID type, text should be different. We can check with (text !== reduxText)
			 * 
			 * PROBLEM:
			 * now the problem is we can't update text with reduxText, since it thinks the user typed.
			 * 
			 * SOLUTION:
			 * A way to fix this is to have a different state (watchdog) tracking specifically if reduxText changed.
			 * reduxText only updates when the textbox updates it, or during loadMatch!
			 * watchdog only updates when the textbox updates it.
			 * So we can kinda subtract the two. Now, we can check if loadMatch happened!
			 * We can check this with (watchdog !== reduxText)
			 **/

			if (watchdog !== reduxText) {
				setText(reduxText);

				// Prevents rubber banding (issue #2)
				bark(text);
			} else {
				if (reduxText !== text) {
					// Ternaries so that if the value inside incrementer input fields is completely deleted, it is stored as 0
					text === "" ? bark(0) : bark(text);
					text === "" ? dispatch(setKeyPair([props.id, 0])) : dispatch(setKeyPair([props.id, text]));
				}
			}
		}, 500);

		// basically componentWillUnmount but this time it's for React hooks
		return () => clearInterval(interval);
	}, [reduxText, text]);

	return (
		<View style={{
			width: props.width,
			height: props.height || 40,
		}}>
			<TextInput
				keyboardType={props.keyboardType}
				multiline={props.multi}
				numberOfLines={props.multi ? props.lines : 1}
				editable
				placeholder={props.placeholder || ""}
				value={text}
				style={{
					flex: 1,
					padding: props.padding != null ? props.padding : 10,
					paddingLeft: props.max == null && props.isNumber ? 10 : 7,
					backgroundColor: (props.backgroundColor ? props.backgroundColor : ScoutingColors.white),
					borderColor: ScoutingColors.doveGray,
					borderWidth: StyleSheet.hairlineWidth,
					borderRadius: (props.borderRadius ? props.borderRadius : props.height / 5),
					fontSize: props.fontSize
				}}
				{...props.options}
				onChangeText={newText =>
					props.isNumber && newText !== ""
						? !isNaN(parseInt(newText)) ? setText(parseInt(newText)) : setText(text)
						: setText(newText)
				}
			/>
		</View>
	);
}