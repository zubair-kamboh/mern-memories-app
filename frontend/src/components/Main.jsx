import { Card, Container, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../features/posts/postSlice'
import MeomoriesCard from './Card'
import Form from './Form'

const Main = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.posts)

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <Container maxWidth="lg">
      <Card
        sx={{
          my: 3,
          p: 2,
          textAlign: 'center',
          color: 'primary.main',
          fontWeight: 'bold',
        }}
      >
        Memories App
      </Card>

      <Grid container spacing={3}>
        <Grid container item md={8} spacing={2}>
          {posts.length < 1 && (
            <Typography variant="h3" sx={{ color: 'white' }}>
              No posts to show
            </Typography>
          )}
          {posts.map((post) => (
            <Grid item md={6} key={post._id}>
              <MeomoriesCard post={post} />
            </Grid>
          ))}
        </Grid>

        <Grid item md={4}>
          <Form />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Main
