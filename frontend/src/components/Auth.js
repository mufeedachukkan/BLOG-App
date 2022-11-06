import { Button, TextField, Typography, Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {authActions} from '../store'
import {useNavigate} from 'react-router-dom'

function Auth() {
  const navigate=useNavigate()
  const dispath=useDispatch()
  const [inputs,setInputs]=useState({
    name:'',email:'',password:''
  })
  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const sendRequest = async (type="login")=>{
    const res = await axios.post(`http://localhost:3000/api/user/${type}`,{
      name:inputs.name,
      email:inputs.email,
      password:inputs.password
    }).catch(err=>{
      console.log(err)
    })

    const data=await res.data;
    console.log("data",data)
    return data
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(inputs)
    if(isSignup){
      sendRequest("signup")
      .then((data)=>localStorage.setItem('userId',data.user._id))
      .then(()=>dispath(authActions.login()))
      .then(()=>navigate("/blogs"))
      .then(data=>console.log(data))
    }else{
      sendRequest()
      .then((data)=>localStorage.setItem('userId',data.user._id))
      .then(()=>dispath(authActions.login()))
      .then(()=>navigate('/blogs'))
      .then(data=>console.log(data))
    }
  }
  const [isSignup, setisSignup] = useState(false)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={'column'}
          alignItems='center'
          justifyContent={'center'}
          boxShadow='10px 10px 20px #ccc'
          padding={3}
          margin='auto'
          marginTop={5}
          borderRadius={5}
          maxWidth={400}
        >
          <Typography padding={3} variant='h3' textAlign='center' >
            {isSignup?'Signup':'Login'}
          </Typography>
          { isSignup &&
          <TextField onChange={handleChange} name='name' margin='normal' value={inputs.name} placeholder='Name'></TextField>
          }
          <TextField onChange={handleChange} name="email" margin='normal' value={inputs.email} type={'email'} placeholder='Email'></TextField>
          <TextField onChange={handleChange} name="password" margin='normal' value={inputs.password} type={'password'} placeholder='Password'></TextField>
          <Button type="submit" variant='contained' color="warning" sx={{borderRadius:3, margin:3}}>Submit</Button>
          <Button onClick={()=>setisSignup(!isSignup)} sx={{borderRadius:3}}>
            Change To {isSignup ? 'Login' : 'Signup'}
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth