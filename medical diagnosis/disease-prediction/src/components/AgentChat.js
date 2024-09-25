// import React, { useState } from "react";
// import axios from "axios";

// export default function AgentChat() {
//   const [formData, setFormData] = useState({
//     disease: "",
//   });
//   const [response, setResponse] = useState("");
//   const [chat, setChat] = useState([
//     { type: "system", message: "Hi! My name is Blue!" },
//   ]);
//   const [currentStep, setCurrentStep] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleUserInput = (input) => {
//     const newChat = [...chat, { type: "user", message: input }];
//     setChat(newChat);

//     setFormData({ ...formData, disease: input });
//     handleSubmit({ ...formData, disease: input }, newChat);
//     setCurrentStep("");
//   };

//   const handleSubmit = async (formData, newChat) => {
//     const res = await axios.post("http://localhost:5000/analyze", formData);
//     setResponse(res.data.result);
//     setChat([...newChat, { type: "system", message: res.data.result }]);
//   };

//   const handleChatSubmit = (e) => {
//     e.preventDefault();
//     const input = e.target.elements.userInput.value;
//     handleUserInput(input);
//     e.target.reset();
//   };

//   return (
//     <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
//       <div className="mx-auto max-w-2xl text-center">
//         <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//           Agent Chat
//         </h2>
//         <p className="mt-2 text-lg leading-8 text-gray-600">
//           Chat with the health agents.
//         </p>
//       </div>
//       <div className="mx-auto mt-16 max-w-xl sm:mt-20">
//         <div className="space-y-4 overflow-y-scroll h-[420px]">
//           {chat.map((chatItem, index) => (
//             <div
//               key={index}
//               className={`flex ${
//                 chatItem.type === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-xs p-3 rounded-lg ${
//                   chatItem.type === "user"
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-gray-900"
//                 }`}
//               >
//                 {chatItem.message}
//               </div>
//             </div>
//           ))}
//         </div>
//         <form onSubmit={handleChatSubmit} className="mt-6">
//           <input
//             id="userInput"
//             name="userInput"
//             type="text"
//             required
//             className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             placeholder="Type your response here..."
//           />
//           <button
//             type="submit"
//             className="mt-4 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AgentChat({ prompt }) {
  const [formData, setFormData] = useState({
    disease: "",
  });
  const [response, setResponse] = useState("");
  const [chat, setChat] = useState([
    { type: "system", message: "Hi! My name is Blue!" },
  ]);

  useEffect(() => {
    if (prompt) {
      const newChat = [...chat, { type: "user", message: prompt }];
      setChat(newChat);
      handleSubmit({ disease: prompt }, newChat);
    }
  }, [prompt]);

  const handleSubmit = async (formData, newChat) => {
    const res = await axios.post("http://localhost:5000/analyze", formData);
    setResponse(res.data.result);
    setChat([...newChat, { type: "system", message: res.data.result }]);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.userInput.value;
    const newChat = [...chat, { type: "user", message: input }];
    setChat(newChat);
    handleSubmit({ disease: input }, newChat);
    e.target.reset();
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Meet <span className="text-indigo-600">Blue</span>
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Engage with our health agent.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="space-y-4 overflow-y-scroll h-[420px]">
          {chat.map((chatItem, index) => (
            <div
              key={index}
              className={`flex ${
                chatItem.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  chatItem.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                {chatItem.message}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleChatSubmit} className="mt-6">
          <input
            id="userInput"
            name="userInput"
            type="text"
            required
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Type your response here..."
          />
          <button
            type="submit"
            className="mt-4 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
