import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedProducts:localStorage.getItem("selectedProducts")?JSON.parse(localStorage.getItem(("selectedProducts"))):[],
  selectedProductsId:localStorage.getItem("selectedProductsId")?JSON.parse(localStorage.getItem("selectedProductsId")):[],
}

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
    addToCart: (state, action) => {
      // state.value += action.payload
      const proQuantity = {...action.payload,"quantity":1}
      state.selectedProducts.push(proQuantity)
      state.selectedProductsId.push(action.payload.id)
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
      localStorage.setItem("selectedProductsId",JSON.stringify(state.selectedProductsId))
    },
    increaseProduct: (state, action) => {
    const increaseQuan = state.selectedProducts.find((item) => {
      return item.id === action.payload.id
    })
    increaseQuan.quantity += 1;
    localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
    localStorage.setItem("selectedProductsId",JSON.stringify(state.selectedProductsId))
    },
    decreaseProduct: (state, action) => {
      const increaseQuan = state.selectedProducts.find((item) => {
        return item.id === action.payload.id
      })
      increaseQuan.quantity -= 1;
      if(increaseQuan.quantity === 0){
        const delProduct = state.selectedProducts.filter((item) => {
          return item.id !== action.payload.id
        })
        const delProduct2 = state.selectedProductsId.filter((item) => {
          return item !== action.payload.id
        })
        state.selectedProducts = delProduct
        state.selectedProductsId = delProduct2
      }
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
      localStorage.setItem("selectedProductsId",JSON.stringify(state.selectedProductsId))
    },
    deleteProduct: (state, action) => {
      const delProduct = state.selectedProducts.filter((item) => {
        return item.id !== action.payload.id
      })
      const delProduct2 = state.selectedProductsId.filter((item) => {
        return item !== action.payload.id
      })
      state.selectedProducts = delProduct
      state.selectedProductsId = delProduct2
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
      localStorage.setItem("selectedProductsId",JSON.stringify(state.selectedProductsId))
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart,increaseProduct,decreaseProduct,deleteProduct } = counterSlice.actions

export default counterSlice.reducer
