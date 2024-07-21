const initialState = {
    responseData: "",
    loading: false,
    error: "",
    payload:""
  };
  
  const mapMenuReducer = (state = initialState, action) => {
    switch (action.type) {
      case "MAP_MENU_REQUESTED":
        return { ...state, loading: true ,payload:action.payload};
      case "MAP_MENU_SUCCESS":
        console.log(action)
        return { ...state, loading: false, responseData: action?.mapMenuResponse };
      case "MAP_MENU_FAILURE":
        return { ...state, loading: false, error: action.message };
      default:
        return state;
    }
  };
  
  export default mapMenuReducer;
  