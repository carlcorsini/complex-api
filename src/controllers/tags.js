const model = require('../models/tags')

createTag = (req, res, next) => {
  const result = model.createTag(req.params.id, req.body.name, req.body.color)
  console.log('tags routes');
  if (result.error) next(result)
  else
    res.status(201).json({
      result,
      message: 'tag created'
    })
}

getAllTags = (req, res, next) => {
  let result
  if (model.getAllTags(req.query.limit)) {
    result = model.getAllTags(req.query.limit)
    res.status(200).json({
      result,
      message: 'all tags returned succesfully',
    })
  } else res.status(404)

}

getTagById = (req, res, next) => {
  const result = model.getTagById(req.params.id)
  if (result.error) next(result)
  else
    res.status(200).json({
      result,
      message: `tags from ID: ${req.params.id} returned`
    })
}

updateTag = (req, res, next) => {
  const result = model.updateTag(req.params.id, req.body.name, req.body.color)
  if (result.error) next(result)
  else
    res.status(200).json({
      result,
      message: `tag with ID: ${req.params.id} updated`
    })
}

deleteTagById = (req, res, next) => {
  const result = model.deleteTagById(req.params.id)
  if (result.error) next(result)
  else
    res.status(200).json({
      result,
      message: `Tag with ID: ${req.params.id} deleted`
    })
}

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  deleteTagById,
  updateTag
}