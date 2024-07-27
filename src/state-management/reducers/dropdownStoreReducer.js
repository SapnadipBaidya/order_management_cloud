const initialState = {
    dropDownResponse: "",
    loading: false,
    error: "",
    payload:""
  };
  
  const dropdownStoreReducer = (state = initialState, action) => {
    switch (action.type) {
      case "DROP_STORE_REQUESTED":
        return { ...state, loading: true ,payload:action.payload};
      case "DROP_STORE_SUCCESS":
        return { ...state, loading: false, dropDownResponse: action?.dropDownResponse };
      case "DROP_STORE_FAILURE":
        return { ...state, loading: false, error: action.message };
      default:
        return state;
    }
  };
  
  export default dropdownStoreReducer;
  