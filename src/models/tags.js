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

finder2 = (array) => {
  let tagsArray = []
  array.forEach(a => {
    tagsArray.push(a.tags)
  })
  return tagsArray
}

tagFinder = (array, paramId) => {
  return array.find(a => {
    return a[0].id === Number(paramId)
  })
}

createTag = (paramId, name, color) => {
  let result;
  if (!name) {
    result = {
      status: 400,
      error: 'No name entered'
    }
    return result
  }
  const costumesArray = JSON.parse(dbPath, 'utf-8')
  let newTag = {
    id: uuid(),
    name,
    color,
  }
  costumesArray.forEach((a, idx) => {
    if (a.id === Number(paramId)) {
      costumesArray[idx].tags.push(newTag)
      result = costumesArray[idx]
    }
  })
  fs.writeFileSync(dbPath2, JSON.stringify(costumesArray))
  return result
}

getAllTags = (limit) => {
  const costumesArray = JSON.parse(dbPath, 'utf-8')
  let tagsArray = []
  costumesArray.forEach(a => {
    tagsArray.push(a.tags)
    result = tagsArray
  })
  return result
}

getTagById = (paramId) => {
  let result
  const costumesArray = JSON.parse(dbPath, 'utf-8')
  let tags = finder2(costumesArray)
  if (!tagFinder(tags, paramId)) {
    result = {
      status: 400,
      error: 'Tag ID not found'
    }
    return result
  }
  result = tagFinder(tags, paramId)
  return result
}

// costumesArray.forEach((a, idx) => {
//   a.tags.forEach(b => {})
// })

updateTag = (paramId, bodyName, bodyColor) => {
  let result;
  const costumesArray = JSON.parse(dbPath, 'utf-8')
  let tags = finder2(costumesArray)
  if (!tagFinder(tags, paramId)) {
    result = {
      status: 404,
      error: 'tag not found'
    }
  }
  costumesArray.forEach((a, idx) => {
    a.tags.forEach((b, idx2) => {
      if (b.id == paramId) {
        costumesArray[idx].tags[idx2].id = uuid()
        costumesArray[idx].tags[idx2].name = bodyName
        costumesArray[idx].tags[idx2].color = bodyColor
        fs.writeFileSync(dbPath2, JSON.stringify(costumesArray))
        result = costumesArray[idx].tags
      }
    })
  })

  return result
}

deleteTagById = (paramId) => {
  let result
  const costumesArray = JSON.parse(dbPath, 'utf-8')
  let tags = finder2(costumesArray)
  if (!tagFinder(tags, paramId)) {
    result = {
      status: 404,
      error: 'tag not found'
    }
  }
  // costumesArray.forEach((a, idx) => {
  //   if (a.id === Number(paramId)) {
  //     costumesArray.splice(idx, 1)
  //   }
  // })
  costumesArray.forEach((a, idx) => {
    a.tags.forEach((b, idx2) => {
      if (b.id === Number(paramId)) {
        costumesArray[idx].tags.splice(idx2, 1)
        fs.writeFileSync(dbPath2, JSON.stringify(costumesArray))
        result = costumesArray[idx]
      }
    })
  })
  return result
}

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  deleteTagById,
  updateTag
}