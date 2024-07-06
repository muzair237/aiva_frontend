import { combineReducers } from 'redux';

// Layout
import LayoutReducer from './layouts/reducer';

// Auth
import AuthReducer from './auth/reducer';

// Chat
import ChatReducer from './chat/reducer';

// Enquiry
import EnquiryReducer from './enquiry/reducer';

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Auth: AuthReducer,
  Chat: ChatReducer,
  Enquiry: EnquiryReducer,
});

export default rootReducer;
