import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isMenuMobileOpen: false,
  // bodyClass: "",
};
export const mainSlice = createSlice({
  initialState,
  name: "main",
  reducers: {
    handleShowedMenuMobile: (state) => {
      state.isMenuMobileOpen = true;
    },
    handleClosedMenuMobile: (state) => {
      state.isMenuMobileOpen = false;
    },
  },
});
const { actions, reducer: mainReducer } = mainSlice;
export const { handleShowedMenuMobile, handleClosedMenuMobile } = actions;
export default mainReducer;
