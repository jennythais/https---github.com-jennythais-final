import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { cartService } from "../../services/cartService";

const initialState = {
  cartInfo: {},
  cartLoading: false,
};
export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    updateCart: (state, action) => {
      state.cartInfo = action.payload || state.cartInfo;
    },
    clearCart: (state) => {
      state.cartInfo = {};
    },
    removeProduct: (state, action) => {
      const productIdRemove = action.payload;
      const cartInfo = state.cartInfo;
      const updateCart = { ...cartInfo };
      const productIndex = updateCart.product.findIndex(
        (product) => product.id === productIdRemove
      );
      if (productIndex !== -1) {
        updateCart.product.splice(productIndex, 1);
        updateCart.quantity.splice(productIndex, 1);
        updateCart.variant.splice(productIndex, 1);
        updateCart.totalProduct.splice(productIndex, 1);

        updateCart.subTotal -= cart.totalProduct[productIndex];
        updateCart.total = updateCart.subTotal - cart.discount;

        state.cartInfo = updateCart;
      }
    },
  },
  extraReducers: (builder) => {
    //* Get cart
    builder.addCase(handleGetCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleGetCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      state.cartInfo = action.payload;
    });
    builder.addCase(handleGetCart.rejected, (state) => {
      state.cartLoading = false;
      state.cartInfo = {};
    });
    //* Add cart
    builder.addCase(handleAddCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleAddCart.fulfilled, (state) => {
      state.cartLoading = false;
    });
    builder.addCase(handleAddCart.rejected, (state) => {
      state.cartLoading = false;
    });
  },
});
const { actions, reducer: cartReducer } = cartSlice;
export const { updateCart, clearCart, removeProduct } = actions;
export default cartReducer;

export const handleGetCart = createAsyncThunk(
  "cart/get",
  async (_, thunkApi) => {
    try {
      const cartRes = await cartService.getCart();
      return cartRes.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const handleAddCart = createAsyncThunk(
  "cart/add",
  async (actionPayload, thunkApi) => {
    try {
      //Prepare payload
      const { addedId, addedColor, addedQuantity, addedPrice } = actionPayload;
      //Get state -> return ve all state cua store -> chi lay cai can "cartInfo"
      const { cartInfo } = thunkApi.getState()?.cart || {};
      //   console.log("thunkApi.getState()?.cart", thunkApi.getState().cart);
      let addPayload = {};
      if (cartInfo.id) {
        const matchIndex = cartInfo.product?.findIndex(
          (product, index) =>
            product.id === addedId && cartInfo.variant[index] === addedColor
        );
        const newProduct = cartInfo.product?.map((product) => {
          return product.id;
        });
        const newQuantity = [...(cartInfo.quantity ?? [])];
        const newVariant = [...(cartInfo.variant ?? [])];
        const newTotalProduct = [...(cartInfo.totalProduct ?? [])];
        //Product same color
        if (matchIndex > -1) {
          newQuantity[matchIndex] =
            Number(newQuantity[matchIndex]) + Number(addedQuantity);
          newVariant[matchIndex] = addedColor;
          newTotalProduct[matchIndex] =
            Number(newTotalProduct[matchIndex]) + addedPrice * addedQuantity;
        } else {
          newProduct.push(addedId);
          newQuantity.push(addedQuantity);
          newVariant.push(addedColor);
          newTotalProduct.push(addedPrice * addedQuantity);
        }
        const newSubTotal =
          newTotalProduct.reduce(
            (current, next) => Number(current) + Number(next),
            0
          ) || 0;
        const newTotal = newSubTotal - cartInfo.discount;
        addPayload = {
          ...cartInfo,
          product: newProduct,
          quantity: newQuantity,
          variant: newVariant,
          subTotal: newSubTotal,
          total: newTotal,
          totalProduct: newTotalProduct,
        };
      } else {
        addPayload = {
          product: [addedId],
          quantity: [addedQuantity],
          variant: [addedColor],
          totalProduct: [addedPrice * addedQuantity],
          subTotal: addedPrice * addedQuantity,
          total: addedPrice * addedQuantity,
          discount: 0,
          paymentMethod: "",
        };
      }
      const cartRes = await cartService.updateCart(addPayload);
      thunkApi.dispatch(handleGetCart());
      message.success("Add to cart successfully");
      return cartRes?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
      message.error("Add to cart failed");
    }
  }
);
