import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],

  // cart: [
  //   {
  //     category:'',
  //     id: 12,
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //     title
  //     imgurl
  //   },
  // ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action) {
      for (var c of state.cart) {
        if (
          c.category === action.payload.category &&
          c.id === action.payload.id
        ) {
          c.quantity++;
          c.totalPrice = parseInt(c.quantity) * c.unitPrice;
          return;
        }
      }
      const newCard = {
        category: action.payload.category,
        id: action.payload.id,
        quantity: 1,
        unitPrice: action.payload.price,
        totalPrice: action.payload.price,
        title:action.payload.title,
        imgurl:action.payload.image
      };
      state.cart.push(newCard);
    },
    updateCartItem(state , action){
      const {id , category , amount} = action.payload
      const cardfromdb = state.cart.find((item)=>(
        item.id == id && item.category == category 
      ))
      cardfromdb.quantity += amount
      cardfromdb.totalPrice = cardfromdb.quantity * cardfromdb.unitPrice
      if(cardfromdb.quantity == 0){
        state.cart = state.cart.filter(item => (
          item.category != cardfromdb.category || (item.category == cardfromdb.category && item.id != cardfromdb.id)
        ))
      }
    },
    removeCartItem(state , action){
      const {id , category} = action.payload
      const cardfromdb = state.cart.find((item)=>(
        item.id == id && item.category == category 
      ))
      state.cart = state.cart.filter(item => (
        item.category != cardfromdb.category || (item.category == cardfromdb.category && item.id != cardfromdb.id)
      ))
    },
    clearCart(state){
      state.cart = []
    }
  },
});

export const { addCartItem , updateCartItem ,removeCartItem , clearCart } = cartSlice.actions;

export default cartSlice.reducer;
