import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from "react-router-dom";
import Appbarr from './comp/Appbarr';
import Drawerr from './comp/drawerr';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getDesignTokens from './Styles/Mytheme';

const drawerWidth = 240;
const Root = () => {
  const [noneorblock, setnoneorblock] = useState("none");
  const [permo, setpermo] = useState("permanent");
  const [mode, setmymode] = useState(localStorage.getItem("currentmode")===null?"light":localStorage.getItem("currentmode")==="light"?"light":"dark");



  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
  <CssBaseline />
    <Box>
     <Appbarr {...{drawerWidth,setnoneorblock,setpermo}}  />
      <Drawerr {...{drawerWidth,setmymode,noneorblock,permo,setnoneorblock,setpermo}}    />
       
       <Box component="main" sx={{ml:{ sm:`${drawerWidth}px`},mt:"60px",display:"flex", justifyContent:"center"}}>
      <Outlet />
      </Box>
    </Box>
    </ThemeProvider>
  );
}

export default Root;
