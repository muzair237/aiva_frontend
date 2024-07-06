import { createSlice } from '@reduxjs/toolkit';
import authThunk from './thunk';

const initialState = {
  user: {},
  isLoggedIn: false,
  isLoading: false,
  errorMsg: '',
  allowedPages: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // SINGUP
      .addCase(authThunk.signUp.pending, state => {
        state.isLoading = true;
      })
      .addCase(authThunk.signUp.fulfilled, (state, action) => {
        state.user = action?.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.allowedPages = action?.payload?.allowedPages;
      })
      .addCase(authThunk.signUp.rejected, (state, action) => {
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
      })

      // LOGIN
      .addCase(authThunk.login.pending, state => {
        state.isLoading = true;
      })
      .addCase(authThunk.login.fulfilled, (state, action) => {
        state.user = action?.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.allowedPages = action?.payload?.allowedPages;
      })
      .addCase(authThunk.login.rejected, (state, action) => {
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
      })

      // RESET PASSWORD
      .addCase(authThunk.forgetPassword.pending, state => {
        state.isLoading = true;
      })
      .addCase(authThunk.forgetPassword.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(authThunk.forgetPassword.rejected, (state, action) => {
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
      })

      // VERIFY OTP
      .addCase(authThunk.verifyOTP.pending, state => {
        state.isLoading = true;
      })
      .addCase(authThunk.verifyOTP.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(authThunk.verifyOTP.rejected, (state, action) => {
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
      })

      // RESET PASSWORD
      .addCase(authThunk.resetPassword.pending, state => {
        state.isLoading = true;
      })
      .addCase(authThunk.resetPassword.fulfilled, state => {
        state.isLoading = false;
        state.allowedPages = [];
      })
      .addCase(authThunk.resetPassword.rejected, (state, action) => {
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
      })

      // LOGOUT
      .addCase(authThunk.logout.pending, state => {
        state.isLoading = true;
      })
      .addCase(authThunk.logout.fulfilled, state => {
        state.user = {};
        state.isLoggedIn = false;
        state.isLoading = false;
        state.allowedPages = [];
      })
      .addCase(authThunk.logout.rejected, state => {
        state.isLoggedIn = false;
        state.user = {};
        state.isLoading = false;
        state.allowedPages = [];
      })

      // UPDATE USER
      .addCase(authThunk.updateUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(authThunk.updateUser.fulfilled, (state, action) => {
        const updatedUser = {
          ...action.payload,
          allowedPages: state.user.allowedPages,
        };
        state.user = updatedUser;
        state.isLoading = false;
      })

      .addCase(authThunk.updateUser.rejected, (state, action) => {
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
