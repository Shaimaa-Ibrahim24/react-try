import { Box, Stack, Button, useTheme,IconButton,styled,Typography } from '@mui/material';
import React from 'react';
import './Home.css';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Badge from '@mui/material/Badge';
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useGetproductsByNameQuery } from './Redux/productsApi'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from './Redux/cartSlice';
import { decreaseProduct, increaseProduct } from './Redux/cartSlice';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
  
  },
}));
const Home = () => {
  const { data, error, isLoading } = useGetproductsByNameQuery()
  const {selectedProducts,selectedProductsId} = useSelector((state) => state.carttt)
  
  const theme = useTheme()
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const proQuantity = (itemApi) => {
    const myProduct = selectedProducts.find((ito) => {
      return ito.id === itemApi.id
    })
    return myProduct.quantity
  }
if(isLoading){
  return(
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )
}
if(error){
  return(
    <Box>
      Errorrrrrrrrrrrrr
    </Box>
  )
}
if(data){
  return(
  
    <Stack flexDirection="row" sx={{flexWrap:"wrap", justifyContent:"center"}}>

        {data.map((item) => {
          return(
<Card key={item.id} className='card'   sx={{ maxWidth: 277, mb:3, mx:2 }}>
    
    <CardMedia
      component="img"
      height="277"
      image={item.imageLink[0]}
      alt={item.productName}
      onClick={() => {
        navigate(`product-details/${item.id}`)
      }}
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
    {item.description}
      </Typography>
    </CardContent>
    <CardActions sx={{justifyContent:"space-between"}} disableSpacing>
  
    {selectedProductsId.includes(item.id)?(
      <div dir="rtl" className="much">
      <IconButton color="primary" onClick={() => {
        dispatch(increaseProduct(item))
      }} sx={{ml:"10px"}}>
      <AddIcon fontSize='small'/>
      
      </IconButton>
      <IconButton>
      <StyledBadge badgeContent={proQuantity(item)} color="primary"/>

      </IconButton>
      <IconButton color="primary" onClick={() => {
        dispatch(decreaseProduct(item))
      }} sx={{mr:"10px"}}>
      <RemoveIcon fontSize='small'/>
      </IconButton>
    </div>
    ) :(<Button onClick={() => {
        dispatch(addToCart(item))
      }}  sx={{textTransform:"capitalize",p:1,lineHeight:1.1}} variant="contained" color="primary">
      <ShoppingCartIcon sx={{fontSize:"18px",mr:1}} />  add to cart
      </Button>)}
  
      <Typography mr={1} variant="body1" color={theme.palette.error.light}>${item.price}</Typography>
    </CardActions>    
  </Card>
          )
        })}
            
        
      
    </Stack>

)
}

}

  
  


export default Home;
