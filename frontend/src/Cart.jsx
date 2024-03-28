import { Box} from '@mui/material';
import React from 'react';
import {Typography,Divider,Button,styled, Paper, IconButton, Stack} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import "./Cart.css";
import AddIcon from '@mui/icons-material/Add';
import Badge from '@mui/material/Badge';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux'
import { decreaseProduct, deleteProduct, increaseProduct } from './Redux/cartSlice';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor:"#1976d2",
    color: "#fff"
  },
}));
const Cart = () => {
  const {selectedProducts} = useSelector((state) => state.carttt)
  const dispatch = useDispatch()
  let subtotal = 0
  return (
    <Box>
      
       
          {selectedProducts.map((item) => {
            subtotal += Number(item.price)*Number(item.quantity)
            return(
              <Paper key={item.id}  className="boxy" dir="rtl">
                  <div className="tito">
                <img className="mynew" src={item.imageLink[0]} alt="" />
                <p className="teto">{item.productName}</p>
              </div>
              <div className="much">
                <IconButton onClick={() => {
                  dispatch(increaseProduct(item))
                }} sx={{color:"#1976d2",ml:"10px"}}>
                <AddIcon/>
                
                </IconButton>
                <IconButton>
                <StyledBadge badgeContent={item.quantity} color="secondary"/>
        
                </IconButton>
                <IconButton onClick={() => {
                  dispatch(decreaseProduct(item))
                }} sx={{color:"#1976d2",mr:"10px"}}>
                <RemoveIcon/>
                </IconButton>
              </div>
              <div className="yes">${Number(item.price)*Number(item.quantity)}</div>
              <Button onClick={() => {
                  dispatch(deleteProduct(item))
                }} sx={{display:{xs:"none",md:"inline-flex"}}} variant="text" color="error">
                delete
              </Button>
              <IconButton onClick={() => {
                  dispatch(deleteProduct(item))
                }} sx={{color:"#ef5350",display:{xs:"inline-flex",md:"none"}}}>
                <DeleteIcon/>
              </IconButton>
                  </Paper>
            )
          })}    
                
                  
                
              
            
            <Paper sx={{width:"200px", mx:"auto",mt:"60px"}}>
              <Typography align='center' variant="h6" p={2}>Cart Summary</Typography>
              <Divider/>
              <Stack direction="row" sx={{justifyContent:"space-between",p:1.2}}>
              <Typography variant="body1" >Subtotal</Typography>
              <Typography variant="body1" >${subtotal}</Typography>
              </Stack>
              <Divider/>
              <Button fullWidth variant="contained" color="primary">
                Checkout
              </Button>
            </Paper>
    </Box>
  );
}

export default Cart;
