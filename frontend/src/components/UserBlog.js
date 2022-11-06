import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blogs from './Blogs'

function UserBlog() {
  const [user, setUser] = useState()
  const id=localStorage.getItem('userId')
  console.log("id",id)
  const sendRequest=async ()=>{
    const res = await axios.get(`http://localhost:3000/api/blog/user/${id}`)
    .catch(err=>console.log(err))
    const data=await res.data;
    return data
  }
  // useEffect(()=>{ 
  //   sendRequest()
  //   .then(
  //     (data)=>setBlogs(data.blogs)
  //   )
  // },[])
  useEffect(() => {
    sendRequest().then((data)=>setUser(data.user))
  }, [])
  
  console.log("myblog",user);
  return (
    <div>
      {user && user.blogs && user.blogs.map((blog,index)=>(
        <Blogs key={index} 
        id={blog._id}
        isUser={true}
        title={blog.title} 
        description={blog.description} 
        imageURL={blog.image} 
        userName={user.name}></Blogs>
       )) }
    </div>
  )
}

export default UserBlog