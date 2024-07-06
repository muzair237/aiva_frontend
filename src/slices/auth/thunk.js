import { createAsyncThunk } from '@reduxjs/toolkit';
import { Toast } from '../../components/Molecules/Toast';
import { setCookie, deleteCookie, clearAllCookies, isFormData } from '../../helpers/common';
import { Fetch } from '../../helpers/fetchWrapper';
import {
  SIGNUP,
  LOGIN,
  FORGET_PASSWORD,
  VERIFY_OTP,
  RESET_PASSWORD,
  LOGOUT,
  UPDATE_USER,
} from '../../helpers/url_helper';

const authThunk = {
  url: `${process.env.NEXT_PUBLIC_AIVA_API_URL}/user`,

  signUp: createAsyncThunk('signUp/signUpUser', async ({ payload, router }) => {
    try {
      const res = await Fetch.post(`${authThunk.url}/${SIGNUP}`, payload);
      if (res.status >= 200 && res.status < 300) {
        const { user, token, message } = await res.json();
        user.allowedPages = [...user?.permissions.filter(p => p.includes('.nav')).map(p => `/${p.split('.')[0]}`)];
        setCookie(process.env.NEXT_PUBLIC_AIVA_TOKEN_COOKIE, JSON.stringify(token));
        setCookie(process.env.NEXT_PUBLIC_AIVA_ALLOWED_PAGES_COOKIE, JSON.stringify(user.allowedPages));
        Toast({
          type: 'success',
          message,
        });
        router.push('/');
        return user;
      }
      const { message } = await res.json();
      throw new Error(message ?? 'Something Went Wrong');
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
      throw message;
    }
  }),

  login: createAsyncThunk('login/loginUser', async ({ payload, router }) => {
    try {
      const res = await Fetch.post(`${authThunk.url}/${LOGIN}`, payload);
      if (res.status >= 200 && res.status < 300) {
        const { user, token, message } = await res.json();
        user.allowedPages = [...user?.permissions.filter(p => p.includes('.nav')).map(p => `/${p.split('.')[0]}`)];
        setCookie(process.env.NEXT_PUBLIC_AIVA_TOKEN_COOKIE, JSON.stringify(token));
        setCookie(process.env.NEXT_PUBLIC_AIVA_ALLOWED_PAGES_COOKIE, JSON.stringify(user.allowedPages));
        Toast({
          type: 'success',
          message,
        });
        router.push('/');
        return user;
      }
      const { message } = await res.json();
      throw new Error(message ?? 'Something Went Wrong');
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
      throw message;
    }
  }),

  forgetPassword: createAsyncThunk('forget/forgetPassword', async ({ payload, router }) => {
    try {
      const { email } = payload;
      const res = await Fetch.post(`${authThunk.url}/${FORGET_PASSWORD}`, payload);
      if (res.status >= 200 && res.status < 300) {
        const { message } = await res.json();
        setCookie('email', email, 5);
        if (router) router.push('/verify-otp');
        Toast({
          type: 'success',
          message,
        });
        return;
      }
      const { message } = await res.json();
      throw new Error(message ?? 'Something Went Wrong');
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
      throw message;
    }
  }),

  verifyOTP: createAsyncThunk('verify/verifyOtp', async ({ payload, router }) => {
    try {
      const res = await Fetch.post(`${authThunk.url}/${VERIFY_OTP}`, payload);
      if (res.status >= 200 && res.status < 300) {
        const { message } = await res.json();
        // deleteCookie('email');
        router.push('/create-password');
        Toast({
          type: 'success',
          message,
        });
        return;
      }
      const { message } = await res.json();
      throw new Error(message ?? 'Something Went Wrong');
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
      throw message;
    }
  }),

  resetPassword: createAsyncThunk('reset/resetPassword', async ({ payload, router }) => {
    try {
      const res = await Fetch.post(`${authThunk.url}/${RESET_PASSWORD}`, payload);
      if (res.status >= 200 && res.status < 300) {
        const { message } = await res.json();
        deleteCookie('email');
        router.push('/password-reset-success');
        Toast({
          type: 'success',
          message,
        });
        return;
      }
      const { message } = await res.json();
      throw new Error(message ?? 'Something Went Wrong');
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
      throw message;
    }
  }),

  logout: createAsyncThunk('logout/logoutUser', async ({ router }) => {
    try {
      await Fetch.get(`${authThunk.url}/${LOGOUT}`);
      clearAllCookies();
      Toast({
        type: 'success',
        message: 'Logged Out Successfully!',
      });
      router.push('/login');
    } catch {
      Toast({
        type: 'error',
        message: 'Something Went Wrong',
      });
      throw new Error('Something Went Wrong');
    }
  }),

  updateUser: createAsyncThunk('update/updateUser', async ({ userId, payload }) => {
    const isFd = isFormData(payload);
    try {
      let res;
      if (isFd) {
        res = await Fetch.upload(`${authThunk.url}/${UPDATE_USER}/${userId}`, 'PUT', payload);
      } else {
        res = await Fetch.put(`${authThunk.url}/${UPDATE_USER}/${userId}`, payload);
      }
      if (res.status >= 200 && res.status < 300) {
        res = await res.json();

        Toast({
          type: 'success',
          message: res?.message,
        });
        return res?.updatedUser;
      }
      const { message } = await res.json();
      throw new Error(message ?? 'Something Went Wrong');
    } catch ({ message }) {
      Toast({
        type: 'error',
        message,
      });
      throw message;
    }
  }),
};

export default authThunk;
