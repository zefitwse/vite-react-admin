let initialState = {
  auth: '',
  info: {
    name: ''
  }
};

export default function counterReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'login':
      return { ...state, auth: action.payload };
    case 'role':
      return { ...state, info: action.payload };
    default:
      return state;
  }
}
