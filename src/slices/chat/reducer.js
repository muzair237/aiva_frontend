import { createSlice } from '@reduxjs/toolkit';
import chatThunk from './thunk';

const initialState = {
  chat: [],
  isLoading: false,
  errorMsg: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // GET CHAT
      .addCase(chatThunk.getChat.pending, state => {
        state.isLoading = true;
      })
      .addCase(chatThunk.getChat.fulfilled, (state, action) => {
        state.chat = action?.payload;
        state.isLoading = false;
      })
      .addCase(chatThunk.getChat.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.errorMsg = action?.error?.message;
      })

      // ASK QUERY
      .addCase(chatThunk.askQuery.pending, state => {
        state.isLoading = true;
      })
      .addCase(chatThunk.askQuery.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(chatThunk.askQuery.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.errorMsg = action?.error?.message;
      });
  },
});

export default chatSlice.reducer;
