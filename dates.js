// // console.log(Date())
// let now = new Date()
// //console.log(now.toString())
// //console.log(now.getFullYear())
// let created = {
//     year:now.getFullYear(),
//     month:now.getMonth(),
//     day:now.getDate()
// }
// const {day,month,year} = created
// console.log(day)

let mike = new Date('june 21 1971')
let mikeTimeStamp = mike.getTime()
console.log(`mike: ${mikeTimeStamp}`)
let mikesBirthYear = mike.getFullYear(mikeTimeStamp)
console.log(mikesBirthYear)

let marleny = new Date('october 15 1969')
let marlenyTimeStamp = marleny.getTime()
let marlenyBirthYear = marleny.getFullYear(marlenyTimeStamp)
// console.log(`marleny: ${marlenyTimeStamp}`)
console.log(`${mikesBirthYear - marlenyBirthYear} year difference` )
 
 
