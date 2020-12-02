const initialState = {
  isShow: false,
};

export default function demoReducer(state = initialState, action) {
  switch (action.type) {
    case 'GETTING':
      return 'hello world success';
    case 'GET_SUCCESS':
      return 'hello world' + action.data;
    case 'GET_FAILED':
      return 'hello world failed';
    default:
      return state;
  }
}
