import Header from "./components/Header";
import React, { useEffect } from "react";
import  {Routes,Route } from 'react-router-dom';
import Auth from './components/Auth';
import Blogs from "./components/Blog";
import UserBlogs from "./components/UserBlog";
import BlogDetail from './components/BlogDetail';
import AddBlog from './components/AddBlog'
import {useDispatch, useSelector} from 'react-redux'
import { authActions } from "./store";

function App() {
  const dispath=useDispatch()
  const isLoggedIn=useSelector((state)=>state.isLoggedIn)
  console.log(isLoggedIn)
  useEffect(()=>{
    if(localStorage.getItem('userId')){
      dispath(authActions.login())
    }
   },[dispath])
  return (
    <React.Fragment >
      <header>
      <Header></Header>
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? <Route path="/auth"element={<Auth/>}></Route>:
          <>
          <Route path="/blogs" element={<Blogs/>}></Route>
          <Route path='/blogs/add' element={<AddBlog></AddBlog>}></Route>
          <Route path="/myBlogs" element={<UserBlogs></UserBlogs>}></Route>
          <Route path='/myBlogs/:id' element={<BlogDetail></BlogDetail>}></Route>
          </>}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
