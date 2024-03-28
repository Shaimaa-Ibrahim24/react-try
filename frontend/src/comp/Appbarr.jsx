import React from 'react';
import {AppBar, Link} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
const Appbarr = ({drawerWidth,setnoneorblock,setpermo}) => {
  return (
    <AppBar sx={{width: {sm:`calc(100% - ${drawerWidth}px)`}, ml:{xs:0, sm: `${drawerWidth}px`}}} position="static">
    <Toolbar>
      <IconButton onClick={() => {
        setpermo("temporary")
        setnoneorblock("block")
      }} color='inherit' sx={{display:{sm:"none"}}}>
        <MenuIcon/>
      </IconButton>
      <Link underline='none' sx={{ flexGrow: 1, "&:hover": {fontSize:"17px"} }}  href="/" color="inherit">Online Store</Link>
      <Typography variant="body1" color="inherit">Shaima Ibrahim</Typography>
      <Avatar sx={{ml:"10px"}} src="./imgs/shaimaa.jpg"></Avatar>
    </Toolbar>
  </AppBar>
  );
}

export default Appbarr;
