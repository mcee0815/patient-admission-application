

let patients = getPatients()

// start the app by displaying the most recent patients list...
let recentpatients = sortBySelection(patients,'default')
	progressBar(recentpatients)  
//let filteredItems = []

// sort by dropdown list
document.querySelector('#sorting').addEventListener('change',(e) => {
	let selection = e.target.value
	let sorted = sortBySelection(patients,selection)
    clearList()
	getAllRecords(sorted)	
})
// add a new patient record
// target the form by its id
document.querySelector('#add-patient').addEventListener('submit',(e) => {
	e.preventDefault()
	createPatient(e)
	recordCount(recentpatients)
})
// patient search-box 
document.querySelector('#search').addEventListener('input',(e) => {
	let searchQuery = e.target.value
		clearList()
		nameSearch(patients,searchQuery)	
})
// listen for storage events on localStorage..
window.addEventListener('storage',(e) => {
	patients = JSON.parse(e.newValue)
	savePatients()
	clearList()
	getAllRecords(patients)
})

