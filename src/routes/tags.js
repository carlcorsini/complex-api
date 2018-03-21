const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/tags')

router.post('/:id', ctrl.createTag)

router.get('/', ctrl.getAllTags)

router.get('/:id', ctrl.getTagById)

router.put('/:id', ctrl.updateTag)

router.delete('/:id', ctrl.deleteTagById)


module.exports = router