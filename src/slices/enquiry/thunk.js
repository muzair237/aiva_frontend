import { createAsyncThunk } from '@reduxjs/toolkit';
import { Toast } from '../../components/Molecules/Toast';
import { Fetch } from '../../helpers/fetchWrapper';
import { CREATE_ENQUIRY } from '../../helpers/url_helper';

const enquiryThunk = {
  url: `${process.env.NEXT_PUBLIC_AIVA_API_URL}/enquiry`,

  createEnquiry: createAsyncThunk('enquiry/createEnquiry', async ({ payload }) => {
    try {
      let res = await Fetch.post(`${enquiryThunk.url}/${CREATE_ENQUIRY}`, payload);
      if (res.status >= 200 && res.status < 300) {
        res = await res.json();
        Toast({
          type: 'success',
          message: 'Enquiry Received Successfully!',
        });
        return res;
      }
      const { message } = await res.json();
      throw new Error(message ?? 'Something Went Wrong');
    } catch ({ message }) {
      Toast({
        type: 'error',
        message: 'Failed to send enquiry. Please try again later.',
      });
      throw message;
    }
  }),
};

export default enquiryThunk;
