// let reverseString = (str) => {
//     let rvs = ''
//     let len = str.length -1
//     for(let i = 0; i <= len; i++)
//       {
//         rvs = str[i] + rvs
//       }
//         return rvs   
//   }
let reverseString = (str) => {
    let rvs = ''
    str.split('').forEach(char => rvs = char + rvs)
        return rvs
}
  let rString = reverseString('foo')
  console.log(rString)

  