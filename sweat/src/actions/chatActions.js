export const sendMessage = (message) => {
  console.log("RequestBody: ", JSON.stringify({ strings: message }));
  return async (dispatch) => {
    try {
      // Send message to the API
      const response = await fetch("http://localhost:8083/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ strings: message }),
      });
      console.log("Response: ", response);
      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Parse response as JSON
      const responseData = await response.json();

      // Access the 'generation' key from the response data
      const responseMessage = responseData.generation;

      // Dispatch action to update state with the response message
      dispatch({ type: "RECEIVE_MESSAGE", payload: responseMessage });
    } catch (error) {
      console.error("Error sending message:", error.message);
      // Dispatch action to handle the error
      dispatch({
        type: "RECEIVE_MESSAGE",
        payload:
          "Oops! It looks like the server is currently down. Please try again later.",
      });
    }
  };
};
