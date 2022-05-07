import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  posts: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
  formDATA: {},
}

// get all posts
export const getPosts = createAsyncThunk(
  'posts/getall',
  async (payload, thunkAPI) => {
    try {
      const data = await fetch('/memories')
      const res = await data.json()

      return res
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

// create post
export const createPost = createAsyncThunk(
  'post/create',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post('/memories/create', payload)
      console.log(data.data)
      return data.data
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

// delete post
export const deletePost = createAsyncThunk(
  'post/delete',
  async (id, thunkAPI) => {
    try {
      const data = await fetch(`/memories/delete/${id}`, {
        method: 'DELETE',
      })

      const res = await data.json()

      return res.id
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

// edit post
export const editPost = createAsyncThunk(
  'post/edit',
  async (payload, thunkAPI) => {
    const { id, formDATA } = payload
    try {
      const data = await axios.put(`/memories/edit/${id}`, formDATA)
      console.log(data.data)
      return data.data
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

// increment like
export const likePost = createAsyncThunk(
  'post/addlike',
  async (id, thunkAPI) => {
    try {
      const req = await fetch(`/memories/like/${id}`, {
        method: 'POST',
      })

      const res = await req.json()

      return res
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    formAction: (state, action) => {
      state.formDATA = action.payload
    },
    formReset: (state) => {
      state.formDATA = {}
    },
  },
  extraReducers: (builder) => {
    // get posts
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload
        state.isError = false
        state.isSuccess = true
        state.isLoading = false
      })

      .addCase(getPosts.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
      })

      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error.message
      })

      // create post
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
        state.isError = false
        state.isSuccess = true
        state.isLoading = false
      })

      .addCase(createPost.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
      })

      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error.message
      })

      // delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload)
        state.isError = false
        state.isSuccess = true
        state.isLoading = false
      })

      .addCase(deletePost.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
      })

      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error.message
      })

      // edit post
      .addCase(editPost.fulfilled, (state, action) => {
        const editedPost = action.payload

        state.posts = state.posts.map((post) =>
          post._id === editedPost._id ? editedPost : { ...post }
        )

        state.isError = false
        state.isSuccess = true
        state.isLoading = false
      })

      .addCase(editPost.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
      })

      .addCase(editPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error.message
      })

      // like post
      .addCase(likePost.fulfilled, (state, action) => {
        const { id, likes } = action.payload

        state.posts = state.posts.map((post) =>
          post._id === id ? { ...post, likes } : { ...post }
        )
        // console.log(res)

        state.isError = false
        state.isSuccess = true
        state.isLoading = false
      })

      .addCase(likePost.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
      })

      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.error.message
      })
  },
})

export const { formAction, formReset } = postSlice.actions

export default postSlice.reducer
