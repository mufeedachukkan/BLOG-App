import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Box, InputLabel, TextField, Typography, Button } from '@mui/material'
const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }

function BlogDetail() {
  const navigate=useNavigate()
  const [blog, setBlog] = useState()
  const id = useParams().id
  console.log("id", id);
  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:3000/api/blog/${id}`)
      .catch(err => {
        console.log(err)
      })
    const data = await res.data
    return data
  }
  useEffect(() => {
    fetchDetails().then(data => {
      setBlog(data.blog)
      setInputs({ title: data.blog.title, description: data.blog.description })
    })
  }, [id])
  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:3000/api/blog/update/${id}`,
      {
        title: inputs.title,
        description: inputs.description
      }).catch(err => console.log(err))
    const data = await res.data
    return data
  }
  console.log("blogs", blog)
  const [inputs, setInputs] = useState({
  })
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs);
    sendRequest().then(data=>console.log(data))
    .then(()=>navigate('/myBlogs/'))
  }
  return (
    <div>   {inputs &&
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,7,77,0.6306897759103641) 69%, rgba(0,212,255,1) 100%)"
          borderRadius={10}
          margin={'auto'}
          marginTop={3}
          display='flex' flexDirection={'column'}
          width={'80%'}
          padding={3}
          boxShadow="10px 10px 20px #ccc">
          <Typography fontWeight={'bold'}
            padding={3} color='grey' variant='h4' textAlign={'center'}>Post Your Blog</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField value={inputs.title} name='title' onChange={handleChange} margin='auto' variant='outlined'></TextField>
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField value={inputs.description} name='description' onChange={handleChange} margin='auto' variant='outlined'></TextField>
          <Button sx={{ mt: 2, borderRadius: 4 }} variant="contained" color='warning' type="Submit">Submit</Button>
        </Box>
      </form>}</div>
  )
}

export default BlogDetail