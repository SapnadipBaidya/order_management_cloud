const initialState = {
    ChatBotResponse: "",
    loading: false,
    error: "",
    payload:""
  };
  
  const chatBotReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CHAT_BOT_REQUESTED":
        return { ...state, loading: true ,payload:action.payload};
      case "CHAT_BOT_SUCCESS":
        return { ...state, loading: false, ChatBotResponse: action.chatBotResponse };
      case "CHAT_BOT_FAILURE":
        return { ...state, loading: false, error: action.message };
      default:
        return state;
    }
  };
  
  export default chatBotReducer;
  