const appReducer = (state, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: true,
      }
    case 'SET_WALLET':
      return {
        ...state,
        message: {},
        wallet: action.payload,
        isLoading: !action.payload?._id,
      }
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

export default appReducer
