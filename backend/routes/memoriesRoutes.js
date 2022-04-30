const express = require('express')
const {
  getMemories,
  createMemories,
  editMemories,
  deleteMemories,
  likeMemory,
} = require('../controller/memoryController')
const router = express.Router()

router.get('/', (req, res) => getMemories(req, res))
router.post('/create', (req, res) => createMemories(req, res))
router.post('/like/:id', (req, res) => likeMemory(req, res))
router.put('/edit/:id', (req, res) => editMemories(req, res))
router.delete('/delete/:id', (req, res) => deleteMemories(req, res))

module.exports = router
