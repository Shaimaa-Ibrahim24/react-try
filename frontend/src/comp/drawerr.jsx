import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import {useTheme} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux'




const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
const Drawerr = ({drawerWidth,setmymode,noneorblock,permo,setnoneorblock,setpermo}) => {
  const {selectedProducts} = useSelector((state) => state.carttt)
  const theme = useTheme()
  const location = useLocation();
  const navigate = useNavigate();
  const myList = [
    {title:"Home",icon:<HomeIcon/>,path:"/"},
    {title:"Cart",icon:<StyledBadge badgeContent={selectedProducts.length} color="secondary">
    <ShoppingCartIcon />
  </StyledBadge>,path:"/cart"}
]

  return (
    <Drawer
        sx={{
          display:{xs:noneorblock, sm:"block"},
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={permo}
        anchor="left"
        open={true}
        onClose={() => {
          setpermo("permanent")
          setnoneorblock("none")
        }}
      >
        
        
      <List>
        <ListItem sx={{ display:"flex", justifyContent:"center", mb:"10px" }}  disablePadding>
        <IconButton onClick={() => {
          localStorage.setItem("currentmode",theme.palette.mode === "light"?"dark":"light")
        setmymode(theme.palette.mode === "light"?"dark":"light")
        }}  color="inherit">
       {theme.palette.mode === 'dark' ? <Brightness7Icon sx={{color:"orange"}} /> : <Brightness4Icon />}
      </IconButton>
      </ListItem>
      <Divider />
    {myList.map((item) => {
      return(
        <ListItem sx={{bgcolor:location.pathname===item.path?theme.palette.favColor.main:null}} key={item.title} disablePadding>
        <ListItemButton onClick={() => {
           navigate(item.path);
        }}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
      )
    })}
      </List>
      </Drawer>
      
  );
}

export default Drawerr;
