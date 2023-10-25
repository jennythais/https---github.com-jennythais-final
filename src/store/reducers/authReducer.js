import { message } from "antd";
import tokenMethod from "../../utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import { handleGetCart } from "./cartReducer";
const initialState = {
  showedModal: "",
  profile: null,
  loading: {
    login: false,
    register: false,
    getProfile: false,
  },
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    handleShowModal: (state, action) => {
      state.showedModal = action.payload;
    },
    handleCloseModal: (state) => {
      state.showedModal = "";
    },
    handleLogout: (state) => {
      tokenMethod.remove();
      state.profile = null;
      state.showedModal = "";
      message.success("Đăng xuất thành công");
    },
  },
  //Extra redecers
  //fulfilled: hoàn thành
  //rejected: không thành công
  // bat trang thai cua action -> update state trong store
  extraReducers: (builder) => {
    builder
      .addCase(handleRegister.fulfilled, (state) => {
        state.loading.register = false;
      })
      .addCase(handleRegister.pending, (state) => {
        state.loading.register = true;
      })
      .addCase(handleRegister.rejected, (state) => {
        state.loading.register = false;
      })

      .addCase(handleLogin.fulfilled, (state) => {
        state.loading.login = false;
        state.showedModal = "";
      })
      .addCase(handleLogin.pending, (state) => {
        state.loading.login = true;
      })
      .addCase(handleLogin.rejected, (state) => {
        state.loading.login = false;
      })

      .addCase(handleGetProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading.getProfile = false;
      })
      .addCase(handleGetProfile.pending, (state) => {
        state.loading.getProfile = true;
      })
      .addCase(handleGetProfile.rejected, (state) => {
        state.loading.getProfile = false;
      });
  },
});
const { actions, reducer: authReducer } = authSlice;
export const { handleLogout, handleShowModal, handleCloseModal } = actions;
export default authReducer;

//Handle Register
//function giúp xử lý các tác vụ không đồng bộ (async) dễ dàng
//tương tác với trạng thái Redux
// gửi các action khác trong quá trình xử lý tác vụ.
export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async (payload, thunkApi) => {
    try {
      const registerRes = await authService.register(payload);
      if (registerRes?.data?.data?.id) {
        message.success("Đăng ký thành công");
        thunkApi.dispatch(
          handleLogin({
            email: payload.email,
            password: payload.password,
          })
        );
        return true;
      } else {
        throw false;
      }
    } catch (error) {
      const errorInfo = error?.response?.data;
      if (errorInfo.error === "Forbidden") {
        message.error("Email đã được đăng ký");
      }
      return thunkApi.rejectWithValue(errorInfo);
    }
  }
);

//Handle Login
export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (payload, { dispatch, getState }) => {
    try {
      const res = await authService.login(payload);
      const { token: accessToken, refreshToken } = res.data.data || {};
      //Save
      tokenMethod.set({ accessToken, refreshToken });
      if (!!tokenMethod) {
        message.success("Login success");
        dispatch(handleCloseModal());
        thunkApi.dispatch(handleGetProfile());
        thunkApi.dispatch(handleGetCart());
      }
    } catch (error) {
      const errorInfo = error?.response?.data;
      if (errorInfo.error === "Not found") {
        message.error("Username or password incorrect");
      }
      return thunkApi.rejectedWithValue(errorInfo);
    }
  }
);

//Handle GetProfile
export const handleGetProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, thunkApi) => {
    if (tokenMethod.get()) {
      try {
        const profileRes = await authService.getProfile();
        return profileRes?.data?.data;
      } catch (error) {
        return thunkApi.rejectWithValue(error?.response?.data);
      }
    }
  }
);
