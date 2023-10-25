import { configureStore } from "@reduxjs/toolkit";
import { ENV } from "../constants/enviroments";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import mainReducer from "./reducers/mainReducer";
//configureStore ( khoi tao + config)
const store = configureStore({
  reducer: {
    auth: authReducer,
    main: mainReducer,
    cart: cartReducer,
  },
  devTools: ENV === "development",
});
export default store;
