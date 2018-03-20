const db = '../../db'
const uuid = require('uuid/v4')
const path = require('path')
const fs = require('fs')
const dbPath = fs.readFileSync(path.join(__dirname, db,
  'db.json'))
const dbPath2 = path.join(__dirname, db,
  'db.json')

finder = (array, paramId) => {
  return array.find(a => {
    return a.id === Number(paramId)
  })
}

createTag = (paramId, name, color) => {
  console.log(paramId);
  let result;
  // if (!name) {
  //   result = {
  //     status: 400,
  //     error: 'No name entered'
  //   }
  //   return result
  // }
  const costumesArray = JSON.parse(dbPath, 'utf-8')
  let newTag = {
    id: uuid(),
    name,
    color,
  }
  costumesArray.forEach((a, idx) => {
    if (a.id === Number(paramId)) {
      costumesArray[idx].tags.push(newTag)
    }
    result = costumesArray[idx].tags
  })
  fs.writeFileSync(dbPath2, JSON.stringify(costumesArray))
  return result
}
//
// getAll = (limit) => {
//   const costumesArray = JSON.parse(dbPath, 'utf-8')
//   const result = !limit ? costumesArray : costumesArray.slice(0, limit)
//   return result
// }
//
// getById = (paramId) => {
//   let result;
//   const costumesArray = JSON.parse(dbPath, 'utf-8')
//   if (!finder(costumesArray, paramId)) {
//     result = {
//       status: 400,
//       error: 'ID not found'
//     }
//     return result
//   }
//   result = finder(costumesArray, paramId)
//   return result
// }
//
// update = (paramId, bodyName, bodyPrice, bodyDescription, bodyTags) => {
//   let result;
//   const costumesArray = JSON.parse(dbPath, 'utf-8')
//   if (!finder(costumesArray, paramId)) {
//     result = {
//       status: 400,
//       error: 'ID not found'
//     }
//     return result
//   }
//   costumesArray.forEach((a, idx) => {
//     if (a.id === Number(paramId)) {
//       costumesArray[idx].id = uuid()
//       costumesArray[idx].name = bodyName
//       costumesArray[idx].price = bodyPrice
//       costumesArray[idx].description = bodyDescription
//       costumesArray[idx].tags = bodyTags
//       result = costumesArray[idx]
//     }
//   })
//   fs.writeFileSync(dbPath2, JSON.stringify(costumesArray))
//   return result
// }
//
// deleteById = (paramId) => {
//   const costumesArray = JSON.parse(dbPath, 'utf-8')
//   if (!finder(costumesArray, paramId)) {
//     result = {
//       status: 400,
//       error: 'ID not found'
//     }
//     return result
//   }
//   costumesArray.forEach((a, idx) => {
//     if (a.id === Number(paramId)) {
//       costumesArray.splice(idx, 1)
//     }
//   })
//   fs.writeFileSync(dbPath2, JSON.stringify(costumesArray))
//   return costumesArray
// }

module.exports = {
  createTag,
  // getAllTags,
  // getTagById,
  // deleteTagById,
  // updateTag
}