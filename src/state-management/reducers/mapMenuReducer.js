const initialState = {
    responseData: "",
    loading: false,
    error: "",
    payload:""
  };
  
  export const mapMenuReducer = (state = initialState, action) => {
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


  export const adminMenuReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADMIN_MENU_REQUESTED":
        return { ...state, loading: true ,payload:action?.payload};
      case "ADMIN_MENU_SUCCESS":
        console.log(action)
        return { ...state, loading: false, responseData: action?.adminMenuResponse };
      case "ADMIN_MENU_FAILURE":
        return { ...state, loading: false, error: action.message };
      default:
        return state;
    }
  };
  
    
  