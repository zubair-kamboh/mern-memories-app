import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Like from '@mui/icons-material/ThumbUp'
import Delete from '@mui/icons-material/Delete'
import moment from 'moment'

import { Box } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useDispatch } from 'react-redux'
import { deletePost, formAction, likePost } from '../features/posts/postSlice'

export default function RecipeReviewCard({ post }) {
  const dispatch = useDispatch()

  const dateformat = post && post.date.substring(0, 10).replaceAll('-', '')

  const date = moment(dateformat).startOf('hour').fromNow()

  return (
    <Card
      sx={{
        maxWidth: 345,
        position: 'relative',
      }}
    >
      <Box className="card-header">
        <p>
          {post && post.creator} <span>{date}</span>
        </p>

        <MoreHorizIcon onClick={() => dispatch(formAction(post))} />
      </Box>
      <CardMedia
        sx={{
          filter: 'brightness(70%)',
        }}
        component="img"
        height="194"
        image={`/uploads/${post.file}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography> {post && post.tags[0]} </Typography>
        <Typography variant="h5" fontWeight="bold" my={1}>
          {post && post.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {post && post.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'primary.main',
              cursor: 'pointer',
            }}
            onClick={() => dispatch(likePost(post._id))}
          >
            <IconButton aria-label="add to favorites">
              <Like color="primary" />
            </IconButton>
            {post && post.likes}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'secondary.main',
              cursor: 'pointer',
            }}
          >
            <IconButton
              aria-label="share"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <Delete color="secondary" />
            </IconButton>
          </Box>
        </Box>
      </CardActions>
    </Card>
  )
}
