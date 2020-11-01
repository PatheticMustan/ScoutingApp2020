// as the name suggests, kpvToCsv takes the important parts of the kpv, and converts it into a neat csv.

// matches: KPV[]
export default function kpvToCsv(matches) {
	const find = (kpv, id) => {
		const val = kpv.find(v => v[0] === id);

		if (val === undefined) throw new Error(`Cannot find value ${id} in kpv.`);
		return val[1];
	};

	// the holy grail contains all the data for converting the kpv's to one giant csv file
	const theHolyGrail = [{
		name: "Team Number",
		vf: kpv => find(kpv, "TeamNumber")
	}, {
		name: "Match Number",
		vf: kpv => find(kpv, "MatchNumber")
	}, {
		name: "Fits Under Trench?",
		vf: kpv => find(kpv, "FitsUnderTrench") ? "Yes" : "No"
	}, {
		name: "Plays Defense?",
		vf: kpv => find(kpv, "PlaysDefense") ? "Yes" : "No"
	}, {
		name: "Penalties",
		vf: kpv => {
			const red = find(kpv, "RedCard");
			const yellow = find(kpv, "YellowCard");

			if (red && yellow)  return "Red and Yellow";
			if (red)            return "Red";
			if (yellow)         return "Yellow";

			return "None";
		}
	}, {
		name: "Starting Pieces",
		vf: kpv => find(kpv, "StartingPieces")
	}, {
		name: "Line Position",
		vf: kpv => find(kpv, "LinePosition")
	}, {
		name: "Crosses Initiation Line?",
		vf: kpv => find(kpv, "CrossesInitiationLine") ? "Yes" : "No"
	}, {
		name: "Auto Low",
		vf: kpv => find(kpv, "AutoLow")
	}, {
		name: "Auto Outer",
		vf: kpv => find(kpv, "AutoOuter")
	}, {
		name: "Auto Inner",
		vf: kpv => find(kpv, "AutoInner")
	}, {
		name: "Auto Missed",
		vf: kpv => find(kpv, "AutoMissed")
	}, {
		name: "Autonomous Comments",
		vf: kpv => find(kpv, "AutonomousComments")
	}, {
		name: "Balls Picked Up From Loading Station",
		vf: kpv => find(kpv, "BallsPickedUpFromLoadingStation")
	}, {
		name: "Balls Picked Up From Floor",
		vf: kpv => find(kpv, "BallsPickedUpFromFloor")
	}, {
		name: "Tele-Op Low",
		vf: kpv => find(kpv, "TeleLow")
	}, {
		name: "Tele-Op Outer",
		vf: kpv => find(kpv, "TeleOuter")
	}, {
		name: "Tele-Op Inner",
		vf: kpv => find(kpv, "TeleInner")
	}, {
		name: "Tele-Op Missed",
		vf: kpv => find(kpv, "TeleMissed")
	}, {
		name: "Shoot From",
		vf: kpv => [find(kpv, "TargetZone"), find(kpv, "TrenchZone"), find(kpv, "Other")]
			.filter(v => v !== undefined) // filter out undefined
			.join(", ") // make it look nice
	}, {
		name: "Rotation",
		vf: kpv => find(kpv, "Rotation") ? "Yes" : "No"
	}, {
		name: "Color",
		vf: kpv => find(kpv, "Color") ? "Yes" : "No"
	}, {
		name: "Teleop Comments",
		vf: kpv => find(kpv, "TeleopComments")
	}, {
		name: "Endgame Type",
		vf: kpv => find(kpv, "EndgameType")
	}, {
		name: "Balls Scored",
		vf: kpv => find(kpv, "BallsScored")
	}, {
		name: "Climb Height",
		vf: kpv => find(kpv, "EndgameType") === 1 ? find(kpv, "ClimbHeight") : ""
	}, {
		name: "Climb Position",
		vf: kpv => find(kpv, "EndgameType") === 1 ? find(kpv, "ClimbPosition") : ""
	}, {
		name: "Time",
		vf: kpv => find(kpv, "EndgameType") === 1 ? find(kpv, "Time") : ""
	}, {
		name: "Endgame Comments",
		vf: kpv => find(kpv, "EndgameComments")
	}];

	let csv = "";

	// make header
	const header = [];
	theHolyGrail.forEach(col => {
		const filteredCell = col.name.replaceAll("\"", "");
		// https://stackoverflow.com/a/566059/12894940
		// the quotes around the cell ensure the newlines and commas are encoded properly.
		header.push(`"${filteredCell}"`);
	});

	csv += header.join(",") + "\r\n";

	// now we make the body
	// loop through each match
	matches.forEach(match => {
		const kpv = match[1];
		const row = [];
		// loop through each column, and calculate the row's values.
		theHolyGrail.forEach(col => {
			const filteredCell =
				// the result needs to be a string so we can use .replaceAll
				("" + col.vf(kpv))
					.replaceAll("\"", "")
					.replaceAll("\n", "");

			row.push(`"${filteredCell}"`);
		});

		csv += row.join(",") + "\r\n";
	});


	return csv;
}