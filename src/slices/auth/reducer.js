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
        state.user = {};
        state.isLoggedIn = false;
        state.errorMsg = '';
        state.isLoading = true;
        state.allowedPages = [];
      })
      .addCase(authThunk.signUp.fulfilled, (state, action) => {
        state.user = action?.payload;
        state.isLoggedIn = true;
        state.errorMsg = '';
        state.isLoading = false;
        state.allowedPages = action?.payload?.allowedPages;
      })
      .addCase(authThunk.signUp.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = {};
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
        state.allowedPages = [];
      })

      // LOGIN
      .addCase(authThunk.login.pending, state => {
        state.user = {};
        state.isLoggedIn = false;
        state.errorMsg = '';
        state.isLoading = true;
        state.allowedPages = [];
      })
      .addCase(authThunk.login.fulfilled, (state, action) => {
        state.user = action?.payload;
        state.isLoggedIn = true;
        state.errorMsg = '';
        state.isLoading = false;
        state.allowedPages = action?.payload?.allowedPages;
      })
      .addCase(authThunk.login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = {};
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
        state.allowedPages = [];
      })

      // RESET PASSWORD
      .addCase(authThunk.forgetPassword.pending, state => {
        state.user = {};
        state.isLoggedIn = false;
        state.errorMsg = '';
        state.isLoading = true;
        state.allowedPages = [];
      })
      .addCase(authThunk.forgetPassword.fulfilled, state => {
        state.user = {};
        state.isLoggedIn = false;
        state.errorMsg = '';
        state.isLoading = false;
        state.allowedPages = [];
      })
      .addCase(authThunk.forgetPassword.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = {};
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
        state.allowedPages = [];
      })

      // VERIFY OTP
      .addCase(authThunk.verifyOTP.pending, state => {
        state.user = {};
        state.isLoggedIn = false;
        state.errorMsg = '';
        state.isLoading = true;
        state.allowedPages = [];
      })
      .addCase(authThunk.verifyOTP.fulfilled, state => {
        state.user = {};
        state.isLoggedIn = false;
        state.errorMsg = '';
        state.isLoading = false;
        state.allowedPages = [];
      })
      .addCase(authThunk.verifyOTP.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = {};
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
        state.allowedPages = [];
      })
      // RESET PASSWORD
      .addCase(authThunk.resetPassword.pending, state => {
        state.user = {};
        state.isLoggedIn = false;
        state.errorMsg = '';
        state.isLoading = true;
        state.allowedPages = [];
      })
      .addCase(authThunk.resetPassword.fulfilled, state => {
        state.user = {};
        state.isLoggedIn = false;
        state.errorMsg = '';
        state.isLoading = false;
        state.allowedPages = [];
      })
      .addCase(authThunk.resetPassword.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = {};
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
        state.allowedPages = [];
      })

      // LOGOUT
      .addCase(authThunk.logout.pending, state => {
        state.user = {};
        state.isLoggedIn = true;
        state.errorMsg = '';
        state.isLoading = true;
        state.allowedPages = [];
      })
      .addCase(authThunk.logout.fulfilled, state => {
        state.user = {};
        state.isLoggedIn = false;
        state.errorMsg = '';
        state.isLoading = false;
        state.allowedPages = [];
      })
      .addCase(authThunk.logout.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = {};
        state.errorMsg = action?.error?.message;
        state.isLoading = false;
        state.allowedPages = [];
      });
  },
});

export default authSlice.reducer;
