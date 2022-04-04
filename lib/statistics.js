var estadistica_json = {
	status: "OK",
	copyright: " Copyright (c) 2021 Pro Publica Inc. All Rights Reserved.",
	results: [
		{
			congress: "116",
			chamber: "Senate",

			num_total: 0,
			republican: 0,
			democrates: 0,
			independent: 0,
			totalPercentage: 0,
			leastLoyal: [],
			mostLoyal: [],
			leastEngaged: [],
			mostEngaged: [],
		},
	],
}
function filtroDemRepID(datos) {
	app.objetoEstadistica.Democrats = datos.filter((element) => element.party == "D")
	app.objetoEstadistica.Republicans = datos.filter((element) => element.party == "R")
	app.objetoEstadistica.Independents = datos.filter((element) => element.party == "ID")
	app.objetoEstadistica.totalDemocrats = app.objetoEstadistica.Democrats.length
	app.objetoEstadistica.totalRepublicans = app.objetoEstadistica.Republicans.length
	app.objetoEstadistica.totalIndependents = app.objetoEstadistica.Independents.length
	estadistica_json.republican = app.objetoEstadistica.totalRepublicans.length
	estadistica_json.democrates = app.objetoEstadistica.totalDemocrats.length
	estadistica_json.independent = app.objetoEstadistica.totalIndependents.length
}

function totalMembers1() {
	app.objetoEstadistica.totalMembers =
		app.objetoEstadistica.totalDemocrats +
		app.objetoEstadistica.totalRepublicans +
		app.objetoEstadistica.totalIndependents
}

function percentajeParty() {
	app.objetoEstadistica.Democrats.forEach((element) => {
		app.objetoEstadistica.percentagePartyD += element.votes_with_party_pct
	})
}

function total() {
	if (app.objetoEstadistica.Democrats.length > 0) {
		app.objetoEstadistica.Democrats.forEach((element) => {
			if (element.votes_with_party_pct != undefined)
				app.objetoEstadistica.percentagePartyD += element.votes_with_party_pct
		})
	}
	if (app.objetoEstadistica.Republicans.length > 0) {
		app.objetoEstadistica.Republicans.forEach((element) => {
			if (element.votes_with_party_pct != undefined)
				app.objetoEstadistica.percentagePartyR += element.votes_with_party_pct
		})
	}
	if (app.objetoEstadistica.Independents.length > 0) {
		app.objetoEstadistica.Independents.forEach((element) => {
			if (element.votes_with_party_pct != undefined)
				app.objetoEstadistica.percentagePartyID += element.votes_with_party_pct
		})
	}
	if (app.objetoEstadistica.percentagePartyD != 0) {
		app.objetoEstadistica.percentagePartyD /= app.objetoEstadistica.totalDemocrats
	}
	if (app.objetoEstadistica.percentagePartyR != 0) {
		app.objetoEstadistica.percentagePartyR /= app.objetoEstadistica.totalRepublicans
	}
	if (app.objetoEstadistica.percentagePartyID != 0) {
		app.objetoEstadistica.percentagePartyID /= app.objetoEstadistica.totalIndependents
	}

	app.objetoEstadistica.totalPercentage =
		app.objetoEstadistica.percentagePartyD +
		app.objetoEstadistica.percentagePartyR +
		app.objetoEstadistica.percentagePartyID

	if (app.objetoEstadistica.percentagePartyID != 0) {
		app.objetoEstadistica.totalPercentage /= 3
		app.objetoEstadistica.percentagePartyID = app.objetoEstadistica.percentagePartyID.toFixed(2)
	} else {
		app.objetoEstadistica.totalPercentage /= 2
	}
	app.objetoEstadistica.percentagePartyD = app.objetoEstadistica.percentagePartyD.toFixed(2)
	app.objetoEstadistica.percentagePartyR = app.objetoEstadistica.percentagePartyR.toFixed(2)
	app.objetoEstadistica.totalPercentage = app.objetoEstadistica.totalPercentage.toFixed(2)
	// = democrats.length + rep.length + id.length
	// let totalPercentage
	// if (votosID.innerHTML != "0 %") {
	// 	totalPercentage =
	// 		parseInt(votosR.innerHTML) + parseInt(votosD.innerHTML) + parseInt(votosID.innerHTML)
	// 	totalPercentage = totalPercentage / 3
	// } else {
	// 	totalPercentage = parseInt(votosR.innerHTML) + parseInt(votosD.innerHTML)
	// 	totalPercentage = totalPercentage / 2
	// }
	// tablaBody.innerHTML += `
	// 	<tr>
	// 		<td>Total</td>
	// 		<td>${total}</td>
	// 		<td id="totalPercentage">${totalPercentage.toFixed(2)} %</td>
	// 	</tr>
	// 	`
	// votosR.innerHTML += " %"
	// totalPercentage.innerHTML += " %"
	// estadisticasjson.totalPercentage = total
	// return totalPercentage.toFixed(2)
}

// estadisticasjson.total = ordenar()
function ordenar() {
	app.leastLoyal = [...app.members].sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)
	app.mostLoyal = [...app.members].sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct)
	app.leastEngaged = [...app.members].sort((a, b) => a.missed_votes_pct - b.missed_votes_pct)
	app.mostEngaged = [...app.members].sort((a, b) => b.missed_votes_pct - a.missed_votes_pct)
	diezPorCiento()
}
function diezPorCiento() {
	app.leastLoyal = app.leastLoyal.splice(0, app.leastLoyal.length * 0.1)
	app.mostLoyal = app.mostLoyal.splice(0, app.mostLoyal.length * 0.1)
	app.leastEngaged = app.leastEngaged.splice(0, app.leastEngaged.length * 0.1)
	app.mostEngaged = app.mostEngaged.splice(0, app.mostEngaged.length * 0.1)
}

console.log(estadistica_json)
