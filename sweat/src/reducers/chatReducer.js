const initialState = {
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          { text: action.payload.text, sender: action.payload.sender },
        ],
      };
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          { text: action.payload, sender: "ChatGPT" },
        ],
      };
    default:
      return state;
  }
};

export default chatReducer;
