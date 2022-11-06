import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blogs from './Blogs';

function Blog() {
  const [blogs, setblogs] = useState()
  const sendRequest=async ()=>{
    const res =await axios.get('http://localhost:3000/api/blog')
    .catch(err=>console.log(err));
    const data=await res.data
    return data;
  }
  useEffect(() => {
    sendRequest().then(data=>setblogs(data.blogs))
  }, [])
  console.log(blogs);
  return (
    <div>
       {blogs && blogs.map((blog,index)=>(
        <Blogs 
        id={blog._id}
        isUser={localStorage.getItem('userId')===blog.user._id}
        title={blog.title} description={blog.description} imageURL={blog.image} userName={blog.user.name}></Blogs>
       )) }
    </div>
  )
}

export default Blog