const initialState = {
    location : {}
  };
  
 const reducer = (state = initialState, action) => {
    switch (action.type){
      case 'SET_LOCATION': {
        return {
          ...state,
          location: action.value
        };
      }
      default: return state
    };
  }

  export default reducer;