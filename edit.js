// dom refs
const nameEl = document.querySelector('#full-name')
const roomEl = document.querySelector('#room-number')
const ageEl = document.querySelector('#age')

let editWrapper = document.querySelector('.edit-wrapper')
editWrapper.style.height = window.innerHeight;

// get patients from local storage
let patients = getPatients()

// get the id from the url and find a match in patients
const patientId = location.hash.substring(1)
let patient = patients.find((p) => {
    return p.id === patientId
})
//redirect to index.html if theres no match
if (!patient) {
    location.assign('/index.html')
}
// populate the form fields with the values returned from patient found
nameEl.value = patient.name
ageEl.value = patient.age
roomEl.value = patient.room

// these  event listeners update the patient and saves it to local storage
nameEl.addEventListener('input',(e) => {
    patient.updatedAt = moment().valueOf()
    patient.name = e.target.value
    savePatients()
})
ageEl.addEventListener('input',(e) => {
    patient.updatedAt = moment().valueOf()
    patient.age = e.target.value
    savePatients()
})
roomEl.addEventListener('input',(e) => {
    patient.updatedAt = moment().valueOf()
    patient.room = e.target.value
    savePatients()
})

document.querySelector('#home').addEventListener('click',(e) => {
    location.assign('/index.html')
})

document.querySelector('#remove').addEventListener('click',(e) => {
     // 1 find index
    let patientIndex = patients.findIndex((p) => {
        // 2 return true if theres a match
        return p.id === patientId
    })
    // 3 if theres a match remove by the patient by the found index.
    if (patientIndex > -1) {
        patients.splice(patientIndex,1)
        savePatients()
        location.assign('index.html')
    }
})

// listen for storage events on localStorage..

window.addEventListener('storage',(e) => {
    
})