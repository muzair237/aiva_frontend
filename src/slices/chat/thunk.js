import { createAsyncThunk } from '@reduxjs/toolkit';
import { Toast } from '../../components/Molecules/Toast';
import { Fetch } from '../../helpers/fetchWrapper';
import { GET_CHAT, ASK_QUERY } from '../../helpers/url_helper';

const chatThunk = {
  url: `${process.env.NEXT_PUBLIC_AIVA_API_URL}/query`,

  getChat: createAsyncThunk('chat/getChat', async ({ id }) => {
    try {
      let res = await Fetch.get(`${chatThunk.url}/${GET_CHAT}/${id}`);
      if (res.status >= 200 && res.status < 300) {
        res = await res.json();
        return res?.chat;
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

  askQuery: createAsyncThunk('chat/askQuery', async ({ payload, currentMessage }) => {
    try {
      let res = await Fetch.post(`${chatThunk.url}/${ASK_QUERY}`, payload);
      if (res.status >= 200 && res.status < 300) {
        res = await res.json();
        return res;
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

export default chatThunk;
