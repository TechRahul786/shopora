import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
};

const getProductId = (item) =>
  item.product?._id || item.productId?._id || item.productId;

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCart: (state, action) => {
      // Supports both an array and a cart object
      state.items = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.items || [];

      state.loading = false;
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;

      const item = state.items.find(
        (item) => getProductId(item) === productId
      );

      if (item) {
        item.quantity = quantity;
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => getProductId(item) !== action.payload
      );
    },

    removeCart: (state) => {
      state.items = [];
      state.loading = false;
    },

    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCart,
  updateQuantity,
  removeItem,
  removeCart,
  setCartLoading,
} = cartSlice.actions;

export default cartSlice.reducer;