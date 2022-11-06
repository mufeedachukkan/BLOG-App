import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store'

function Header() {
    const dispath= useDispatch()
    const isLoggedIn = useSelector((state) => state.isLoggedIn)

    const [value, setValue] = useState()
    return (
        <AppBar position='sticky'
            sx={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,7,77,0.6306897759103641) 69%, rgba(0,212,255,1) 100%)" }}>
            <Toolbar>
                <Typography variant="h4">BlogsApp</Typography>
                {isLoggedIn && <Box display='flex' marginLeft={'auto'} marginRight={'auto'}>
                    <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
                        <Tab LinkComponent={Link} to="/blogs" label="All Blogs"></Tab>
                        <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"></Tab>
                        <Tab LinkComponent={Link} to="/blogs/add" label="ADD BLOG"></Tab>
                    </Tabs>
                </Box>}
                <Box display="flex" marginLeft="auto">
                    {!isLoggedIn &&
                        <>
                        <Button LinkComponent={Link} to="/auth" color="warning" variant="contained" sx={{ margin: 1, borderRadius: 10 }}>Login</Button>
                        <Button LinkComponent={Link} to="/auth" color="warning" variant="contained" sx={{ margin: 1, borderRadius: 10 }}>Signup</Button>
                    </>}            
                    {isLoggedIn && (
                     <Button onClick={()=>dispath(authActions.logout())} LinkComponent={Link} to="/auth" color="warning" variant="contained" sx={{ margin: 1, borderRadius: 10 }}>LOGOUT</Button>
                    )}                
                    </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header