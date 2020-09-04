import { createSlice } from "@reduxjs/toolkit";

export const matchSlice = createSlice({
	name: "matchSlice",
	initialState: {
		matches: [],
	},
	reducers: {
		writeMatch: (state, action) => {
			// action is in format
			// [key, payload]
			// Tracer: ESCOURT THE PAYLOAD!

			const [key, kpv] = action.payload;

			if (!(typeof key === "string"))        console.log("WARNING! Expected key to be string.");
			if (!(kpv instanceof Array))             console.log("WARNING! Expected match to be array.");
			if (!kpv.every(v => v instanceof Array)) console.log("WARNING! Expected each item to be an array.");

			const mki = state.matches.findIndex(v => v && (v[0] === key));

			if (mki === -1) {
				// if the match key is not found
				// push
				state.matches.push(action.payload);
			} else {
				// if the match key IS found
				// overwrite
				// TODO: Prompt for confirmation of overwrite, not adding it now since I'm testing
				state.matches[mki] = action.payload;
			}
		},

		importMatches: (state, action) => {
			// should only be used when the app starts
			console.log("MATCHES HAVE BEEN IMPORTED!!!");
			// import that bad boy
			state.matches = action.payload;
		},

		resetMatches: (state) => {
			state.matches = [];
		}
	},
});

// dispatch(writeMatch(kpv))

export const { writeMatch, importMatches, resetMatches } = matchSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectData = state => state.matches.matches;

export default matchSlice.reducer;
