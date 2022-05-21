import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { database } from '../../config/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'

export const addToCart = createAsyncThunk("cart/addToCart", async (data, thunkAPI) => {
  const state = thunkAPI.getState()
  console.log(data);

  if (state.user.logged) {
    const col = collection(database, "cart", state.user.id, "products")
    const result = await addDoc(col, data)

    return data
  }

  return
})

export const recoverCart = createAsyncThunk("cart/recoverCart", async (data, thunkAPI) => {
  const id = thunkAPI.getState().user.id

  const col = collection(database, "cart", id, "products")

  const snapshot = await getDocs(col)

  let products = []

  snapshot.forEach(doc => {
    products.push({ id: doc.id, ...doc.data() })
  })

  return products
})

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    loading: false
  },
  reducers: {
      removeFromCart: (state, action) => {
      const id = action.payload
      state.products = state.products.filter(item => item.id !== id)
    }
  },
  extraReducers(builder) {
    builder.addCase(addToCart.pending, (state, action) => {
      state.loading = true
    })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false
        state.products.push(action.payload)
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
      })

    builder.addCase(recoverCart.pending, (state, action) => {
      state.loading = true
    })
      .addCase(recoverCart.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(recoverCart.rejected, (state, action) => {
        state.loading = false
      })
  }
})


// function cartReducer(state,action){
//     let newState
//     switch(action.type){
//         case 'ADD_TO_CART':
//             const newProduct = action.payload
//             newState = [...state,newProduct]
//             break
//         case 'REMOVE_FROM_CART':
//             const id = action.payload
//             newState = state.filter((item)=>{return item.id!==id})
//             break;

//         default:
//             newState = state
//     }

//     return newState
// }



const cartReducer = cartSlice.reducer
export const { removeFromCart } = cartSlice.actions
export default cartReducer