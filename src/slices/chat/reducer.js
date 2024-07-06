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
        state.isLoading = false;
        state.errorMsg = action?.error?.message;
      })

      // ASK QUERY
      .addCase(chatThunk.askQuery.pending, state => {
        state.isLoading = true;
      })
      .addCase(chatThunk.askQuery.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(chatThunk.askQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action?.error?.message;
      })

      // DELETE MESSAGE
      .addCase(chatThunk.deleteMessage.pending, state => {
        state.isLoading = true;
      })
      .addCase(chatThunk.deleteMessage.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(chatThunk.deleteMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action?.error?.message;
      })

      // DELETE MESSAGE
      .addCase(chatThunk.deleteChat.pending, state => {
        state.isLoading = true;
      })
      .addCase(chatThunk.deleteChat.fulfilled, state => {
        state.chat = [];
        state.isLoading = false;
      })
      .addCase(chatThunk.deleteChat.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action?.error?.message;
      });
  },
});

export default chatSlice.reducer;
