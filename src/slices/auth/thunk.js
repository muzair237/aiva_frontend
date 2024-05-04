import { createAsyncThunk } from '@reduxjs/toolkit';
import { Toast } from '../../components/Molecules/Toast';
import { setCookie, clearAllCookies } from '../../helpers/common';
import { Fetch } from '../../helpers/fetchWrapper';
import { SIGNUP, LOGIN, LOGOUT } from '../../helpers/url_helper';

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
        router.push('/dashboard');
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
        router.push('/dashboard');
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
};

export default authThunk;
