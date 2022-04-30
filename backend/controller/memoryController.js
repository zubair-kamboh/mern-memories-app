const MemoriesModel = require('../model/memoriesModel')

// route /memories/create - post
const createMemories = async (req, res) => {
  const { creator, title, message, tags, file } = req.body

  if (!creator || !title || !message || !tags || !file) {
    return res.status(400).json({ message: 'please input all fields' })
  }

  try {
    const createdPost = await MemoriesModel.create(req.body)

    if (createdPost) {
      res.status(201).json(createdPost)
    }
  } catch (e) {
    res.status(400).send(new Error(e.message))
  }
}

// route  /memories - get
const getMemories = async (req, res) => {
  try {
    const allMemories = await MemoriesModel.find()

    if (allMemories) {
      return res.status(200).json(allMemories)
    }
  } catch (e) {
    res.status(400).send(new Error(e.message))
  }
}

// edit post
const editMemories = async (req, res) => {
  const id = req.params.id
  const { creator, title, message, tags, file } = req.body

  if (!creator || !title || !message || !tags || !file) {
    return res.status(400).send(new Error('please input all fields'))
  }

  try {
    const editedPost = await MemoriesModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    )
    if (editedPost) {
      console.log(editedPost)
      res.status(200).json(editedPost)
    }
  } catch (e) {
    res.status(400).send(new Error(e.message))
  }
}

// route  /memories/delete/:id - delete
const deleteMemories = async (req, res) => {
  const id = req.params.id

  try {
    const deletedPost = await MemoriesModel.findOneAndDelete({ _id: id })

    if (deletedPost) {
      res.status(200).json({ id: deletedPost._id })
    }
  } catch (e) {
    res.status(400).send(new Error(e.message))
  }
}

// route  /memories/like/:id - post
const likeMemory = async (req, res) => {
  const id = req.params.id

  const post = await MemoriesModel.findById({ _id: id })

  try {
    const likedPost = await MemoriesModel.findByIdAndUpdate(
      { _id: id },
      {
        likes: post.likes + 1,
      },
      {
        new: true,
      }
    )

    if (likedPost) {
      res.status(200).json({ likes: likedPost.likes, id: likedPost._id })
    }
  } catch (e) {
    res.status(400).send(new Error(e.message))
  }
}

module.exports = {
  createMemories,
  getMemories,
  editMemories,
  deleteMemories,
  likeMemory,
}
