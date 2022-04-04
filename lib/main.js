let democrats
let rep
let id

let tablaBody = document.querySelector("#senate-data")
let select = document.querySelector("#sel")

let miembros

filterState = []

var app = new Vue({
	el: "#app",
	data: {
		message: "Hello Vue!",
		members: [],
		check: ["R", "D", "ID"],
		select: "All states",
		fullName: "",
		first_name: "",
		estados: [],
		objetoEstadistica: {
			Democrats: [],
			Republicans: [],
			Independents: [],
			totalDemocrats: 0,
			totalRepublicans: 0,
			totalIndependents: 0,
			totalMembers: 0,
			percentagePartyD: 0,
			percentagePartyR: 0,
			percentagePartyID: 0,
			totalPercentage: 0,
			leastLoyal: [],
			mostLoyal: [],
			leastEngaged: [],
			mostEngaged: [],
		},
	},
	methods: {
		filter() {
			return this.members.filter((member) => {
				if (member.state == this.select || this.select == "All states") {
					if (this.check.includes(member.party)) {
						return member
					}
				}
			})
		},
	},
})

let veces = 1
function selector(filtro) {
	filtro.forEach((element) => {
		if (!app.estados.includes(element.state)) {
			app.estados.push(element.state)
		}
	})
	app.estados = app.estados.sort()
}
function cambiar() {
	let read = document.getElementById("btn")
	if (veces == 1) {
		veces--
		read.innerHTML = "Read Less"
		read.style.marginBottom = "1rem"
	} else {
		veces++
		read.innerHTML = "Read More"
		read.style.marginBottom = "3.03rem"
	}
}

// const dataFilter = data.results[0].members
