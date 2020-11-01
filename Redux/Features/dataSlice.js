import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
	name: "dataSlice",
	initialState: {
		keyPairValues: [],
	},
	reducers: {
		setKeyPair: (state, action) => {
			// so many annoying checks
			if (!(action.payload instanceof Array))		console.log("WARNING! Expected key-value array");
			if (typeof action.payload[0] !== "string")	console.log("WARNING! Expected key to be string.");
			if (action.payload.length !== 2)			console.log("WARNING! Expected key-value array to have two items.");

			// key-values are stored in the format [key, value]
			const key = action.payload[0];
			const value = action.payload[1];

			const payloadIndex = state.keyPairValues.findIndex(v => v[0] === key);

			// if the key isn't in the state yet...
			if (payloadIndex === -1) {
				// push it real good
				state.keyPairValues.push([key, value]);
			} else {
				// otherwise, just modify the value of the existing key
				state.keyPairValues[payloadIndex][1] = value;
			}
		},

		setDefault: (state, action) => {
			if (!(action.payload instanceof Array))		console.log("WARNING! Expected key-value array");
			if (typeof action.payload[0] !== "string")	console.log("WARNING! Expected key to be string.");
			if (action.payload.length !== 2)			console.log("WARNING! Expected key-value array to have two items.");

			const key = action.payload[0];
			const value = action.payload[1];

			const payloadIndex = state.keyPairValues.findIndex(v => v[0] === key);

			if (payloadIndex === -1) state.keyPairValues.push([key, value]);
		},

		loadMatch: (state, action) => {
			// should only be used when clicking on a match in Past Matches
			console.log("A match has been loaded.");
			// import that bad boy
			state.keyPairValues = action.payload;
		},

		freshStart: (state) => {
			/**
			 * wipe the slate clean
			 * commit magnet on hard-drive
			 * 
			 * if you have spotify:
			 * Amnesia, by 5 Seconds of Summer: https://open.spotify.com/track/1JCCdiru7fhstOIF4N7WJC
			 * 
			 * "I wish that I could wake up with Amnesia"
			 * Well loverboy, today's your lucky day
			 **/

			// if you couldn't tell, this erases everything but info

			state.keyPairValues = state.keyPairValues.filter(v =>
				// whitelist vals not to remove
				["Team", "TeamNumber", "MatchNumber", "MatchType", "Scouters", "StartingPieces"].includes(v[0])
			);
		}
	},
});

export const { setKeyPair, setDefault, loadMatch, freshStart } = dataSlice.actions;
window.skp = dataSlice.actions.setKeyPair;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectData = state => state.data.keyPairValues;

export default dataSlice.reducer;
