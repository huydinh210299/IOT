import { combineReducers } from 'redux';
import demoReducer from './demoReducer';
const rootReducer = combineReducers({
    demo: demoReducer,
    //Thêm reducer tạo mới vào rootReducer ở đây
});

export default rootReducer;
