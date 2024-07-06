import { createSlice } from '@reduxjs/toolkit';
import enquiryThunk from './thunk';

const initialState = {
  isLoading: false,
  errorMsg: '',
};

const enquirySlice = createSlice({
  name: 'enquiry',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // CREATE ENQUIRY
      .addCase(enquiryThunk.createEnquiry.pending, state => {
        state.isLoading = true;
      })
      .addCase(enquiryThunk.createEnquiry.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(enquiryThunk.createEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action?.error?.message;
      });
  },
});

export default enquirySlice.reducer;
