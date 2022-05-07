const express = require('express')
const {
  getMemories,
  createMemories,
  editMemories,
  deleteMemories,
  likeMemory,
} = require('../controller/memoryController')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../frontend/public/uploads')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = file.originalname.split('.')[1]
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`)
  },
})

const upload = multer({ storage })

const router = express.Router()

router.get('/', getMemories)
router.post('/create', upload.single('postImage'), createMemories)
router.post('/like/:id', likeMemory)
router.put('/edit/:id', upload.single('postImage'), editMemories)
router.delete('/delete/:id', deleteMemories)

module.exports = router
