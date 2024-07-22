

export const ChatBotRequested = (data) => {
  return (dispatch) => {
    dispatch({
      type: "CHAT_BOT_REQUESTED",
      payload: data,
    });
  };
};

export const mapMenuRequested = (data) => {
  return (dispatch) => {
    dispatch({
      type: "MAP_MENU_REQUESTED",
      payload: data,
    });
  };
};



export const adminMenuRequested = (data) => {
  return (dispatch) => {
    dispatch({
      type: "ADMIN_MENU_REQUESTED",
      payload: data,
    });
  };
};



