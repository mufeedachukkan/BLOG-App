import { Box, InputLabel, TextField, Typography ,Button} from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const labelStyles={mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}


function AddBlog() {
  const navigate=useNavigate()
  const [inputs,setInputs]=useState({
    title:'',description:'',imageURL:''
  })
  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const sendRequest=async()=>{
    const res =await axios.post("http://localhost:3000/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem('userId')
    }).catch(err=>console.log(err));
    const data=await res.data
    return data
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log("inouts",inputs);
    sendRequest().then(data=>console.log("addD",data)).then(()=>navigate('/blogs'))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor= "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,7,77,0.6306897759103641) 69%, rgba(0,212,255,1) 100%)" 
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
          <TextField value={inputs.description} name='description' onChange={handleChange}  margin='auto' variant='outlined'></TextField>
          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField value={inputs.imageURL} name='imageURL' onChange={handleChange} margin='auto' variant='outlined'></TextField>
          <Button sx={{mt:2,borderRadius:4}} variant="contained" color='warning' type="Submit">Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog