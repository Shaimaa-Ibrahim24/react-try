import  './product-details.css';
import { useGetoneproductQuery } from '../Redux/productsApi'
import {  useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {Box,styled,IconButton,Button} from '@mui/material';
import DetailsThumb from './DetailsThumb';
import { useState,useRef } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { addToCart } from '../Redux/cartSlice';
import { decreaseProduct, increaseProduct } from '../Redux/cartSlice';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
  
  },
}));

const ProductDetails = () => {
  const {selectedProducts,selectedProductsId} = useSelector((state) => state.carttt)
  const dispatch = useDispatch()
  let { id } = useParams();
  const { data, error, isLoading } = useGetoneproductQuery(id)
  const [index, setindex] = useState(0);
const myRef = useRef(null)

const handleTab = (index) => {
  setindex(index)
    const images = myRef.current.children;
    for(let i=0; i<images.length; i++){
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };
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
  
    return (
      <div className="app">
        
            <div className="details" >
              <div className="big-img">
                <img src={data.imageLink[index]} alt=""/>
              </div>

              <div className="box">
                <div className="row">
                  <h2>{data.productName}</h2>
                  <span>${data.price}</span>
                </div>
                

                <p>{data.description}</p>
                
                <DetailsThumb images={data.imageLink} tab={handleTab} myRef={myRef} />
                {selectedProductsId.includes(data.id)?(
      <div style={{marginTop:"50px"}} className="much">
      <IconButton color="primary" onClick={() => {
        dispatch(decreaseProduct(data))
      }} sx={{mr:"10px"}}>
      <RemoveIcon fontSize='small'/>
      </IconButton>
      <IconButton>
      <StyledBadge badgeContent={proQuantity(data)} color="primary"/>

      </IconButton>
      
      <IconButton color="primary" onClick={() => {
        dispatch(increaseProduct(data))
      }} sx={{ml:"10px"}}>
      <AddIcon fontSize='small'/>
      
      </IconButton>
    </div>
    ) :(<Button onClick={() => {
        dispatch(addToCart(data))
      }}  sx={{textTransform:"capitalize",p:1,lineHeight:1.1,marginTop:"50px"}} variant="contained" color="primary">
      <ShoppingCartIcon sx={{fontSize:"18px",mr:1}} />  add to cart
      </Button>)}

              </div>
            </div>
      </div>
    );
  }

}

export default ProductDetails;
