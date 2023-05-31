import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        getToken: '',
    },
    reducers: {
        setIsLogin: (state, action) => {
            state.isLogin = action.payload
        },
        hasAccess: (state) => {
            state.getToken = AsyncStorage.getItem('accessToken')
        }
    }
})

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isOpen: false
    },
    reducers: {
        setIsOpen: (state, action) => {
            state.isOpen = action.payload
        }
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        id: '' ,
    },
    reducers: {
        setCartId: (state, action) => {
            state.id = action.payload
            AsyncStorage.setItem('cart', action.payload)  
        },
        extraReducers: builder => {
            console.log('builder', builder)
            builder.addCase('@@INIT', () => {
              AsyncStorage.getItem('cart')
                .then(cartId => {
                    console.log('cartId extraReducers', cartId)
                  // If cart ID exists in local storage, dispatch the setCartId action to update the state
                  if (cartId) {
                    store.dispatch(setCartId(cartId));
                  }
                })
                .catch(error => {
                  console.log('Error  local storage:', error);
                });
            })
    }}
})

export const { setIsOpen } = sidebarSlice.actions
export const { setCartId, getCartId } = cartSlice.actions
export const { setIsLogin, hasAccess } = userSlice.actions

const rootReducer = {
    sidebar: sidebarSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer
}

export default rootReducer