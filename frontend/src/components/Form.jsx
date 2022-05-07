import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, editPost, formReset } from '../features/posts/postSlice'

export default function BasicTextFields() {
  const [file, setFile] = useState(null)
  const [creator, setCreator] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [tags, setTags] = useState('')

  const dispatch = useDispatch()
  const formData = useSelector((state) => state.posts.formDATA)
  const isEmpty = Object.keys(formData).length === 0

  useEffect(() => {
    formData && setCreator(formData.creator)
    formData && setTitle(formData.title)
    formData && setMessage(formData.message)
    formData && setTags(formData.tags)
  }, [formData])

  const onSubmit = (e) => {
    e.preventDefault()

    // validation
    if (!file) {
      return alert('Please include a file')
    }

    const formDATA = new FormData()
    formDATA.append('creator', creator)
    formDATA.append('title', title)
    formDATA.append('message', message)
    formDATA.append('tags', tags)
    formDATA.append('postImage', file, file.name)

    dispatch(createPost(formDATA))

    setCreator('')
    setFile('')
    setMessage('')
    setTags('')
    setTitle('')
  }

  // on update button clicked
  const onUpdateBtnClicked = (id) => {
    // validation
    if (!file) {
      return alert('Please include a file')
    }

    const formDATA = new FormData()
    formDATA.append('creator', creator)
    formDATA.append('title', title)
    formDATA.append('message', message)
    formDATA.append('tags', tags)
    formDATA.append('postImage', file, file.name)

    dispatch(editPost({ formDATA, id }))

    setCreator('')
    setFile('')
    setMessage('')
    setTags('')
    setTitle('')

    dispatch(formReset())
  }

  const onClearBtnClicked = () => {
    setCreator('')
    setFile('')
    setMessage('')
    setTags('')
    setTitle('')

    dispatch(formReset())
  }

  return (
    <div className="form_container">
      <h2 className="title">Create a memory</h2>

      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className="form-control">
          <input
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            type="text"
            placeholder="Creator"
            required
          />
        </div>
        <div className="form-control">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            required
          />
        </div>
        <div className="form-control">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            required
          />
        </div>
        <div className="form-control">
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            type="text"
            placeholder="Tags (comma separated)"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="file">Please select a file</label>
          <input
            type="file"
            filename="postImage"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {!isEmpty ? (
          <Button
            type="button"
            onClick={() => onUpdateBtnClicked(formData._id)}
            fullWidth
            variant="contained"
            color="warning"
          >
            Update
          </Button>
        ) : (
          <Button type="submit" fullWidth variant="contained" color="primary">
            Submit
          </Button>
        )}

        <Button
          type="button"
          fullWidth
          sx={{ mt: 1 }}
          variant="contained"
          color="secondary"
          onClick={onClearBtnClicked}
        >
          Clear
        </Button>
      </form>
    </div>
  )
}
