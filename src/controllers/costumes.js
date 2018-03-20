const model = require('../models/costumes')

create = (req, res, next) => {
  const result = model.create(req.body.name, req.body.price, req.body.description, req.body.tags)
  if (result.error) next(result)
  else
    res.status(201).json({
      result,
      message: 'item created'
    })
}

getAll = (req, res, next) => {
  let result
  if (model.getAll(req.query.limit)) {
    result = model.getAll(req.query.limit)
    res.status(200).json({
      result,
      message: 'all items returned succesfully',
    })
  } else res.status(404)

}

getById = (req, res, next) => {
  const result = model.getById(req.params.id)
  if (result.error) next(result)
  else
    res.status(200).json({
      result,
      message: `item with ID: ${req.params.id} returned`
    })
}

update = (req, res, next) => {
  const result = model.update(req.params.id, req.body.name, req.body.price, req.body.description, req.body.tags)
  if (result.error) next(result)
  else
    res.status(200).json({
      result,
      message: `item with ID: ${req.params.id} updated`
    })
}

deleteById = (req, res, next) => {
  const result = model.deleteById(req.params.id)
  if (result.error) next(result)
  else
    res.status(200).json({
      result,
      message: `item with ID: ${req.params.id} deleted`
    })
}

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  update
}