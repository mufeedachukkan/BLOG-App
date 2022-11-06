import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Blogs = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`)
  }
  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:3000/api/blog/${id}`)
      .catch(err => console.log(err))
    const data = await res.data
    return data
  }
  const handleDelete = () => {
    deleteRequest().then(() => navigate('/')).then(()=>navigate('/blogs'))
  }
  console.log(title, isUser);
  return (
    <div> <Card sx={{
      width: '40%', margin: "auto",
      mt: 2, padding: 2,
      boxShadow: '5px 5px 10px #ccc',
      ":hover:": {
        boxShadow: '10px 10px 20px #ccc',
      },
    }}>
      {isUser && (
        <Box display='flex'>
          <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
            <EditIcon color='warning'></EditIcon>
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteOutlineIcon color='error'></DeleteOutlineIcon>
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {/* {userName} */}

          </Avatar>
        }

        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Paella dish"
      />
      
      <CardContent>
      <hr></hr>
      <br></br>
        <Typography variant="body2" color="text.secondary">
          <b>{userName}</b>{" : "} {description}
        </Typography>
      </CardContent >
    </Card></div>
  )
}

export default Blogs