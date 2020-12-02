import { combineReducers } from 'redux';
import demoReducer from './demoReducer';
import authReducer from './authReducer';
const rootReducer = combineReducers({
  demo: demoReducer,
  authReducer,
  //Thêm reducer tạo mới vào rootReducer ở đây
});

export default rootReducer;
