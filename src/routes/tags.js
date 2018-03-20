const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/tags')

router.post('/', ctrl.createTag)

// router.get('/tags', ctrl.getAllTags)
//
// router.get('/:id/tags', ctrl.getTagById)
//
// router.put('/:id/tags/:id', ctrl.updateTag)
//
// router.delete('/:id/tags', ctrl.deleteTagById)


module.exports = router