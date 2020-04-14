
// function to get data from local storage
const getPatients = () => {
	// fetch the records from local storage...
	const patientsJSON = localStorage.getItem('patients')
	// if there's data in local storage return it
	if (patientsJSON) {
		return JSON.parse(patientsJSON)
	} else{
		return []
	}
}
// stringifies the dataset and saves it to local storage
const savePatients = () => localStorage.setItem('patients',JSON.stringify(patients))

const setGender = (gender) => {
    let genderSelected
    if (gender === 'male') {
        genderSelected = 'male'
    } else if (gender === 'female') {
        genderSelected = 'female'
    }else {
        genderSelected = 'not yet'
    }
        return genderSelected
}
// create a patient record
const createPatient = (e) => {
    let timeStamp = moment().valueOf()
    //  store the form fields values
	let name = e.target.elements.fullName.value 
    let age = e.target.elements.age.value
    let room = e.target.elements.room.value
    let gender = setGender(e.target.elements.gender.value)
	let createdAt = timeStamp
	let updatedAt = timeStamp
	let id = uuidv4()
		
	let newPatient = {
		name:name ||'???',
		age:age ||'???',
		room:room ||'not set',
		id,
		updatedAt,
        createdAt,
        gender
	}
    patients.push(newPatient)
	localStorage.setItem('patients',JSON.stringify(patients))
		clearForm()
		clearList()
        //getAllRecords(patients)
        
		location.assign(`/edit.html#${id}`)
}
// removing the patient by id 
const removePatient = (id) => {
    // find index
    let patientIndex = patients.findIndex((p) => {
        // return true if theres a match
        return p.id === id
    })
    if (patientIndex > -1) {
    // will run if patientIndex returns true
        patients.splice(patientIndex,1)
        clearList()
        savePatients() 
        location.reload() 
    }
}
//  generates a delete button and event listener
const createDeleteBtn = (p) => {
    let deleteBtn = document.createElement('button')
            deleteBtn.textContent = 'DEL'
            deleteBtn.setAttribute('id','delete')
            deleteBtn.setAttribute('class','del')
            deleteBtn.style.marginRight = '10px'
            deleteBtn.style.background = "orangered"
            deleteBtn.style.borderRadius = "5px"
            deleteBtn.addEventListener('click',(e) => {
                removePatient(p.id)
            })
            return deleteBtn
}
createPatientDiv = (btnSpan,patientInfo) => {
    let patientDiv = document.createElement('div')
			patientDiv.style.display = 'flex'
			patientDiv.style.marginTop = '10px'
            patientDiv.appendChild(btnSpan)
            patientDiv.appendChild(patientInfo)
            return patientDiv
}

const sortBySelection = (patients,selection) => {
	let sorted
	switch (selection) {
		case 'mostRecent':
			sorted = sortMostRecent(patients,selection)
			break;
		case 'byAge':
			sorted = sortByAge(patients,selection)
			break;
		case 'byRoom':
			sorted = sortByRoom(patients,selection)
			break;
		case 'alphabeticaly':
			sorted = sortAlphabeticaly(patients,selection)
			break;
		default:
			break;
	}
	return sorted
}
const sortMostRecent = (patientsArr,option) => {
    if (option === 'mostRecent') {
        patientsArr.sort((a,b) => {
            if(a.updatedAt > b.updatedAt) {
                return -1
            }else if (a.updatedAt < b.updatedAt) {
                return 1
            }else
                return 0
        })
            } 
    return patientsArr
}
const sortByAge = (patientsArr,option) => {
    if (option === 'byAge') {
        // returns youngest to oldest patient
        patientsArr.sort((a,b) => {
                    if(a.age > b.age) {
                        return 1
                    }else if (a.age < b.age) {
                        return -1
                    }else
                        return 0
                })
            }
    return patientsArr
}
const sortByGender = (patientsArr,option) => {
    console.log('sort by gender...')
}
const sortByRoom = (patientsArr,option) => {
    if (option === 'byRoom') {
        // returns youngest to oldest patient
        patientsArr.sort((a,b) => {
                    if(a.room > b.room) {
                        return -1
                    }else if (a.room < b.room) {
                        return 1
                    }else
                        return 0
                })
            }
        return patientsArr
}
const sortAlphabeticaly = (patientsArr,option) => {
    if (option === 'alphabeticaly') {
        // 
        patientsArr.sort((a,b) => {
                    if(a.name > b.name) {
                        return 1
                    }else if (a.name < b.name) {
                        return -1
                    }else
                        return 0
                })
            }
        return patientsArr
}
// loop thru and display the patient records when the browser loads
const getAllRecords = (patients) => {
    recordCount(patients)
	patients.forEach((p) => {
        // span element to hold the delete button and future buttons 
        let btnSpan = document.createElement('span')
        let deleteBtn = createDeleteBtn(p)
            btnSpan.appendChild(deleteBtn)    
        // create an anchor element and set its attribute to the url+id which will direct the user to an edit page.
        // this element will also display ALL the patient information to the user
        let patientInfo = document.createElement('a')
            patientInfo.setAttribute('href',`/edit.html#${p.id}`)
            patientInfo.setAttribute('class','info')
            patientInfo.style.textDecoration = 'none'
            patientInfo.textContent = `Name: ${p.name} , Age: ${p.age} , Gender: ${p.gender} ,
            Room: ${p.room} , Admitted:${moment(p.createdAt).format('MMM Do, YYYY-h:mm:a')}`
            
        // container div to house buttons and patient info element
        let patientDiv = createPatientDiv(btnSpan,patientInfo)
            document.querySelector('.patient-list').appendChild(patientDiv)		
	})
}
// this function will be used with instant name-search
// it re-generates a found patient record
const createPatientDom = (thePatient) => {
    let btnSpan = document.createElement('span')
    let deleteBtn = createDeleteBtn(thePatient)
        btnSpan.appendChild(deleteBtn)
    let patientInfo = document.createElement('a')
        patientInfo.style.textDecoration = 'none'
        patientInfo.setAttribute('href',`/edit.html#${thePatient.id}`)
        patientInfo.textContent = `Name: ${thePatient.name} , Age: ${thePatient.age} , 
            Room: ${thePatient.room} , Admitted-${moment(thePatient.createdAt).format('MMM Do YYYY , h:mm:a')}`
    //  container div
    let patientDiv = createPatientDiv(btnSpan,patientInfo)        
    let patientDom =  document.querySelector('.patient-list').appendChild(patientDiv)
        return patientDom
}
// instant name search
const nameSearch =  (patients,query) =>  {
    // 1: catch all the matches
    filteredItems = patients.filter((p) => {
       return p.name.toLowerCase().includes(query.toLowerCase())
   })
   // 2: loop thru records matched/display on screen
   filteredItems.forEach((p) => {
    let item = createPatientDom(p)
       document.querySelector('.patient-list').appendChild(item)
   })
}
// HELPER FUNCTIONS....

// refresh screen 
const clearList = () => {
    document.querySelector('.patient-list').innerHTML = ''}
    
// clear form fields
const clearForm = () => {
    document.querySelector('#add-patient').reset()
}
// number of bed available
const CAPACITY = 11
const recordCount = (patients) => {
    // dom refs .....
    let openBeds = document.querySelector('#open-beds')
    let remainingBeds = document.querySelector('#remaining')
    let patientCount = document.querySelector('#patient-count')
    let remaining
        remaining = CAPACITY - patients.length + 1
    let msg = ''
    let fullWarning

    //message formating if the record count is 1 or 0
    if(patients.length <= 0 ) {
        msg = 'none found'
        patientCount.textContent = msg
    }  
    if(patients.length > 0 ){
        let plural
        msg =`(${patients.length}) Patient${patients.length === 1 ? plural = '': plural = 's' }`
    }
    if (CAPACITY === patients.length) {
        fullWarning = 'No Rooms Available'
        disableForm()
    }
    openBeds.textContent = fullWarning
    openBeds.style.color = 'red'
    remainingBeds.textContent = `${CAPACITY - patients.length} available`
    patientCount.textContent = msg       
}
const disableForm = () => {
    const form = document.querySelector('#add-patient')
    let elements = form.elements
    for (let i = 0; i < elements.length; i++) {
         elements[i].disabled = true;   
    }
    elements[5].style.background = 'red'
    elements[5].style.color = 'white'
}
const progressBar = (patients) => {
    let progress = document.querySelector('.progress')
    progress.style.width = '0px'
    let progressBarWidth = 0
let timerId = setInterval(() => {
    progress.style.display = 'block'
    progress.style.width = `${progressBarWidth}px`
    progressBarWidth = progressBarWidth + 5
    if (progressBarWidth === 700) {
        progress.style.display = 'none'
		clearInterval(timerId)
		getAllRecords(patients)
		recordCount(patients)     
    }
}, -500)
}






