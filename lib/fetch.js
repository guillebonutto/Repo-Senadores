var misCabeceras = new Headers({ "X-API-Key": "YVrNEFOB4GzGYaw2pICMAxZJpPXq74HZuffS1xUu" })

var miInit = { headers: misCabeceras }

let casa

if (
	document.title == "House" ||
	document.title == "House Attendance" ||
	document.title == "House Party Loyalty"
) {
	casa = "house"
} else if (
	document.title == "Senate" ||
	document.title == "Senate Attendance" ||
	document.title == "Senate Party Loyalty"
) {
	casa = "senate"
}

fetch(`https://api.propublica.org/congress/v1/115/${casa}/members.json`, miInit)
	.then(function (response) {
		return response.json()
	})
	.then(function (myJson) {
		app.members = myJson.results[0].members
		app.totalMissedVotes = myJson.results[0].members
		// app.objetoEstadistica.totalMembers = myJson.results[0].members.length
		selector(app.members)
		// app.fullName = `${member.first_name} + ${member.middle_name} || "" + ${member.last_name}`
		// console.log(app.fullName)
		// tabla(miembros)
		if (
			document.title == "Senate Party Loyalty" ||
			document.title == "House Party Loyalty" ||
			document.title == "Senate Attendance" ||
			document.title == "House Attendance"
		) {
			ordenar()
			filtroDemRepID(app.members)
			totalMembers1()
			total()
		}
		// totalDem()
		// totalRep()
		// totalIndep()
		// mostrarContenido()
	})
